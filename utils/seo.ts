interface MetaTag {
	content: string;
	property?: string;
	name?: string;
}

export function getSocialMetas({
	url,
	title = 'printhaus.co',
	description = '',
	image = '',
}: {
	image?: string;
	url: string;
	title?: string;
	description?: string;
	keywords?: string[];
}): MetaTag[] {
	const attrs = {
		title,
		description,
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

	return Object.entries(attrs).map(([key, value]) => {
		if (key.startsWith('og:')) {
			return { property: key, content: value, key };
		}

		return { name: key, content: value, key };
	});
}
