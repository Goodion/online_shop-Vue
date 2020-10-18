<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="item in catalog" v-bind:key="item.id">
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