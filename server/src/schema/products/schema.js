const Products = /* GraphQL */`
extend type Query {
  products: [Product]
}

type Product {
  cost: Int!
  currency: String!
  description: String!
  soldOut: Boolean!
  title: String!
}
`

export default () => [Products]
