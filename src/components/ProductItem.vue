<template>
  <span>
    <a class="catalog__pic" href="#">
    <img v-bind:src="`img/${item.image}`" v-bind:srcset="`img/${item.image} 2x`" v-bind:alt="item.title">
  </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ item.title }}
      </a>
    </h3>

    <span class="catalog__price">
            {{ item.price }}
          </span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="">
          <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000">
          <span class="colors__value" style="background-color: #8BE000;">
                    </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">
          <span class="colors__value" style="background-color: #222;">
                    </span>
        </label>
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  name: "ProductItem",
  props: ['item']
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