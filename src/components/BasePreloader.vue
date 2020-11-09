<template>
  <section class="preloader overlay" id="overlay-modal">
    <div class="modal active" data-modal="1">
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
      <div class='sk-text'>{{ message }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BasePreloader",
  props: ['message'],
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
  transition: .3s all;
}
.modal {
  width: 100%;
  max-width: 300px;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;

  box-shadow: 0 3px 10px -.5px rgba(0, 0, 0, .2);
  text-align: center;
  padding: 30px;
  border-radius: 3px;
  background-color: #fff;
  transition: 0.3s all;
}
section .preloader {
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
}
.sk-text {
  position: relative;
  margin: 10px auto;
  color: #337ab7;
  -webkit-animation: blink1 3s linear infinite;
  animation: sk-text 1.3s linear infinite;
}
@-webkit-keyframes sk-text {
  0% { color: rgba(51, 122, 183, 1); }
  50% { color: rgba(51, 122, 183, 0.5); }
  100% { color: rgba(51, 122, 183, 1); }
}
@keyframes sk-text {
  0% { color: rgba(51, 122, 183, 1); }
  50% { color: rgba(51, 122, 183, 0.5); }
  100% { color: rgba(51, 122, 183, 1); }
}
.sk-fading-circle {
  width: 4em;
  height: 4em;
  position: relative;
  margin: 20px auto;
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
</style>