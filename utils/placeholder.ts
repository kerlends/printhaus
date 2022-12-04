import { getPlaiceholder } from 'plaiceholder';

const isDev = process.env.NODE_ENV !== 'production';

export async function getPlaceholderImageProps(src: string) {
	const { base64, img } = await getPlaiceholder(src, {
		size: isDev ? 4 : 50,
	});

	return {
		...img,
		blurDataURL: base64,
	};
}

export type PlaceholderImageProps = AwaitedReturnType<
	typeof getPlaceholderImageProps
>;
