<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model="minPrice">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model="maxPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="category">
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
              <input class="colors__radio sr-only" type="radio" name="color" value="empty" checked="" v-model="color">
              <span class="colors__value diagonal-line">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="blue" v-model="color">
              <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="green" v-model="color">
              <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="black" v-model="color">
              <span class="colors__value" style="background-color: #000;">
                </span></label>
          </li>
        </ul>
      </fieldset>

<!--      <fieldset class="form__block">-->
<!--        <legend class="form__legend">Объемб в ГБ</legend>-->
<!--        <ul class="check-list">-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">-->
<!--              <span class="check-list__desc">-->
<!--                    8-->
<!--                    <span>(313)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">-->
<!--              <span class="check-list__desc">-->
<!--                    16-->
<!--                    <span>(461)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">-->
<!--              <span class="check-list__desc">-->
<!--                    32-->
<!--                    <span>(313)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">-->
<!--              <span class="check-list__desc">-->
<!--                    64-->
<!--                    <span>(313)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">-->
<!--              <span class="check-list__desc">-->
<!--                    128-->
<!--                    <span>(313)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">-->
<!--              <span class="check-list__desc">-->
<!--                    264-->
<!--                    <span>(313)</span>-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </fieldset>-->

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
  data() {
    return {
      minPriceDefault: 0,
      minPrice: 0,
      maxPriceDefault: 100000,
      maxPrice: 100000,
      categoryDefault: 'any',
      category: 'any',
      colorDefault: 'empty',
      color: 'empty',
    }
  },
  methods: {
    submitFilter() {
      let params = {};
      if (this.minPrice !== this.minPriceDefault || this.maxPrice !== this.maxPriceDefault) {
        params.minPrice = parseInt(this.minPrice);
        params.maxPrice = parseInt(this.maxPrice);
      }
      if (this.category !== this.categoryDefault) {
        params.category = this.category;
      }
      if (this.color !== this.colorDefault) {
        params.color = this.color;
      }
      this.$emit('submit-filter', params);
    },
    clearFilter() {
      this.minPrice = this.minPriceDefault;
      this.maxPrice = this.maxPriceDefault;
      this.color = this.colorDefault;
      this.category = this.categoryDefault;
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