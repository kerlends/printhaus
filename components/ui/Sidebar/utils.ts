import { ownerDocument, getScrollbarSize, isOverflowing } from '@utils/index';

function getPaddingRight(node: HTMLElement) {
	const styles = window.getComputedStyle(node);
	const value =
		'padding-right' in styles
			? styles['padding-right']
			: styles['paddingRight'];
	return parseInt(value, 10) || 0;
}

interface ContainerInfo {
	container: HTMLElement;
	restore: null | (() => void);
}

interface Props {
	disableScrollLock?: boolean;
}

export function handleContainer(
	containerInfo: ContainerInfo,
	props: Props = {},
) {
	const restoreStyle: any[] = [];
	const restorePaddings: any[] = [];
	const container = containerInfo.container;
	let fixedNodes: any;

	if (!props.disableScrollLock) {
		if (isOverflowing(container)) {
			// Compute the size before applying overflow hidden to avoid any scroll jumps.
			const scrollbarSize = getScrollbarSize();

			restoreStyle.push({
				value: container.style.paddingRight,
				key: 'paddingRight',
				el: container,
			});
			// Use computed style, here to get the real padding to add our scrollbar width.
			container.style['paddingRight'] = `${
				getPaddingRight(container) + scrollbarSize
			}px`;

			// .mui-fixed is a global helper.
			fixedNodes = ownerDocument(container).querySelectorAll('.mui-fixed');
			[].forEach.call(fixedNodes, (node: any) => {
				restorePaddings.push(node.style.paddingRight);
				node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
			});
		}

		// Improve Gatsby support
		// https://css-tricks.com/snippets/css/force-vertical-scrollbar/
		const parent = container.parentElement!;
		const scrollContainer = document.body;
		const _scrollContainer =
			parent.nodeName === 'HTML' &&
			// @ts-ignore
			window.getComputedStyle(parent)['overflow-y'] === 'scroll'
				? parent
				: container;

		console.log({ parent, scrollContainer });

		// Block the scroll even if no scrollbar is visible to account for mobile keyboard
		// screensize shrink.
		restoreStyle.push({
			value: scrollContainer.style.overflow,
			key: 'overflow',
			el: scrollContainer,
		});
		scrollContainer.style.overflow = 'hidden';
	}

	const restore = () => {
		if (fixedNodes) {
			[].forEach.call(fixedNodes, (node: any, i) => {
				if (restorePaddings[i]) {
					node.style.paddingRight = restorePaddings[i];
				} else {
					node.style.removeProperty('padding-right');
				}
			});
		}

		restoreStyle.forEach(({ value, el, key }) => {
			if (value) {
				el.style.setProperty(key, value);
			} else {
				el.style.removeProperty(key);
			}
		});
	};

	return restore;
}
