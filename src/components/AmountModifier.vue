<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" v-on:click="currentAmount--" v-bind:disabled="amount <= 1">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentAmount" name="count">

    <button type="button" aria-label="Добавить один товар" v-on:click="currentAmount++">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  name: "AmountModifier",
  data() {
    return {
      currentAmount: this.amount,
    }
  },
  watch: {
    currentAmount() {
      return this.$emit('update:amount', this.currentAmount);
    }
  }
}
</script>

<style scoped>

</style>