<template>
    <!-- <RouterLink class="event-link" :to="{name: 'event-detail', params:{id: event?.id}}"> -->
     <div class="auction-class">
       <div class="auction-card">
         <span>@{{ auctionItem?.description }}</span>
         <h4>{{ auctionItem?.type }}</h4>
         <div v-for="bid in auctionItem?.bids">
          <h3>Bid ID : {{ bid?.id }}</h3>
          <h3>Bid Amount : {{ bid?.amount }}</h3>
          <h3>Bid Date : {{ bid?.date }}</h3>
         </div>
         <h3>The Winner is => </h3>
         <h3>{{ auctionItem?.successfulbid }}</h3>
   
       </div>
     </div>
    <!-- </RouterLink> -->
   </template>
   
   <script setup lang="ts">

   import type { AuctionItem } from '@/auctionitem'
   
   import type { PropType } from 'vue'
   const props = defineProps({
    auctionItem: {
           type: Object as PropType<AuctionItem>,
           require: true    
       }
   })
   </script>
   
   <style scoped>
   .auction-card {
     padding: 20px;
     width: 250px;
     cursor: pointer;
     border: 1px solid #39495c;
     margin-bottom: 18px;
   }
   .auction-card:hover {
     transform: scale(1.01);
     box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
   }
   
   .auction-link{
     color: #2c3e50;
     text-decoration: none;
   }
   
   </style>
   