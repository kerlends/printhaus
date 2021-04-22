import React, { useEffect, useMemo, useReducer, useRef } from 'react';

export interface State {
	displaySidebar: boolean;
	displayToast: boolean;
	toastText: string;
}

const initialState: State = {
	displaySidebar: false,
	displayToast: false,
	toastText: '',
};

type Action =
	| {
			type: 'OPEN_SIDEBAR';
	  }
	| {
			type: 'CLOSE_SIDEBAR';
	  }
	| {
			type: 'OPEN_TOAST';
	  }
	| {
			type: 'CLOSE_TOAST';
	  }
	| {
			type: 'SET_TOAST_TEXT';
			text: ToastText;
	  };

type ToastText = string;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case 'OPEN_SIDEBAR': {
			return {
				...state,
				displaySidebar: true,
			};
		}
		case 'CLOSE_SIDEBAR': {
			return {
				...state,
				displaySidebar: false,
			};
		}
		case 'OPEN_TOAST': {
			return {
				...state,
				displayToast: true,
			};
		}
		case 'CLOSE_TOAST': {
			return {
				...state,
				displayToast: false,
			};
		}
		case 'SET_TOAST_TEXT': {
			return {
				...state,
				toastText: action.text,
			};
		}
		default: {
			return state;
		}
	}
}

export const UIProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);
	const closeToastTimeoutRef = useRef<any>();

	const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
	const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
	const toggleSidebar = () =>
		state.displaySidebar
			? dispatch({ type: 'CLOSE_SIDEBAR' })
			: dispatch({ type: 'OPEN_SIDEBAR' });
	const closeSidebarIfPresent = () =>
		state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' });

	const openToast = () => dispatch({ type: 'OPEN_TOAST' });
	const closeToast = () => dispatch({ type: 'CLOSE_TOAST' });

	useEffect(() => {
		if (closeToastTimeoutRef.current && !state.displayToast) {
			clearTimeout(closeToastTimeoutRef.current);
		}
	}, [state.displayToast]);

	const showNotificationToast = (text: string) => {
		dispatch({ type: 'SET_TOAST_TEXT', text });
		dispatch({ type: 'OPEN_TOAST' });
		closeToastTimeoutRef.current = setTimeout(() => {
			dispatch({ type: 'CLOSE_TOAST' });
		}, 3000);
	};

	const value = useMemo(
		() => ({
			...state,
			openSidebar,
			closeSidebar,
			toggleSidebar,
			closeSidebarIfPresent,
			openToast,
			closeToast,
			showNotificationToast,
		}),
		[state],
	);

	return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
	const context = React.useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};
