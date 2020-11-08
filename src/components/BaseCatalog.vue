<template>
  <div class="content__catalog">
    <product-filter
        v-bind:min-price.sync="filterPriceFrom"
        v-bind:max-price.sync="filterPriceTo"
        v-bind:category.sync="filterCategory"
        v-bind:color.sync="filterColor"
        v-on:submit-filter="getFilteredCatalog"
        v-on:clear-filter="getFullCatalog"
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
      <product-list v-bind:catalog="getCurrentPageList" />
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
      catalog: this.getFullCatalog(),

      filterPriceFrom: 0,
      filterPriceTo: 100000,
      filterColor: 'empty',
      filterCategory: 'any',

      productsData: null,
    }
  },
  computed: {
    getCurrentPageList() {
      return this.catalog;
    },
    countItemsQuantity() {
      return (this.productsData && typeof this.productsData.pagination !== 'undefined') ? this.productsData.pagination.total : 0;
    },
    modifyCatalog: {
      get() {
        return this.catalog;
      },
      set(v) {
        this.catalog = v;
      }
    }
  },
  methods: {
    getCurrentPage(page) {
      this.currentPage = page;
    },
    getFilteredCatalog() {
      const filteredCatalog = this.catalog.filter((item) => {

        if (this.filterPriceFrom > 0 || this.filterPriceTo < 100000) {
          if (item.price < this.filterPriceFrom || item.price > this.filterPriceTo) {
            return false;
          }
        }

        if (this.filterCategory !== 'any') {
          if (item.category !== this.filterCategory) {
            return false;
          }
        }

        if (this.filterColor !== 'empty') {
          if (!item.colors || item.colors.findIndex(item => item === this.filterColor) === -1) {
            return false;
          }
        }
        return true;
      });
      return this.modifyCatalog = filteredCatalog;
    },
    getFullCatalog() {
      axios.get('https://vue-study.skillbox.ru/api/products', {
        params: {
          page: this.currentPage,
          limit: 4
        }
      })
        .then(response => this.productsData = response.data);

      return this.productsData ? this.productsData : [];
    },
  },
  watch: {
    productsData() {
      this.modifyCatalog = this.productsData.items.map((product) => {
        return {
          ...product,
          image: product.image.file.url
        }
      });
    },
    currentPage() {
      this.getFullCatalog();
    }
  },
  created() {
    this.getFullCatalog();
  }
}
</script>

<style scoped>

</style>