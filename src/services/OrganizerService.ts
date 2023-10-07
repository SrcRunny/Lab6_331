import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { OrganizerItem } from '@/organizer'
const apiClient : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getOrganizer(perPage: number, page:number): Promise<AxiosResponse<OrganizerItem[]>>{
        return apiClient.get<OrganizerItem[]>('/organizers?_limit=' + perPage + '&_page=' + page)
    },
    getOrganizerById(id: number): Promise<AxiosResponse<OrganizerItem>>{
        return apiClient.get<OrganizerItem>('organizers/' + id.toString())

    },
    saveOrganizer(organizer: OrganizerItem): Promise<AxiosResponse<OrganizerItem>> {
        return apiClient.post<OrganizerItem>('/organizers', organizer)
    }
}