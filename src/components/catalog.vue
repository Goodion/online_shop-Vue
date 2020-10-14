<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(item, index) in catalog" v-bind:key="index">
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
      </li>
    </ul>

    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current">
          1
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          2
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          3
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          4
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          ...
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          10
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import phones from "@/data/products/phones";
import portable_speakers from "@/data/products/portable-speakers";
import tablets from "@/data/products/tablets";

export default {
  name: "catalog",
  data() {
    return {
      phones,
      portable_speakers,
      tablets,
      catalog: phones.concat(portable_speakers).concat(tablets),
    }
  },
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