<template>
  <button @click="scrollToTop" class="scroll-to-top">
    <img src="@/assets/ui/arrow-up-thick.svg" class="ui-icon-large" alt="back to top" />
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 12px;
  right: 12px;
  border: none;
  background: none;
  cursor: pointer;
}

.scroll-to-top:hover {
  opacity: 1;
}
</style>