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
            <option value="any" selected>Все категории</option>
            <option value="smartphones">Смартфоны</option>
            <option value="tablets">Планшеты</option>
            <option value="portable-speakers">Портативная акустика</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="empty" checked="" v-model="currentColor">
              <span class="colors__value diagonal-line">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="blue" v-model="currentColor">
              <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="green" v-model="currentColor">
              <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="black" v-model="currentColor">
              <span class="colors__value" style="background-color: #000;">
                </span></label>
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
      currentCategory: 'any',
      currentColor: 'empty',
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
      this.currentMinPrice = 0;
      this.currentMaxPrice = 100000;
      this.currentCategory = 'any';
      this.currentColor = 'empty';
      this.$emit('clear-filter');
    }
  }
}
</script>

<style scoped>
.diagonal-line {
  background-color: #ffffff;
  background-image: linear-gradient(to bottom right, transparent 43%, #ff0000, transparent 57%);
  background-repeat: no-repeat;
}
</style>