export function getSocialMetas({
	url,
	title = 'printhaus.co',
	description = '',
	image = 'https://cdn.shopify.com/s/files/1/0013/5741/4471/files/Screen_Shot_2018-09-08_at_9.44.10_AM_a44ab0fb-e6cd-4a93-a734-f61459a4ad12.png?v=1536416928',
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
