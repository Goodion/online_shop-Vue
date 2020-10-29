<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" v-bind:to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ totalAmount }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "CartIndicator",
  computed: {
    ...mapGetters({totalAmount: 'cartProductsTotalAmount'}),
  },
}
</script>

<style scoped>

</style>