import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { EventItem } from '@/type'

export default{
    getEvent(perPage: number, page:number): Promise<AxiosResponse<EventItem[]>>{
        return apiClient.get<EventItem[]>('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<EventItem>>{
        return apiClient.get<EventItem>('events/' + id.toString())
    },
    saveEvent(event: EventItem): Promise<AxiosResponse<EventItem>> {
        return apiClient.post<EventItem>('/events', event)
    },
    getEventsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get<EventItem[]>('/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
    }     
}