import ownerDocument from './ownerDocument';

export default function ownerWindow(node: HTMLElement | Document) {
	const doc = ownerDocument(node);
	return doc.defaultView || window;
}
