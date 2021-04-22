let cachedScrollbarSize = 0;
let calculated = false;

export default function getScrollbarSize() {
	if (!('document' in global)) return 0;

	if (calculated) {
		return cachedScrollbarSize;
	}

	calculated = true;

	const scrollDiv = document.createElement('div');
	scrollDiv.style.width = '99px';
	scrollDiv.style.height = '99px';
	scrollDiv.style.position = 'absolute';
	scrollDiv.style.top = '-9999px';
	scrollDiv.style.overflow = 'scroll';

	document.body.appendChild(scrollDiv);
	const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);

	cachedScrollbarSize = scrollbarSize;

	return scrollbarSize;
}
