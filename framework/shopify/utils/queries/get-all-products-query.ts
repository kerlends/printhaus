export const productConnection = `
pageInfo {
  hasNextPage
  hasPreviousPage
}
edges {
  node {
    id
    title
    vendor
    handle
    variants(first: 250) {
      edges {
        node {
          availableForSale
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          originalSrc
          altText
          width
          height
        }
      }
    }
  }
}`;

export const productsFragment = `
products(
  first: $first
  sortKey: $sortKey
  reverse: $reverse
  query: $query
) {
  ${productConnection}
}
`;

const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = CREATED_AT
    $reverse: Boolean = true
  ) {
    ${productsFragment}
  }
`;
export default getAllProductsQuery;
