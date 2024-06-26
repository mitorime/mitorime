<template>
  <div>
    <div class="list">
      <div class="search">
        <img src="@/assets/ui/folder.svg" class="ui-icon-large" alt="sort" />
        <span class="search-query"> {{ queryCategory }} </span>
      </div>
    </div>
    <ContentList :query="{ path: '/post', sort: orders[order % 4], where: searchCategory }">
      <template #default="{ list }">
        <div class="list">
          <button @click="changeOrder"><img :src="`/_nuxt/assets/ui/sort-${order % 4}.svg`" class="ui-icon-large" alt="sort" /></button>
          <nuxt-link :to="page._path" v-for="page in list" :key="page._path" class="list-child">
            <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
            <div class="list-detail">
              <strong class="invert">{{ page.title }}</strong>
              <div> {{ page.date }} </div>
              <div class="list-descr"> {{ page.description }} </div>
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
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute()
    const queryCategory = route.query.q
    const searchCategory = { categories: { $contains: queryCategory || 'no categories' }, hidden: false }
    const order = ref(0)
    const orders = ref([{date: -1}, {date: 1}, {title: 1}, {title: -1}])
    const changeOrder = () => {
      return order.value++
    }
    useHead({
      title: `${route.query.q}` + 'カテゴリ | ミトリメ',
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${route.query.q}` + 'カテゴリ | ミトリメ' },
      ]
    })
    return {
      queryCategory, searchCategory, order, orders, changeOrder
    }
  }
}
</script>
