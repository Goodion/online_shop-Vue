<template>
  <div class="content__catalog">
    <product-filter
        v-bind:min-price.sync="filterPriceFrom"
        v-bind:max-price.sync="filterPriceTo"
        v-bind:category.sync="filterCategory"
        v-bind:color.sync="filterColor"
        v-on:submit-filter="getFilteredCatalog"
    />
    <section class="catalog">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
        Позиций в каталоге - {{ countItemsQuantity }}
      </span>
      </div>
      <product-list v-bind:catalog="currentPageCatalog" />
      <base-pagination
          v-bind:itemsQuantity="countItemsQuantity"
          v-bind:itemsPerPage="itemsPerPage"
          v-bind:currentPage="currentPage"
          v-on:set-current-page="getCurrentPage"
      />
    </section>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter";
import axios from 'axios';
import {BASE_API_URL} from '@/config';

export default {
  name: "catalog",
  components: {
    BasePagination,
    ProductList,
    ProductFilter,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,

      filterPriceFrom: 0,
      filterPriceTo: 100000,
      filterColor: 'empty',
      filterCategory: 0,

      productsData: null,
    }
  },
  computed: {
    currentPageCatalog() {
      return this.productsData
          ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url
            }
          })
          : [];
    },
    countItemsQuantity() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    getCurrentPage(page) {
      this.currentPage = page;
    },
    getFilteredCatalog() {
      return this.currentPageCatalog;
    },
    getFullCatalog() {
      clearTimeout(this.getFullCatalogTimer);
      this.getFullCatalogTimer = setTimeout(() => {
        axios
          .get(BASE_API_URL + 'api/products', {
            params: {
              page: this.currentPage,
              limit: this.itemsPerPage,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
              categoryId: this.filterCategory,
            }
          })
          .then(response => this.productsData = response.data);
      }, 0);
    },
  },
  watch: {
    currentPage() {
      this.getFullCatalog();
    },
    filterPriceFrom() {
      this.getFullCatalog();
    },
    filterPriceTo() {
      this.getFullCatalog();
    },
    filterColor() {
      this.getFullCatalog();
    },
    filterCategory() {
      this.getFullCatalog();
    },
  },
  created() {
    this.getFullCatalog();
  }
}
</script>

<style scoped>

</style>