import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { EventOrganizer } from '@/type'

const apiClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default {
    getOrganizer(perPage: number, page:number): Promise<AxiosResponse<EventOrganizer[]>>{
        return apiClient.get<EventOrganizer[]>('/organizers?_limit=' + perPage + '&_page=' + page)
    },
    getOrganizerById(id: number): Promise<AxiosResponse<EventOrganizer>>{
        return apiClient.get<EventOrganizer>('organizers/' + id.toString())

    },
    saveOrganizer(organizer: EventOrganizer): Promise<AxiosResponse<EventOrganizer>> {
        return apiClient.post<EventOrganizer>('/organizers', organizer)
    },

    getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
            return apiClient.get<EventOrganizer[]>('/organizers')
    }
    
}