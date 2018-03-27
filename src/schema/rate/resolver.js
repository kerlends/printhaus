const resolver = {
  Query: {
    getRates: (root, args, context) => context.ShopStation.getRate(),
  },
};

export default resolver;
