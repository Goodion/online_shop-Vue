<template>
  <section>
    <div class="failure">
      <div class="text">{{ message }}</div>
      <button v-on:click.prevent="retry">{{ retryButtonValue }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoadingError",
  props: ['message', 'retryButtonValue'],
  methods: {
    retry() {
      this.$emit('retry');
    }
  }
}
</script>

<style scoped>
.failure {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.failure .text {
  color: red;
  text-align: center;
}
.failure button {
  margin-top: 30px;
  font-size: large;
  border-radius: 20px;
  padding: 10px 50px;
  cursor: pointer;
}
.failure button:focus {
  outline: none;
}
</style>