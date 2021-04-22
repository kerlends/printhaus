import { productConnection } from './get-all-products-query';

const getCollectionProductsQuery = /* GraphQL */ `
  query getProductsFromCollection(
    $handle: String!
    $first: Int = 250
    $sortKey: ProductCollectionSortKeys = CREATED
    $reverse: Boolean = true
  ) {
    collectionByHandle(handle: $handle) {
      products(
        first: $first
        sortKey: $sortKey
        reverse: $reverse
      ) {
        ${productConnection}
      }
    }
  }
`;
export default getCollectionProductsQuery;
