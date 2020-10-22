<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <catalog></catalog>
  </main>
</template>

<script>
import Catalog from "@/components/BaseCatalog";

export default {
  name: "MainPage",
  components: {
    Catalog
  },
}
</script>

<style scoped>

</style>