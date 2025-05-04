<template>
  <div>
    <MtrmHeader />
    <ContentList v-slot="{ list }" :query="{ path: '/post', sort: { updated: -1 }, where: { pin: true } }">
      <div class="list">
        <img src="@/assets/ui/pin.svg" class="ui-icon-large ui-icon-unpushable" alt="sort" />
        <NuxtLink :to="page._path" v-for="page in list" :key="page._path" class="list-child">
          <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
          <div class="list-detail">
            <div class="list-title">
              <span><div class="list-title-cap invert">{{ page.title }}</div></span>
              <span v-show="page.warning"><img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" /></span>
            </div>
            <div>
              <span class="list-descr"> {{ page.date }} </span>
              <span v-show="page.date != page.updated" class="list-descr"> - {{ page.updated }}</span>
            </div>
            <div class="list-descr"> {{ page.description }} </div>
          </div>
        </NuxtLink>
      </div>
    </ContentList>
    <ContentList v-slot="{ list }" :query="{ path: '/post', sort: orders[order % 4], where: { hidden: false } }">
      <div class="list">
        <button @click="changeOrder"><img :src="sortIcons[order % 4]" class="ui-icon-large ui-icon-pushable" alt="sort" /></button>
        <nuxt-link :to="page._path" v-for="page in list" :key="page._path" id="list-child-main" class="list-child" :style="`background-color: ${page.articleColor}`">
          <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
          <div class="list-detail">
            <div class="list-title">
              <span><div class="list-title-cap invert">{{ page.title }}</div></span>
              <span v-show="page.warning"><img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" /></span>
            </div>
            <div>
              <span class="list-descr"> {{ page.date }} </span>
              <span v-show="page.date != page.updated" class="list-descr"> - {{ page.updated }}</span>
            </div>
            <div class="list-descr"> {{ page.description }} </div>
          </div>
        </nuxt-link>
        <!--ContentDoc :path="page._path" excerpt :head="false" /-->
      </div>
    </ContentList>
    <!--div class="list">
      <div class="doors">
        <nuxt-link to="/recommend" style="display: flex;">
          <img src="@/assets/ui/door-left.svg" class="ui-icon-large door-left" alt="教室へ" />
          <img src="@/assets/ui/door-right.svg" class="ui-icon-large door-right" alt="教室へ" />
        </nuxt-link>
      </div>
    </div-->
    <div class="blank"></div>
  </div>
  <MtrmFooter />
  <ScrollTop />
</template>

<script setup>
const sortIcons = ref([])
const order = ref(0)
const orders = [{updated: -1}, {updated: 1}, {title: 1}, {title: -1}]

const changeOrder = () => {
  return order.value++
}
onMounted(() => {
  sortIcons.value = [new URL('@/assets/ui/sort-0.svg', import.meta.url).href, new URL('@/assets/ui/sort-1.svg', import.meta.url).href, new URL('@/assets/ui/sort-2.svg', import.meta.url).href, new URL('@/assets/ui/sort-3.svg', import.meta.url).href]
})
</script>

<style scoped>
.doors {
  width: 100%;
  display: flex;
  justify-content: end;
}
.door-left {
  transform: translateX(17px);
}
.door-right {
  transition: 0.4s ease-out;
}
.doors:hover {
  .door-right {
    transform: translateX(-19px);
  }
}
</style>