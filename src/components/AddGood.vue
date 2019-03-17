<template>
  <div>
    <h2>
      AddGood:
    </h2>
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
        @click="checkSameValues"
      >Add</button>
      <!-- {{good}} -->
      <!-- <div>
        {{isValid}}
      </div> -->
    </div>
  </div>
</template>

<script>
// import { GOODS_MUTATION } from "@/graphql";
// import gql from "graphql-tag";

export default {
  name: "AddGood",

  props: {
    goods: { type: Array, required: true }
  },

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
      const good = Object.assign({}, this.good);
      Object.defineProperties(good, {
        // id: {
        //   value: Date.now(),
        //   enumerable: true
        // },
        isDisabled: {
          value: true,
          enumerable: true,
          configurable: true
        }
      });
      this.goods.push(good);
      console.log("this goods -> ", this.goods);
      this.resetInputs();
    },

    checkSameValues() {
      const goodTitle = this.good.title;
      const isSame = this.goods.some(item => {
        return item.title === goodTitle;
      });

      if (isSame) return;

      this.addGood();
    },

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
