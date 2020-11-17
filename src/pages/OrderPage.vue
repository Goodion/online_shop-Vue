<template>
  <div class="content container">
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
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'order'}">
            Оформление заказа
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
          <div class="cart__data">
            <form-input title="ФИО" v-bind:error="formError.name" placeholder="Введите ваше полное имя" type="text" name="name" v-model="formData.name"/>
            <form-input title="Адрес доставки" v-bind:error="formError.address" placeholder="Введите ваш адрес" type="text" name="address" v-model="formData.address"/>
            <form-input title="Телефон" v-bind:error="formError.phone" placeholder="Введите ваш телефон" type="tel" name="phone" v-model="formData.phone"/>
            <form-input title="Email" v-bind:error="formError.email" placeholder="Введите ваш Email" type="email" name="email" v-model="formData.email"/>
            <form-textarea title="Комментарий к заказу" v-bind:error="formData.comment" placeholder="Ваши пожелания" name="comment" v-model="formData.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block" v-if="cartLoading">
          <base-preloader v-bind:message="'Корзина загружается...'" />
        </div>
        <div class="cart__block" v-else-if="cartLoadingFailure" >
          <loading-error
              v-bind:message="'Не удалось загрузить корзину!!!'"
              v-bind:retryButtonValue="'Попробовать ещё раз'"
              v-on:retry="reloadCart"
          />
        </div>
        <div class="cart__block" v-else>
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in this.cartDetailProducts" v-bind:key="item.id">
              <h3>{{ item.product.title }} - {{ item.amount }} шт.</h3>
              <b>{{ item.product.price | numberFormat}} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p><b>Доставка: 0 ₽</b></p>
            <p>Итого: <b>{{ this.cartProductsTotalAmount }}</b> товара на сумму <b>{{ this.cartTotalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
import numberFormat from "@/helpers/numberFormat";
import BasePreloader from "@/components/BasePreloader";
import LoadingError from "@/components/LoadingError";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import axios from "axios";
import {BASE_API_URL} from "@/config";

export default {
  name: "OrderPage",
  components: {FormTextarea, FormInput, BasePreloader, LoadingError},

  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: null,
    }
  },
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
      this.formError = {};
      this.formErrorMessage = null;

      return axios
          .post(BASE_API_URL + 'api/orders', {
            ...this.formData
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            },
          })
          .then(response => {
            this.$store.commit('resetCart');
            this.$store.commit('updateSuccessOrder', response.data);
            this.$router.push({name: 'successOrder', params: {id: response.data.id}});
          })
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
    }
  }
}
</script>

<style scoped>

</style>