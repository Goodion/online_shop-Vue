<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img v-bind:src="`img/${item.product.image}`" width="120" height="120" v-bind:alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <amount-modifier v-bind:amount.sync="amount"/>

    <b class="product__price">
      {{(item.amount * item.product.price) | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" v-on:click.prevent="removeProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import {mapMutations} from 'vuex'
import AmountModifier from "@/components/AmountModifier";

export default {
  name: "CartItem",
  components: {AmountModifier},
  props: ['item'],
  filters: {
    numberFormat
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(v) {
        this.$store.commit('updateCartProductAmount', {productId: this.item.productId, amount: v});
      }
    }
  },
  methods: {
    ...mapMutations({
      removeProduct: 'removeCartProduct'
    }),
  }
}
</script>

<style scoped>

</style>