import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';
import { useRoute } from 'vue-router';
export const useShopStore = defineStore('ShopStore', {
  state: () => ({
    shop: '',
    AllShop: '',
  }),
  actions: {
    async customProducts(query: object) {
      try {
        const response = await axiosInstance.get(`shop/customproducts`, { params: query })
        if (response.status === 200) {
          this.shop = response.data.data
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getShop(page) {
      try {
        const route = useRoute();
        // route.query.page = page
        console.log(route.name);
        const response = await axiosInstance.get(`search`, { params: route.query })
        if (response.status === 200) {
          this.AllShop = response.data.data
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
})
