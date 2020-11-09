<template>
  <main class="content container" v-if="productLoading">
    <base-preloader v-bind:message="'Информация загружается...'" />
  </main>
  <main class="content container" v-else-if="productLoadingFailure">
    <loading-error
        v-bind:message="'Не удалось загрузить карточку товара!!!'"
        v-bind:retryButtonValue="'Попробовать ещё раз'"
        v-on:retry="getProductDetail"
    />
  </main>
  <main class="content container" v-else>
    <div class="content__top" v-show="productData">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">
            {{ itemCategoryTitle }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img max-width="570" max-height="570" v-bind:src="itemImageUrl" v-bind:srcset="`${itemImageUrl} 2x`" v-bind:alt="item.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ item.id }}</span>
        <h2 class="item__title">
          {{ item.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ item.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors" v-if="item.colors">
                <li class="colors__item" v-for="(color, index) in item.colors" v-bind:key="index">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-1" value="color.code" checked="">
                    <span class="colors__value" v-bind:style="{'background-color': color.code}"></span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">

              <amount-modifier v-bind:amount.sync="productAmount" />

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import AmountModifier from "@/components/AmountModifier";
import axios from "axios";
import {BASE_API_URL} from "@/config";
import BasePreloader from "@/components/BasePreloader";
import LoadingError from "@/components/LoadingError";
import { mapActions } from 'vuex';

export default {
  name: "ProductPage",
  components: {
    AmountModifier,
    BasePreloader,
    LoadingError
  },
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailure: true,
    }
  },
  computed: {
    item() {
      return this.productData;
    },
    itemImageUrl() {
      return this.item.image.file.url;
    },
    itemCategoryTitle() {
      return this.item.category.title;
    }
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addProductToCart']),

    addToCart() {
      this.addProductToCart({productId: this.item.id, amount: this.productAmount})
    },
    getProductDetail() {
      this.productLoading = true;
      this.productLoadingFailure = false;
      clearTimeout(this.getProductDetailTimer);
      this.getProductDetailTimer = setTimeout(() => {
        axios
            .get(BASE_API_URL + `api/products/${this.$route.params.id}`)
            .then(response => this.productData = response.data)
            .catch(() => this.productLoadingFailure = true)
            .then(() => this.productLoading = false);
      }, 2000);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.getProductDetail();
      },
      immediate: true,
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
.pics__wrapper {
  display: flex;
  align-items:center;
  justify-content: center;
}
button {
  cursor: pointer;
}
</style>