<template>
  <main class="content container" v-if="cartLoading">
    <base-preloader v-bind:message="'Корзина загружается...'" />
  </main>
  <main class="content container" v-else-if="cartLoadingFailure" >
    <loading-error
        v-bind:message="'Не удалось загрузить корзину!!!'"
        v-bind:retryButtonValue="'Попробовать ещё раз'"
        v-on:retry="reloadCart"
    />
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Товаров в корзине - {{ this.cartProductsTotalAmount }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" v-on:submit.prevent="order">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item v-for="item in this.cartDetailProducts" v-bind:key="item.productId" v-bind:item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ this.cartTotalPrice | numberFormat }} ₽ </span>
          </p>

          <button class="cart__button button button--primery" type="submit" v-if="cartProductsTotalAmount > 0">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from "@/components/CartItem";
import numberFormat from "@/helpers/numberFormat";
import { mapState } from 'vuex';
import BasePreloader from "@/components/BasePreloader";
import LoadingError from "@/components/LoadingError";
import router from "@/router";

export default {
  name: "CartPage",
  components: {BasePreloader, CartItem, LoadingError},
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartProductsTotalAmount']),
    ...mapState(['cartLoading', 'cartLoadingFailure']),
  },
  filters: {
    numberFormat,
  },
  methods: {
    reloadCart() {
      this.$store.dispatch('getCart');
    },
    order() {
      router.push('order');
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>