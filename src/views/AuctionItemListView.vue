<script setup lang="ts">
import AuctionItemCard from '../components/AuctionItemCard.vue'
import type { AuctionItem } from '@/auctionitem'
import { ref , computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'
import AuctionItemService from '@/services/AuctionItemService'
import NProgress from 'nprogress'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'


const auctionItems: Ref<AuctionItem[]> = ref([])
const router = useRouter()

const keyword = ref('')

const totalAuctionItem = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})


AuctionItemService.getAuctionItem(3, props.page)
.then((response: AxiosResponse<AuctionItem[]>) => {
  auctionItems.value = response.data
  totalAuctionItem.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  	let queryFunction;
  	if (keyword.value === null || keyword.value === '') {
	    	queryFunction = AuctionItemService.getAuctionItem(3, toPage)
	}else{
    		queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, 3, toPage)
  	}   
    queryFunction
  .then((response: AxiosResponse<AuctionItem[]>) => {
    auctionItems.value = response.data
    totalAuctionItem.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError'})
  })
})

const hasNextPage = computed(()=>{
  const totalPages = Math.ceil(totalAuctionItem.value / 3)
  return props.page.valueOf() < totalPages
})

function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = AuctionItemService.getAuctionItem(3, 1)
  }else {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, 3, 1)
  }
  queryFunction
  .then((response: AxiosResponse<AuctionItem[]>) => {
    auctionItems.value = response.data
    console.log('auctionItems',auctionItems.value)
    totalAuctionItem.value = response.headers['x-total-count']
    console.log('totalAuctionItem',totalAuctionItem.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

</script>

<template>
  <h1 class="text-center text-3xl font-bold mb-4">AUCTION LIST</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        @input="updateKeyword"
      />      
    </div>

    <AuctionItemCard
      v-for="auctionItem in auctionItems"
      :key="auctionItem.id"
      :auctionItem="auctionItem"
      class="mb-4"
    ></AuctionItemCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink
        :to="{ name: 'auction-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="text-left mr-auto"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'auction-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="text-right ml-auto"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>


<!-- <style scoped>

/* .pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev{
  text-align: left;
}

#page-next{
  text-align: right;
} */

</style> -->
