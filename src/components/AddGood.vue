<template>
  <div>
    <h3>
      Add Good:
    </h3>
    <div>
      <input
        type="text"
        placeholder="Enter Good Title"
        v-model.trim="good.title"
      >
      <input
        type="number"
        placeholder="Enter Good count"
        v-model.number.trim="good.count"
      >
      <input
        type="number"
        placeholder="Enter Good cost"
        v-model.number.trim="good.cost"
      >
      <button
        :disabled="isValid"
        @click="addGood"
      >Add</button>
    </div>
  </div>
</template>

<script>
// import { GOODS_MUTATION } from "@/graphql";
// import gql from "graphql-tag";
import gql from "graphql-tag";

export default {
  name: "AddGood",

  data() {
    return {
      isValid: true,
      good: {
        title: "",
        count: "",
        cost: ""
      }
    };
  },

  methods: {
    addGood() {
      // const good = Object.assign({}, this.good);
      // Object.defineProperties(good, {
      // id: {
      //   value: Date.now(),
      //   enumerable: true
      // },
      //   isDisabled: {
      //     value: true,
      //     enumerable: true,
      //     configurable: true
      //   }
      // });
      // this.goods.push(good);
      const params = {
        id: Date.now(),
        title: this.good.title,
        count: this.good.count,
        cost: this.good.cost,
        isDisabled: true
      };

      this.$apollo
        .mutate({
          mutation: gql`
            mutation addNewGood(
              $id: Number
              $title: String!
              $count: String!
              $cost: String!
              $isDisabled: Boolean
            ) {
              addNewGood(
                id: $id
                title: $title
                count: $count
                cost: $cost
                isDisabled: $isDisabled
              ) @client
            }
          `,
          variables: params
        })
        .then(() => {
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
          // this.goods = getData.goods;
          console.log("GOODSSSS -> ", getData.goods);
          this.$emit("editedGoods", getData.goods);
        });

      this.resetInputs();
    },

    // checkSameValues() {
    // const goodTitle = this.good.title;
    // const isSame = this.goods.some(item => {
    //   return item.title === goodTitle;
    // });

    // if (isSame) return;

    // this.addGood();
    // },

    resetInputs() {
      Object.keys(this.good).forEach(key => {
        this.good[key] = "";
      });
    },

    goodWatch(val, name) {
      if (name && !isNaN(val)) {
        val < 0 ? (this.good[name] = 0) : (this.good[name] = val);
        this.validate();
      }

      if (val.length > 2) {
        this.validate();
      }
    },

    validate() {
      Object.keys(this.good).some(key => {
        this.isValid = true;
        if (!this.good[key]) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      });
    }
  },

  watch: {
    "good.title"(val) {
      this.goodWatch(val);
    },
    "good.count"(val) {
      this.goodWatch(val, "count");
    },
    "good.cost"(val) {
      this.goodWatch(val, "cost");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
