<template>
  <div class="error-wrapper">
    <MtrmHeader />
    <div class="error-container">
      <div class="error-code">{{ error.statusCode }}</div>
      <div class="error-details">{{ error.message }}</div>
      <NuxtLink to="/" class="error-details">もどる</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const error = useError()
</script>

<style scoped>
.error-wrapper {
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-flow: column nowrap;
}
.error-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  margin: auto;
  text-align: center;
  flex-grow: 1;
  gap: 12px;
}
.error-code {
  font-size: 60px;
  font-weight: bold;
}
.error-details {
  word-break: break-all;
}
</style>