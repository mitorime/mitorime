<template>
  <div>
    <MtrmHeader />
    <ContentList v-slot="{ list }" :query="{ path: '/post', sort: { updated: -1 }, where: { pin: true } }">
      <div class="list">
        <img src="@/assets/ui/pin.svg" class="ui-icon ui-icon-large ui-icon-unpushable" alt="sort" />
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
            <!--div class="list-descr"> {{ page.description }} </div-->
            <div class="list-categories"> {{ page.categories }}</div>
          </div>
        </NuxtLink>
      </div>
    </ContentList>

    <div class="list">
      <button @click="changeOrder" class="list-button">
        <img :src="sortIcons[order % 4]" class="ui-icon ui-icon-large ui-icon-pushable" alt="sort" />
      </button>
      <nuxt-link
        :to="page._path"
        v-for="page in list"
        :key="page._path"
        id="list-child-main"
        class="list-child"
        :style="`background-color: ${page.articleColor}`"
      >
        <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
        <div class="list-detail">
          <div class="list-title">
            <span><div class="list-title-cap invert">{{ page.title }}</div></span>
            <span v-show="page.warning">
              <img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" />
            </span>
          </div>
          <div>
            <span class="list-descr"> {{ page.date }} </span>
            <span v-show="page.date != page.updated" class="list-descr"> - {{ page.updated }}</span>
          </div>
          <!--div class="list-descr"> {{ page.description }} </div-->
          <div class="list-categories"> {{ page.categories }}</div>
        </div>
      </nuxt-link>
    </div>

    <div class="list">
      <div class="pagination">
        <NuxtLink :to="`/?page=${currentPage - 1}`" :disabled="currentPage === 1" class="pagination-button"><</NuxtLink>
        <NuxtLink :to="`/?page=1`" :disabled="currentPage === 1" class="pagination-button">1</NuxtLink>
        <div v-for="i of 3" :key="i">
          <NuxtLink :to="`/?page=${currentPage -2 +i}`" :disabled="i === 2" v-if="(totalPages >= 3) && ((currentPage -2 +i) >= 2) && ((currentPage -2 +i) < totalPages)" class="pagination-button"> {{ (currentPage -2) +i }} </NuxtLink>
        </div>
        <NuxtLink :to="`/?page=${totalPages}`" :disabled="currentPage === totalPages" v-if="totalPages >= 2" class="pagination-button"> {{ totalPages }} </NuxtLink>
        <NuxtLink :to="`/?page=${currentPage + 1}`" :disabled="currentPage === totalPages" class="pagination-button">></NuxtLink>
      </div>
    </div>

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
const route = useRoute()
const perPage = 5
const currentPage = ref(1)
const sortIcons = ref([])
const order = ref(0)
const orders = [{updated: -1}, {updated: 1}, {title: 1}, {title: -1}]

const changeOrder = () => {
  order.value++
  currentPage.value = 1
}

const list = ref([])
const totalCount = ref(0)

const fetchList = async () => {
  currentPage.value = parseInt(route.query.page) || 1
  try {
    const result = await queryContent('/post')
      .where({ hidden: false })
      .sort(orders[order.value % 4])
      .skip((currentPage.value - 1) * perPage)
      .limit(perPage)
      .find()
    list.value = result

    const count = await queryContent('/post')
      .where({ hidden: false })
      .count()
    totalCount.value = count
  } catch (error) {
    console.error('記事の取得に失敗しました:', error)
    list.value = []
    totalCount.value = 0
  }
}

watch(
  () => [route.fullPath, order],
  () => {
    fetchList()
  }, { immediate: true }
)

const totalPages = computed(() => Math.ceil(totalCount.value / perPage))

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