import { getPage, getPages } from '@lib/shopify';

export default async function ShopifyPage({
	params,
}: {
	params: { page: string };
}) {
	const page = await getPage(params.page);

	if (!page?.body) {
		return null;
	}

	return (
		<div
			className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4 px-6 py-4 font-serif"
			dangerouslySetInnerHTML={{ __html: page.body }}
		/>
	);
}

export async function generateStaticParams() {
	const pages = await getPages();

	return pages.map((page) => ({
		page: page.handle,
	}));
}

export const dynamic = 'force-static';

export const revalidate = 3600;
