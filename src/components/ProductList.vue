<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="(item, index) in catalog" v-bind:key="index">
      <product-item v-bind:item="item"/>
    </li>
  </ul>
</template>

<script>
import ProductItem from "@/components/ProductItem";

export default {
  name: "ProductList",
  components: {ProductItem},
  props:
    ['catalog']
}
</script>

<style scoped>

</style>