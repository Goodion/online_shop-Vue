import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
import {BASE_API_URL} from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],

        userAccessKey: null,
        cartProductsData: [],
    },
    mutations: {
        updateCartProductAmount(state, {productId, amount}) {
          const item = state.cartProducts.find(item => item.productId === productId)

          if (item) {
              item.amount = amount;
          }
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map((product) => {
                return {
                    productId: product.product.id,
                    amount: product.quantity
                };

            });
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url,
                    }
                }
            });
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => {
               return acc += item.product.price * item.amount;
            }, 0);
        },
        cartProductsTotalAmount(state) {
            return state.cartProducts.length;
        }
    },
    actions: {
        getCart(context) {
            return (new Promise(resolve => setTimeout(resolve, 10000)))
                .then(() => {
                    return axios
                        .get(BASE_API_URL + 'api/baskets', {
                            params: {
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response => {
                            if (!context.state.userAccessKey) {
                                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                                context.commit('updateUserAccessKey', response.data.user.accessKey);
                            }
                            context.commit('updateCartProductsData', response.data.items);
                            context.commit('syncCartProducts');
                        })
                });
        },
        addProductToCart(context, {productId, amount}) {
            return (new Promise(resolve => setTimeout(resolve, 1000)))
                .then(() => {
                    return axios
                        .post(BASE_API_URL + 'api/baskets/products', {
                            productId,
                            quantity: amount
                        }, {
                            params: {
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response => {
                            context.commit('updateCartProductsData', response.data.items);
                            context.commit('syncCartProducts');
                        });
                });
        },
        updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProductAmount', {productId, amount});

            if (amount < 1) {
                return;
            }

            return axios
                .put(BASE_API_URL + 'api/baskets/products', {
                    productId,
                    quantity: amount,
                }, {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                })
                .catch(() => {
                    context.commit('syncCartProducts');
                });
        },
        removeProductFromCart(context, {productId}) {
            return axios
                .delete(BASE_API_URL + 'api/baskets/products', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    },
                    data: {
                        productId,
                    }
                })
                .then(response => {
                    context.commit('updateCartProductsData', response.data.items);
                    context.commit('syncCartProducts');
                });
        }
    }
});