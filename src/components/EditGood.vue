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
          v-model.lazy="item.count"
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
import gql from "graphql-tag";

export default {
  name: "EditGood",

  props: {
    goods: { type: Array, required: true }
  },

  methods: {
    editGood(good) {
      good.isDisabled = !good.isDisabled;

      if (good.isDisabled) {
        const params = {
          id: good.id,
          title: good.title,
          count: good.count.toString(),
          cost: good.cost.toString(),
          isDisabled: true
        };

        this.$apollo.mutate({
          mutation: gql`
            mutation editGood(
              $id: Number
              $title: String!
              $count: String!
              $cost: String!
              $isDisabled: Boolean
            ) {
              editGood(
                id: $id
                title: $title
                count: $count
                cost: $cost
                isDisabled: $isDisabled
              ) @client
            }
          `,
          variables: params
        });
      }
    },

    deleteGood(goodId) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteGood($id: Number) {
              deleteGood(id: $id) @client
            }
          `,
          variables: {
            id: goodId
          }
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

          this.$emit("editedGoods", getData.goods);
          console.log("newgoods -> ", getData.goods);
        });
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
