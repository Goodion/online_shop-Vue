<template>
  <section class="catalog">
    <div class="categories">
      <div class="category"
           v-bind:class="[`category__${category.id}`, {active: category.id === currentCategoryId}]"
           v-bind:id="category.id"
           v-for="(category, index) in categories"
           v-bind:key="index"
           v-on:click="activateCategory({items: category.items, id: category.id})"
      >
        {{ category.title }}
      </div>
    </div>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(item, index) in currentCategory" v-bind:key="index">
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
import categories from "@/data/categories";

export default {
  name: "catalog",
  data() {
    return {
      currentCategory: categories[0].items,
      currentCategoryId: categories[0].id,
      isActive: false,
      categories,
    }
  },
  methods: {
    activateCategory(category) {
      this.currentCategory = category.items;
      this.currentCategoryId = category.id;
    }
  },
}
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
}
.category {
  font-weight: bolder;
  font-size: larger;
  color: #b9b9b9;
  cursor: pointer;
}
.category:hover {
  color: #737373;
}
.active {
  color: #272727;
  text-decoration: underline;
  cursor: default;
}
.active:hover {
  color: #272727;
}
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