<template>
<span>
  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница"
           v-on:click.prevent="selectPage(currentPage - 1)"
           v-bind:class="{'pagination__link--disabled': currentPage === 1}"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="index in countPagesQuantity" v-bind:key="index">
        <a class="pagination__link" v-bind:class="{'pagination__link--current': currentPage === index}" v-on:click="selectPage(index)">
          {{ index }}
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
           v-on:click.prevent="selectPage(currentPage + 1)"
           v-bind:class="{'pagination__link--disabled': currentPage === countPagesQuantity}"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</span>
</template>

<script>
export default {
  name: "BasePagination",
  props: [
    'itemsPerPage',
    'itemsQuantity',
    'currentPage'
  ],
  computed: {
    countPagesQuantity() {
      return Math.ceil(this.itemsQuantity / this.itemsPerPage);
    },
  },
  methods: {
    selectPage(page) {
      this.$emit('set-current-page', page)
    }
  }
}
</script>

<style scoped>
.pagination__item {
  cursor: pointer;
}
</style>