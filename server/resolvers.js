module.exports = {
  Query: {
    getGoods: async (_, args, { Good }) => {
      const goods = await Good.find({}).sort({ count: "desc" });
      return goods;
    }
  },
  Mutation: {
    addGood: async (_, { title, count, cost, isDisabled }, { Good }) => {
      const good = await Good.findOne({ title });

      if (good) {
        throw new Error("Good already exists");
      }

      const newGood = await new Good({
        title,
        count,
        cost,
        isDisabled
      }).save();

      return newGood;
    }
    // editGood: async (_, { title, count, cost, isDisabled }, { Good }) => {
    //   console.log("GOOODDDDDD -> ", Good);
    // }
  }
};
