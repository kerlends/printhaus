import { getCollection } from 'lib/shopify';

import { OpengraphImage } from '@components/OpengraphImage';

export const runtime = 'edge';

export default async function Image({
	params,
}: {
	params: { handle: string };
}) {
	const collection = await getCollection(params.handle);
	const title = collection?.seo?.title || collection?.title;

	return await OpengraphImage({ title });
}
