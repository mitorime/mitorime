<template>
  <div class="mtrm-footer edge">
    <NuxtLink to="/" class="mtrm-footer-logo">
      <img src="/icon.png" class="mtrm-footer-icon" alt="mitorime logo"/>
      <img src="/logo/angular.png" class="mtrm-footer-logotype" alt="mitorime logotype"/>
    </NuxtLink>
    <div class="mtrm-footer-text text-light">copyleft 2024-2025 mitori<span class="text-dark-grey">・powered by Nuxt.js</span></div>
  </div>
</template>

<style lang="scss" scoped>
.mtrm-footer {
  flex-flow: column;
  background-color: $basic_dark;
}

.mtrm-footer-logo {
  width: fit-content;
  object-fit: contain;
  margin: 8px 8px 16px;
  width: 104px;
  height: 34px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  gap: 4px;
}

.mtrm-footer-icon {
  width: auto;
  height: 34px;
  filter: invert($light-inv) sepia($light-sep) saturate($light-sat) hue-rotate($light-hue) brightness($light-bri) contrast($light-con);
}

.mtrm-footer-logotype {
  width: auto;
  height: 34px;
  filter: invert($light-inv) sepia($light-sep) saturate($light-sat) hue-rotate($light-hue) brightness($light-bri) contrast($light-con);
}

.mtrm-footer-text {
  margin: 0 8px 12px;
}
</style>