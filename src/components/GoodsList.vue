<template>
  <div>
    <h1>Goods</h1>
    <AddGood @editedGoods="editedGoods = $event" />
    <EditGood
      :goods="goods"
      @editedGoods="editedGoods = $event"
    />
  </div>
</template>

<script>
import AddGood from "./AddGood";
import EditGood from "./EditGood";
import gql from "graphql-tag";

export default {
  name: "GoodsList",

  components: {
    AddGood,
    EditGood
  },

  data() {
    return {
      goods: [],
      editedGoods: null
    };
  },

  mounted() {
    const goodsLocal = JSON.parse(localStorage.getItem("Goods"));
    const getData = this.$apollo.getClient().readQuery({
      query: gql`
        query {
          goods {
            id
            title
            count
            cost
            isDisabled
          }
        }
      `
    });
    if (goodsLocal) {
      this.goods = getData.goods;
    }
    //=========
    // GET GOODS from MongoDB
    // this.$apollo
    //   .query({
    //     fetchPolicy: "network-only",
    //     query: gql`
    //       query {
    //         getGoods {
    //           _id
    //           title
    //           count
    //           cost
    //           isDisabled
    //         }
    //       }
    //     `
    //   })
    //   .then(({ data }) => {
    //     this.goods = data.getGoods;
    //     console.log("goods -> ", this.goods);
    //     return data;
    //   });
    // Mutation for add good
    // this.$apollo.mutate({
    //   mutation: gql`
    //     mutation($title: String!, $count: Int!, $cost: Float) {
    //       addGood(title: $title, count: $count, cost: $cost) {
    //         title
    //         count
    //         cost
    //       }
    //     }
    //   `,
    //   variables: {
    //     title: "Bbbbb",
    //     count: "12",
    //     cost: 2
    //   }
    // });
  },

  watch: {
    editedGoods(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.goods = newVal;
      }
    }
  }
};
</script> 