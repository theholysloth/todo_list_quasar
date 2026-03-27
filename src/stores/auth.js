import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null, 
        token: localStorage.getItem('token') || null
    }), 

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async register(payload){
            const response = await api.post('/register',payload)

            this.token = response.data.token
            this.user = response.data.user
            localStorage.setItem('token', response.data.token)
        },

        async login(payload){
            const response = await api.post('/login',payload)

            this.token = response.data.token
            this.user = response.data.user
            localStorage.setItem('token', response.data.token)
        },

        async fetchMe(){
            const response = await api.get('/me')
            this.user = response.data.user
        },

        async logout(){
            await api.post('/logout')
            this.user = null 
            this.token = null
            localStorage.removeItem('token')
        }
    }
})