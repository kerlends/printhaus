export function getSocialMetas({
	url,
	title = 'printhaus.co',
	description = '',
	image = '',
	keywords = '',
}: {
	image?: string;
	url: string;
	title?: string;
	description?: string;
	keywords?: string;
}) {
	return {
		title,
		description,
		keywords,
		image,
		'og:url': url,
		'og:title': title,
		'og:description': description,
		'og:image': image,
		'twitter:card': image ? 'summary_large_image' : 'summary',
		'twitter:creator': '@nickynarc',
		'twitter:site': '@nickynarc',
		'twitter:title': title,
		'twitter:description': description,
		'twitter:image': image,
		'twitter:alt': title,
	};
}
