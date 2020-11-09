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
              <div class='sk-fading-circle' v-if="productBeingAdded">
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
              <div class="cart__button" v-else>
                <button class="button button--primery" type="submit">
                  {{ buttonValue }}
                </button>
              </div>
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
import { BASE_API_URL } from "@/config";
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

      productAdded: false,
      productBeingAdded: false,
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
    },
    buttonValue() {
      return !this.productAdded ? 'В корзину' : 'Добавлен';
    }
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addProductToCart']),

    addToCart() {
      this.productAdded = false;
      this.productBeingAdded = true;

      this.addProductToCart({productId: this.item.id, amount: this.productAmount})
      .then(() => {
        this.productAdded = true;
        setTimeout(() => this.productAdded = false, 1000);
        this.productBeingAdded = false;
      });
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
.cart__button {
  margin-top: 0;
  width: auto;
}
.cart__button button {
  cursor: pointer;
}

.sk-fading-circle {
  width: 3.8em;
  height: 3.8em;
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
  background-color: #337ab7;
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
.item__row {
  align-items: center;
  justify-items: center;
}

</style>