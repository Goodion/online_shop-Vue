import Vue from "vue"
import Vuex from "vuex"
import portable_speakers from '@/data/products/portable-speakers'
import smartphones from "@/data/products/smartphones"
import tablets from "@/data/products/tablets";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [
            {
                productId: 's1',
                amount: 2
            }
        ]
    },
    mutations: {
        addProduct(state, {productId, amount}) {
            const item = state.cartProducts.find(item => item.productId === productId);
            if (item) {
                item.amount += amount;
            } else {
                state.cartProducts.push({
                    productId,
                    amount
                });
            }
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(item => item.productId === productId);

            if (item) {
                item.amount = amount;
            }
        },
        removeCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                return {
                    ...item,
                    product: smartphones.concat(portable_speakers).concat(tablets).find(p => p.id === item.productId)
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
    }
});