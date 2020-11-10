<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" v-bind:to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class='header__count' v-if="this.cartLoading">
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
    </span>
    <span class="header__count" aria-label="Количество товаров"
          v-else
          v-bind:class="{'error': this.cartLoadingFailure}" >{{ indicatorValue }}
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: "CartIndicator",
  computed: {
    ...mapGetters(['cartProductsTotalAmount']),
    ...mapState(['cartLoading', 'cartLoadingFailure']),

    indicatorValue() {
      return !this.cartLoadingFailure ? this.cartProductsTotalAmount : 'Error';
    }
  },
}
</script>

<style scoped>
  .error {
    background-color: red;
  }
  .sk-fading-circle {
    width: 7px;
    height: 7px;
    position: relative;
    margin: 0 auto;
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
    background-color: #000000;
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
</style>