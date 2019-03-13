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
// import { GOODS_QUERY } from "@/graphql";
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

  watch: {
    newGoods(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.goods = newVal;
      }
    }
  }
};
</script>