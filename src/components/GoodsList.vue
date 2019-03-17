<template>
  <div>
    <h1>Goods</h1>
    <AddGood :goods="goods" />
    <EditGood
      :goods="goods"
      @newGoods="newGoods = $event"
    />
    <pre>
      {{goods}}
    </pre>
    <div style="border: 2px solid blue;">
      <h1>
        List from server DB:
      </h1>
      <ul
        v-for="good in getGoods"
        :key="good._id"
      >
        <li>
          {{good.title}}
        </li>
        <li>
          {{good.count}}
        </li>
        <li>
          {{good.cost}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddGood from "./AddGood";
import EditGood from "./EditGood";
import gql from "graphql-tag";

export default {
  name: "GoodsList",

  apollo: {
    getGoods: {
      query: gql`
        query {
          getGoods {
            _id
            title
            count
            cost
          }
        }
      `
    }
  },

  components: {
    AddGood,
    EditGood
  },

  data() {
    return {
      goods: [],
      newGoods: null
    };
  },

  mounted() {
    // this.$apollo.getClient().writeData({
    //   data: {
    //     good: {
    //       __typename: "defaultType",
    //       title: "Mango",
    //       count: 281,
    //       cost: 1
    //     }
    //   }
    // });

    // const newGood = this.$apollo.getClient().readQuery({
    //   query: gql`
    //     query {
    //       good {
    //         title
    //         count
    //         cost
    //       }
    //     }
    //   `
    // }).good;

    // console.log("default Good -> ", newGood);

    this.$apollo
      .mutate({
        mutation: gql`
          mutation {
            addGood(title: "orange", count: 10, cost: 0.5, __typename: "Good") {
              title
              count
              cost
              __typename
            }
          }
        `
      })
      .then(response => {
        debugger;
      });

    this.$apollo
      .query({
        fetchPolicy: "network-only",
        query: gql`
          query {
            getGoods {
              _id
              title
              count
              cost
              isDisabled
            }
          }
        `
      })
      .then(({ data }) => {
        this.goods = data.getGoods;
        console.log("goods -> ", this.goods);
        return data;
      });
  },

  watch: {
    newGoods(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.goods = newVal;
      }
    }
  }
};
</script>