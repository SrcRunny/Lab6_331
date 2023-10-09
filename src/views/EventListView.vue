<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref , computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'
import EventService from '@/services/EventService'
import NProgress from 'nprogress'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'


const events: Ref<EventItem[]> = ref([])
const router = useRouter()

const keyword = ref('')

const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})


EventService.getEvent(3, props.page)
.then((response: AxiosResponse<EventItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  	let queryFunction;
  	if (keyword.value === null || keyword.value === '') {
	    	queryFunction = EventService.getEvent(3, toPage)
	}else{
    		queryFunction = EventService.getEventsByKeyword(keyword.value, 3, toPage)
  	}   
    queryFunction
  .then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError'})
  })
})

const hasNextPage = computed(()=>{
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})

function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = EventService.getEvent(3, 1)
  }else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, 1)
  }
  queryFunction
  .then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    console.log('events',events.value)
    totalEvent.value = response.headers['x-total-count']
    console.log('totalEvent',totalEvent.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

</script>

<template>
  <h1 class="text-center text-3xl font-bold mb-4">Events for Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        @input="updateKeyword"
      />      
    </div>

    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      class="mb-4"
    ></EventCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="text-left mr-auto"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'EventList', query: { page: page + 1 } }"
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
