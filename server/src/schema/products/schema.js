const Products = /* GraphQL */ `
extend type Query {
  products: [Product]
}

extend type Mutation {
  addProduct(input: ProductInput): Product
}

type Product {
  id: ID!
  cost: Int!
  currency: String!
  description: String!
  soldOut: Boolean!
  title: String!
}

input ProductInput {
  cost: Int!
  currency: String!
  description: String!
  soldOut: Boolean
  title: String!
}
`;

export default () => [Products];
