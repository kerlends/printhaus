import { getPage } from '@lib/shopify';

export default async function ShopifyPage({
	params,
}: {
	params: { page: string };
}) {
	const page = await getPage(params.page);

	return (
		<div
			className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4 px-6 py-4 font-serif"
			dangerouslySetInnerHTML={{ __html: page.body }}
		/>
	);
}
