'use client';

import React, {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
} from 'react';

export interface State {
	displayToast: boolean;
	toastText: string;
}

const initialState: State = {
	displayToast: false,
	toastText: '',
};

type Action =
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

export const ToastContext = React.createContext<
	State & {
		openToast: () => void;
		closeToast: () => void;
		showNotificationToast: (text: string) => void;
	}
>(null as any);

function toastReducer(state: State, action: Action) {
	switch (action.type) {
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

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(toastReducer, initialState);
	const closeToastTimeoutRef = useRef<any>();

	const openToast = useCallback(() => dispatch({ type: 'OPEN_TOAST' }), []);
	const closeToast = useCallback(() => dispatch({ type: 'CLOSE_TOAST' }), []);

	useEffect(() => {
		if (closeToastTimeoutRef.current && !state.displayToast) {
			clearTimeout(closeToastTimeoutRef.current);
		}
	}, [state.displayToast]);

	const showNotificationToast = useCallback((text: string) => {
		dispatch({ type: 'SET_TOAST_TEXT', text });
		dispatch({ type: 'OPEN_TOAST' });
		closeToastTimeoutRef.current = setTimeout(() => {
			dispatch({ type: 'CLOSE_TOAST' });
		}, 3000);
	}, []);

	const value = useMemo(
		() => ({
			...state,
			openToast,
			closeToast,
			showNotificationToast,
		}),
		[state],
	);

	return (
		<ToastContext.Provider value={value}>{children}</ToastContext.Provider>
	);
}

export const useToast = () => {
	const context = React.useContext(ToastContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};
