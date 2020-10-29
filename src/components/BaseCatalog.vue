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
import smartphones from "@/data/products/smartphones";
import portable_speakers from "@/data/products/portable-speakers";
import tablets from "@/data/products/tablets";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter";

export default {
  name: "catalog",
  components: {
    BasePagination,
    ProductList,
    ProductFilter,
  },
  data() {
    return {
      smartphones,
      portable_speakers,
      tablets,
      currentPage: 1,
      itemsPerPage: 4,
      catalog: this.getFullCatalog(),

      filterPriceFrom: 0,
      filterPriceTo: 100000,
      filterColor: 'empty',
      filterCategory: 'any',
    }
  },
  computed: {
    getCurrentPageList() {
      let arr = this.catalog;
      const offset = (this.currentPage - 1) * this.itemsPerPage;
      return arr.slice(offset, offset + this.itemsPerPage);
    },
    countItemsQuantity() {
      return this.catalog.length;
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
      this.getCurrentPage(1);
      return this.modifyCatalog = smartphones.concat(portable_speakers).concat(tablets);
    },
  },
}
</script>

<style scoped>

</style>