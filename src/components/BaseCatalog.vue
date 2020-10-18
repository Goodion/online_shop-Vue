<template>
  <div class="content__catalog">
    <product-filter />
    <section class="catalog">
      <product-list v-bind:catalog="getCurrentPageList" />
      <base-pagination
          v-bind:itemsQuantity="countItemsQuantity"
          v-bind:itemsPerPage="itemsPerPage"
          v-bind:currentPage="currentPage"
          v-on:set-current-page="setCurrentPage"
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
    catalog() {
      return smartphones.concat(portable_speakers).concat(tablets);
    }
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    }
  }
}
</script>

<style scoped>

</style>