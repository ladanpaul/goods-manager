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

const defaultState = {
  good: {
    title: "someGood",
    count: 0,
    cost: 0
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState
});

// Create the apollo client
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
