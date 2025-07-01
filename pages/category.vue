<template>
  <div>
    <MtrmHeader />
    <div class="list">
      <div class="search">
        <img src="@/assets/ui/folder.svg" class="ui-icon ui-icon-large" alt="sort" />
        <span class="search-query"> {{ queryCategory }} </span>
      </div>
    </div>
    <ContentList :query="{ path: '/post', sort: orders[order % 4], where: searchCategory }">
      <template #default="{ list }">
        <div class="list">
          <button @click="changeOrder"><img :src="sortIcons[order % 4]" class="ui-icon-large" alt="sort" /></button>
          <nuxt-link :to="page._path" v-for="page in list" :key="page._path" class="list-child">
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
          </nuxt-link>
        </div>
      </template>
      <template #not-found>
        <div class="list">
          <div class="search-notfound">
            not found! ^_^
          </div>
        </div>
      </template>
    </ContentList>
    <div class="blank"></div>
    <MtrmFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const queryCategory = route.query.q
const searchCategory = { categories: { $contains: queryCategory || 'no categories' }, hidden: false }
const sortIcons = ref([])
const order = ref(0)
const orders = ref([{updated: -1}, {updated: 1}, {title: 1}, {title: -1}])

const changeOrder = () => {
  return order.value++
}
useHead({
  title: `${route.query.q}` + 'カテゴリ | ミトリメ',
  meta: [
    { hid: 'og:title', property: 'og:title', content: `${route.query.q}` + 'カテゴリ | ミトリメ' },
  ]
})

onMounted(() => {
  sortIcons.value = [new URL('@/assets/ui/sort-0.svg', import.meta.url).href, new URL('@/assets/ui/sort-1.svg', import.meta.url).href, new URL('@/assets/ui/sort-2.svg', import.meta.url).href, new URL('@/assets/ui/sort-3.svg', import.meta.url).href]
})
</script>
