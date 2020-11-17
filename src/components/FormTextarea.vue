<template>
  <form-input-template>
    <textarea class="form__input" v-bind:name="name" v-bind:placeholder="placeholder" v-model="dataValue"></textarea>
  </form-input-template>
</template>

<script>
import formInputMixin from "@/mixins/formInputMixin";

export default {
  mixins: [formInputMixin]
}
</script>

<style scoped>

</style>