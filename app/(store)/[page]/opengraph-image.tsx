import { getPage } from 'lib/shopify';

import { OpengraphImage } from '@components/OpengraphImage';

export const runtime = 'edge';

export default async function Image({
	params,
}: {
	params: { handle: string };
}) {
	const page = await getPage(params.handle);
	const title = page?.seo?.title || page?.title;

	return await OpengraphImage({ title });
}
