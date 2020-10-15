<template>
  <section class="catalog">
    <ProductList v-bind:catalog="catalog"></ProductList>
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
import ProductList from "@/components/ProductList";

export default {
  name: "catalog",
  components: {ProductList},
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

</style>