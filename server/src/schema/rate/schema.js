const Rate = /* GraphQL */ `
  type Query {
    getRates: [Rate]
  }

  type Rate {
    serviceName: String!
    serviceCode: String!
    shipmentCost: Float!
    otherCost: Float!
  }
`;

export default () => [Rate];
