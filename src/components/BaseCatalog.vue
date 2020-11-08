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
      <section class="preloader overlay" id="overlay-modal" v-show="catalogLoading">
        <div class="modal active" data-modal="1">
          <div class='sk-fading-circle'>
            <div class='sk-circle sk-circle-1'></div>
            <div class='sk-circle sk-circle-2'></div>
            <div class='sk-circle sk-circle-3'></div>
            <div class='sk-circle sk-circle-4'></div>
            <div class='sk-circle sk-circle-5'></div>
            <div class='sk-circle sk-circle-6'></div>
            <div class='sk-circle sk-circle-7'></div>
            <div class='sk-circle sk-circle-8'></div>
            <div class='sk-circle sk-circle-9'></div>
            <div class='sk-circle sk-circle-10'></div>
            <div class='sk-circle sk-circle-11'></div>
            <div class='sk-circle sk-circle-12'></div>
          </div>
          <div class='sk-text'>Каталог загружается...</div>
        </div>
      </section>
      <section>
        <div class="failure" v-show="catalogLoadingFailure">
          <div class="text">При загрузке каталога произошла ошибка!</div>
          <button v-on:click.prevent="getFullCatalog">Попробовать ещё раз</button>
        </div>
      </section>
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
      catalogLoading: false,
      catalogLoadingFailure: true,
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
      this.catalogLoading = true;
      this.catalogLoadingFailure = false;
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
          .then(response => this.productsData = response.data)
          .catch(() => this.catalogLoadingFailure = true)
          .then(() => this.catalogLoading = false);

      }, 5000);
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
  transition: .3s all;
}
.modal {
  width: 100%;
  max-width: 300px;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;

  box-shadow: 0 3px 10px -.5px rgba(0, 0, 0, .2);
  text-align: center;
  padding: 30px;
  border-radius: 3px;
  background-color: #fff;
  transition: 0.3s all;
}

section .preloader {
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
}
.sk-text {
  position: relative;
  margin: 10px auto;
  color: #337ab7;
  -webkit-animation: blink1 3s linear infinite;
  animation: sk-text 1.3s linear infinite;
}
@-webkit-keyframes sk-text {
  0% { color: rgba(51, 122, 183, 1); }
  50% { color: rgba(51, 122, 183, 0.5); }
  100% { color: rgba(51, 122, 183, 1); }
}
@keyframes sk-text {
  0% { color: rgba(51, 122, 183, 1); }
  50% { color: rgba(51, 122, 183, 0.5); }
  100% { color: rgba(51, 122, 183, 1); }
}
.sk-fading-circle {
  width: 4em;
  height: 4em;
  position: relative;
  margin: 20px auto;
}
.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #337ab7;
  border-radius: 100%;
  animation: sk-fading-circle-delay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle-2 {
  transform: rotate(30deg);
}
.sk-fading-circle .sk-circle-3 {
  transform: rotate(60deg);
}
.sk-fading-circle .sk-circle-4 {
  transform: rotate(90deg);
}
.sk-fading-circle .sk-circle-5 {
  transform: rotate(120deg);
}
.sk-fading-circle .sk-circle-6 {
  transform: rotate(150deg);
}
.sk-fading-circle .sk-circle-7 {
  transform: rotate(180deg);
}
.sk-fading-circle .sk-circle-8 {
  transform: rotate(210deg);
}
.sk-fading-circle .sk-circle-9 {
  transform: rotate(240deg);
}
.sk-fading-circle .sk-circle-10 {
  transform: rotate(270deg);
}
.sk-fading-circle .sk-circle-11 {
  transform: rotate(300deg);
}
.sk-fading-circle .sk-circle-12 {
  transform: rotate(330deg);
}
.sk-fading-circle .sk-circle-2:before {
  animation-delay: -1.1s;
}
.sk-fading-circle .sk-circle-3:before {
  animation-delay: -1s;
}
.sk-fading-circle .sk-circle-4:before {
  animation-delay: -0.9s;
}
.sk-fading-circle .sk-circle-5:before {
  animation-delay: -0.8s;
}
.sk-fading-circle .sk-circle-6:before {
  animation-delay: -0.7s;
}
.sk-fading-circle .sk-circle-7:before {
  animation-delay: -0.6s;
}
.sk-fading-circle .sk-circle-8:before {
  animation-delay: -0.5s;
}
.sk-fading-circle .sk-circle-9:before {
  animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle-10:before {
  animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle-11:before {
  animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle-12:before {
  animation-delay: -0.1s;
}
@keyframes sk-fading-circle-delay {
  0%, 39%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
.failure {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.failure .text {
  color: red;
  text-align: center;
}
.failure button {
  margin-top: 30px;
  font-size: large;
  border-radius: 20px;
  padding: 10px 50px;
  cursor: pointer;
}
.failure button:focus {
  outline: none;
}
</style>