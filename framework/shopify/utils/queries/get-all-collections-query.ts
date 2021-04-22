const getSiteCollectionsQuery = /* GraphQL */ `
	query getSiteCollections($first: Int!) {
		collections(first: $first) {
			edges {
				node {
					id
					title
					handle
					products(first: 2) {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
	}
`;
export default getSiteCollectionsQuery;
