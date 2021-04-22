import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { useAddItem } from '@framework/cart';
import { Button } from '@components/common';
import { useUI } from '@components/ui';

interface ReducerState {
	loading: boolean;
	error: any;
	itemAdded: boolean;
}

type ReducerAction =
	| { type: 'ADD_ITEM_CLICKED' }
	| { type: 'ADD_ITEM_SUCCESS' }
	| { type: 'ADD_ITEM_FAILURE'; payload: any }
	| { type: 'VARIANT_CHANGED' };

const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM_CLICKED': {
			return {
				loading: true,
				error: null,
				itemAdded: false,
			};
		}
		case 'ADD_ITEM_SUCCESS': {
			return {
				loading: false,
				error: null,
				itemAdded: true,
			};
		}
		case 'ADD_ITEM_FAILURE': {
			return {
				loading: false,
				error: action.payload,
				itemAdded: false,
			};
		}
		case 'VARIANT_CHANGED': {
			return {
				loading: false,
				error: null,
				itemAdded: false,
			};
		}
		default: {
			return state;
		}
	}
};

interface Props {
	productId: string;
	variantId: string;
}

function AddToCartButton({ productId, variantId }: Props) {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		error: null,
		itemAdded: false,
	});

	const { showNotificationToast: toast } = useUI();

	const prevVariant = useRef(variantId);

	useEffect(() => {
		if (variantId !== prevVariant.current) {
			dispatch({ type: 'VARIANT_CHANGED' });
		}
	}, [variantId]);

	useEffect(() => {
		prevVariant.current = variantId;
	}, [variantId]);

	const addItem = useAddItem();

	const handleAddToCart = useCallback(async () => {
		dispatch({ type: 'ADD_ITEM_CLICKED' });
		try {
			await addItem({
				productId,
				variantId,
			});
			dispatch({ type: 'ADD_ITEM_SUCCESS' });
			toast('Added to cart');
		} catch (err) {
			dispatch({ type: 'ADD_ITEM_FAILURE', payload: err });
		}
	}, [addItem, productId, variantId]);

	return (
		<Button
			variant="primary"
			onClick={handleAddToCart}
			disabled={state.loading}
		>
			{state.itemAdded ? 'Added to cart' : 'Add to cart'}
		</Button>
	);
}

export default AddToCartButton;
