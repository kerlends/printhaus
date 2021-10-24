import { getPlaiceholder } from 'plaiceholder';

const isDev = process.env.NODE_ENV !== 'production';

export async function getPlaceholderImageProps(src: string) {
	const { base64 } = await getPlaiceholder(src, {
		size: isDev ? 4 : 50,
	});

	return {
		src,
		blurDataURL: base64,
	};
}
