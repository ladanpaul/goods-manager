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
  </div>
</template>

<script>
import AddGood from "./AddGood";
import EditGood from "./EditGood";

export default {
  name: "GoodsList",

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