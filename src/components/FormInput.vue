<template>
 <form-input-template v-bind:title="title" v-bind:error="error">
   <input class="form__input" v-bind:type="type" v-bind:name="name" v-bind:placeholder="placeholder" v-model="dataValue">
 </form-input-template>
</template>

<script>
import formInputMixin from "@/mixins/formInputMixin";

export default {
  mixins: [formInputMixin],
  props: ['type'],
}
</script>

<style scoped>

</style>