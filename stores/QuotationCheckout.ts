import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';

export const useQuotationCheckout = defineStore('QuotationCheckout', {
    state: (): CartState => ({
        publishableKey: {},
        responseData: [],
        checkoutSession: JSON.parse(localStorage.getItem('checkoutSession')) || [],
        preference: [],
        errorResponseData: []
    }),
    actions: {
        resetState() {
          this.publishableKey = {}
          this.responseData = []
          this.checkoutSession = []
          this.preference = []
          this.errorResponseData = []
        },
        async getQuotation(slug) {
      try {
        const apiUrl = `customer/quotations/${slug}`
        const response = await axiosInstance.get(apiUrl)

        if (response.status === 200) {
          this.publishableKey = response.data.data
        }
        this.responseData = response.data
        console.log(response)
      } catch (error) {
        if (error.response) {
          this.errorResponseData = error.response.data
        }
      }
    },
        async getGuestQuotation(slug, query) {
      try {
        // const accessToken = this.getAccessTokenFromlocalStorage()
        const apiUrl = `quotations/${slug}`
        const response = await axiosInstance.get(apiUrl, {
          params: query
        })
        if (response.status === 200) {
          this.publishableKey = response.data.data
        }
        this.responseData = response.data
      } catch (error) {
        alert(error)
        if (error.response) {
          this.errorResponseData = error.response.data
        }
      }
    },
    async GuestCheckoutQuotation(slug, query) {
      try {
        // const accessToken = this.getAccessTokenFromlocalStorage()
        let FormData = {}
        const apiUrl = `quotations/${slug}`
        FormData.paymentmethod = 2
        FormData.clientsceret = this.publishableKey.clientsceret
        const response = await axiosInstance.post(apiUrl, FormData, {
          params: query
        })
        if (response.status === 200) {
          this.publishableKey = response.data.data
        }
        this.responseData = response.data
      } catch (error) {
        alert(error)
        if (error.response) {
          this.errorResponseData = error.response.data
        }
      }
    },
    async paymentMethods(formData) {
      try {
        const apiUrl = `checkout/paymentmethod`
        const response = await axiosInstance.post(apiUrl, formData)
        if (response.status === 200) {
          this.publishableKey = response.data.data
        }
        return response
      } catch (error) {
        if (error.response) {
          this.errorResponseData = error.response.data
        }
      }
    },
    async saveToCheckoutSession(fieldsData) {
      const sesisondata = JSON.parse(localStorage.getItem('checkoutSession'))
      ;(fieldsData.deliverymethod =
        fieldsData.deliverymethod != ''
          ? fieldsData.deliverymethod
          : sesisondata.fields.deliverymethod),

      this.preference.data.fields = fieldsData
      this.saveToCheckoutlocalStorage()
    },
    saveToCheckoutlocalStorage() {
      const sesisonCart = JSON.parse(localStorage.getItem('cart'))
      this.preference.data.fields.cart = sesisonCart.items
      localStorage.setItem('checkoutSession', JSON.stringify(this.preference.data))
    },
    async submitCheckout(slug) {
        try {
            let FormData = {}
            let response = {}
            FormData.paymentmethod = 2
            FormData.clientsceret = this.publishableKey.clientsceret
            const accessToken = this.getAccessTokenFromlocalStorage()
            const apiUrl = `customer/checkout/quotation/${slug}`
            console.log(accessToken)
            response = await axiosInstance.post(apiUrl, FormData, {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            })
            if (response.status === 200) {
              this.responseData = response.data
            }
        } catch (error) {
            if (error.response) {
              this.errorResponseData = error.response.data
            }
        }
    },
        getAccessToken() {

        }
    }
})