<template>
  <span>
    <router-link class="catalog__pic" v-bind:to="{name: 'product', params: {id: item.id}}">
      <img v-bind:src="`img/${item.image}`" v-bind:srcset="`img/${item.image} 2x`" v-bind:alt="item.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link v-bind:to="{name: 'product', params: {id: item.id}}">
        {{ item.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ item.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black" v-if="item.colors">
      <li class="colors__item" v-for="(color, index) in item.colors" v-bind:key="index">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="">
          <span class="colors__value" v-bind:style="{'background-color': getColorCode(color)}"></span>
        </label>
      </li>
    </ul>
  </span>
</template>

<script>
import getColorCode from "@/helpers/getColorCode";
import numberFormat from "@/helpers/numberFormat";

export default {
  name: "ProductItem",
  props: ['item'],
  filters: {
    numberFormat,
  },
  methods: {
    getColorCode,
  }
}
</script>

<style scoped>
.catalog__list a {
  display:flex;
  align-items:center;
  justify-content: center;
}
.catalog__pic img {
  display:block;
  width: auto;
  max-width: 270px;
  max-height: 350px;
  height: auto;
}
</style>