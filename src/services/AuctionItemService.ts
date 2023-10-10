import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { AuctionItem } from '@/auctionitem'

const apiClient : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getAuctionItem(perPage: number, page:number): Promise<AxiosResponse<AuctionItem[]>>{
        return apiClient.get<AuctionItem[]>('/auctionItems?_limit=' + perPage + '&_page=' + page)
    },
    getAuctionItemById(id: number): Promise<AxiosResponse<AuctionItem>>{
        return apiClient.get<AuctionItem>('auctionItems/' + id.toString())
    },

    getAuctionItemsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get<AuctionItem[]>('/auctionItems?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }     
}