import { defineStore } from "pinia";
import axiosInstance from "../axios/axios-instance";

interface CartState {
    publishableKey: object,
    responseData: any
}

export const useQuotationCheckout = defineStore('QuotationCheckout', {
    state: (): CartState => ({
        publishableKey: {},
        responseData: []
    }),
    actions: {
        async getQuotaion(slug: string) {
            try {
                const accessToken = this.getAccessToken()
                const apiUrl = `customer/quotations/${slug}`
                const response = await axiosInstance.get(apiUrl, {
                    headers: {
                        Authorization: 'Bearer' + accessToken
                    }
                })

                this.responseData=response.data
            } catch (error) {

            }
        },
        getAccessToken() {

        }
    }
})