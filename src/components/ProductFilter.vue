<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="currentCategory">
            <option value="0" selected>Все категории</option>
            <option v-bind:value="category.id" v-for="category in categories" v-bind:key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="empty" checked v-model="currentColor">
              <span class="colors__value diagonal-line">
                  </span>
            </label>
          </li>
          <li class="colors__item" v-for="color in colors" v-bind:key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" v-bind:name="color.title" v-bind:value="color.id" v-model="currentColor">
              <span class="colors__value" v-bind:style="{'background-color': color.code}">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" v-on:click.prevent="submitFilter">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" v-on:click.prevent="clearFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import {BASE_API_URL} from '@/config';

export default {
  name: "ProductFilter",
  props: [
      'minPrice',
      'maxPrice',
      'category',
      'color',
  ],
  data() {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 100000,
      currentCategory: 0,
      currentColor: 'empty',

      colorsData: null,
      categoriesData: null
    }
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData : [];
    }
  },
  watch: {
    minPrice(v) {
      this.currentMinPrice = v;
    },
    maxPrice(v) {
      this.currentMaxPrice = v;
    },
    category(v) {
      this.currentCategory = v;
    },
    color(v) {
      this.currentColor = v;
    }
  },
  methods: {
    submitFilter() {
      this.$emit('update:minPrice', this.currentMinPrice);
      this.$emit('update:maxPrice', this.currentMaxPrice);
      this.$emit('update:category', this.currentCategory);
      this.$emit('update:color', this.currentColor);
      this.$emit('submit-filter');
    },
    clearFilter() {
      this.$emit('update:minPrice', 0);
      this.$emit('update:maxPrice', 100000);
      this.$emit('update:category', 0);
      this.$emit('update:color', 'empty');
    },
    getColors() {
      axios
          .get(BASE_API_URL + 'api/colors')
          .then(response => this.colorsData = response.data.items);
    },
    getCategories() {
      axios
          .get(BASE_API_URL + 'api/productCategories')
          .then(response => this.categoriesData = response.data);
    },
  },
  created() {
    this.getColors();
    this.getCategories();
  },
}
</script>

<style scoped>
.diagonal-line {
  background-color: #ffffff;
  background-image: linear-gradient(to bottom right, transparent 43%, #ff0000, transparent 57%);
  background-repeat: no-repeat;
}
</style>