<template>
  <div>
    <div
      class="item"
      v-for="item in goods"
      :key="item.title"
    >
      <div ref="input">
        Name: <input
          :disabled="item.isDisabled"
          type="text"
          v-model.lazy="item.title"
        >
        Count: <input
          :disabled="item.isDisabled"
          type="number"
          v-model.number.lazy="item.count"
        >
        Cost: <input
          :disabled="item.isDisabled"
          type="number"
          v-model.number.lazy="item.cost"
        >
      </div>
      <div class="buttons">
        <button @click="editGood(item)">Edit</button>
        <button @click="deleteGood(item.id)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditGood",

  props: {
    goods: { type: Array, required: true }
  },

  methods: {
    editGood: good => (good.isDisabled = !good.isDisabled),
    deleteGood(goodId) {
      const newGoods = this.goods.filter(good => good.id !== goodId);
      this.$emit("newGoods", newGoods);
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  border: 1px solid lime;
  padding: 5px;
}

input {
  border: 1px dotted grey;
  font-size: 14px;
  color: #000;
  outline: none;
}

input:disabled {
  border-color: transparent;
  background: transparent;
}

.buttons {
  margin-right: auto;
}
</style>
