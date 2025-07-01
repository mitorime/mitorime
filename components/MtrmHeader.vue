<template>
  <div>
    <NuxtLink to="/" class="edge mtrm-header">
      <img
        src="/icon.png"
        class="mtrm-header-icon"
        :style="`${props.logoFilter}`"
        alt="mitorime logo"
      />
      <img
        :src="`/logo/${props.logoVariant}.png`"
        class="mtrm-header-logotype"
        :style="`${props.logoFilter}`"
        alt="mitorime logotype"
      />
    </NuxtLink>
    <!--img src="@/assets/ui/magnify.svg" class="ui-icon-large" alt="magnify icon" /-->
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  logoVariant?: string,
  logoFilter?: string
}>(), {
  logoVariant: "angular",
  logoFilter: ""
})
</script>

<style lang="scss" scoped>
.mtrm-header {
  height: 54px;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 4px;
}

.mtrm-header-icon {
  margin: 0;
  padding: 6px 0 0 6px;
  width: auto;
  height: 48px;
  filter: invert($dark-inv) sepia($dark-sep) saturate($dark-sat) hue-rotate($dark-hue) brightness($dark-bri) contrast($dark-con);
}

.mtrm-header-logotype {
  margin: 0;
  padding: 6px 0 0;
  width: auto;
  height: 48px;
  filter: invert($dark-inv) sepia($dark-sep) saturate($dark-sat) hue-rotate($dark-hue) brightness($dark-bri) contrast($dark-con);
}
</style>