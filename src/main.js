// import Vue from "vue";
// import { ApolloClient } from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import VueApollo from "vue-apollo";
// import App from "./App.vue";
// import router from "./router";

// Vue.config.productionTip = false;

// // HTTP connexion to the API
// const httpLink = new HttpLink({
//   // You should use an absolute URL here
//   uri: "http://localhost:3333/graphql"
// });

// // Cache implementation
// const cache = new InMemoryCache();

// // Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache
// });

// Vue.use(VueApollo);

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient
// });

// new Vue({
//   el: "#app",
//   apolloProvider,
//   router,
//   render: h => h(App)
// });

import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import router from "./router";

import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

Vue.config.productionTip = false;

// HTTP connexion to the API
const httpLink = new HttpLink({
  uri: "http://localhost:3333/graphql"
});

// Cache implementation
const cache = new InMemoryCache();

const defaultState = JSON.parse(localStorage.getItem("Goods")) || {
  goods: [
    {
      __typename: "newGood",
      id: "777",
      title: "testGood",
      count: "777",
      cost: "7",
      isDisabled: true
    }
  ]
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      addNewGood(_, { id, title, count, cost, isDisabled }, { cache }) {
        const localData =
          JSON.parse(localStorage.getItem("Goods")) || defaultState.goods;
        const data = {
          goods: [
            {
              __typename: "newGood",
              id,
              title,
              count,
              cost,
              isDisabled
            }
          ]
        };

        if (localData.goods) {
          const isSame = localData.goods.some(item => {
            return item.title === title;
          });

          if (isSame) return;

          data.goods.push(...localData.goods);
        }

        localStorage.setItem("Goods", JSON.stringify(data));
        cache.writeData({ data });

        return null;
      },

      editGood: (_, { id, title, count, cost, isDisabled }, { cache }) => {
        const localData = JSON.parse(localStorage.getItem("Goods"));
        if (localData.goods) {
          const data = {
            goods: [
              {
                __typename: "newGood",
                id,
                title,
                count,
                cost,
                isDisabled
              }
            ]
          };

          let editedGood = localData.goods.filter(good => good.id !== id);

          data.goods.push(...editedGood);
          localStorage.setItem("Goods", JSON.stringify(data));
          cache.writeData({ data });
        }

        return null;
      },

      deleteGood: (_, { id }, { cache }) => {
        const localData = JSON.parse(localStorage.getItem("Goods"));
        if (localData.goods) {
          const data = {};
          data.goods = localData.goods.filter(good => good.id !== id);

          localStorage.setItem("Goods", JSON.stringify(data));
          cache.writeData({ data });
        }

        return null;
      }
    }
  }
});

// Create the apol.lo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  provide: apolloProvider.provide(),
  router,
  render: h => h(App)
}).$mount("#app");
