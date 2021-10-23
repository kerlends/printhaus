import {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { getConfig } from '@framework/api';
import getAllPages from '@framework/common/get-all-pages';
import getPage from '@framework/common/get-page';
import getAllCollections from '@framework/product/get-all-collections';
import { getCommonStaticPageData } from '@utils/commonData';

export async function getStaticPaths({ defaultLocale }: GetStaticPathsContext) {
	const config = getConfig({ locale: defaultLocale });
	const pages = await getAllPages();

	return {
		paths: pages.pages.map((page) => ({
			params: { page: page.handle },
		})),
		fallback: false,
	};
}

export async function getStaticProps({
	preview,
	locale,
	params,
}: GetStaticPropsContext<{ page: string }>) {
	const pageHandle = params?.page;

	const config = getConfig({ locale });

	if (!pageHandle) {
		throw new Error(`Missing page parameter`);
	}

	const { categories, pages } = await getCommonStaticPageData({
		preview,
		locale,
	});

	const matchedPage = pages.find((p) => p.handle === pageHandle);

	if (!matchedPage) {
		throw new Error(`Page with handle '${pageHandle}`);
	}

	const { page } = await getPage({
		variables: { id: matchedPage.id },
		config,
		preview,
	});

	return {
		props: {
			categories,
			pages,
			...page!,
		},
		revalidate: 14400,
	};
}

export default function Page({
	name: title,
	body,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div
			className="max-w-4xl flex flex-col justify-center items-center space-y-4 mx-auto py-4 px-6 font-serif"
			dangerouslySetInnerHTML={{ __html: body }}
		/>
	);
}
