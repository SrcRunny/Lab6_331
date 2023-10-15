import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { EventOrganizer } from "@/type";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as EventOrganizer | null
    }),
    getters: {
        currentUserName(): string {
            return this.user?.name || ''
        },
        isAdmin(): boolean{
            return this.user?.roles.includes('ROLE_ADMIN') || false
        }
    },
    actions: {
        login(username: string, password: string){
            return apiClient
            .post('/api/v1/auth/authenticate', {
                username: username,
                password: password
            })
            .then((response) => {
                this.token = response.data.access_token
                this.user = response.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return response
            })
        },
        logout(){
            console.log('logout')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
          },
          reload(token: string, user: EventOrganizer){
            this.token = token
            this.user = user
          },
          register(email: string, password: string, firstname: string, lastname: string, username: string){
            return apiClient
            .post('/api/v1/auth/register', {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                username: username
            })
        }
    }
})