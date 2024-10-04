import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';
interface CompanyProfile {
  logo: string;
  currencyprefix: string
  currencypostfix: string
  // Add other properties as needed
}
export const useCompanyProfile = defineStore('CompanyProfile', {
  state: (): { profile: CompanyProfile | null } => ({
    profile: null,
  }),
  actions: {
    async getCompanyProfile() {
      try {
        const apiUrl = `company/profile`
        if (!this.profile) {
          const response = await axiosInstance.get(apiUrl)
          if (response.status === 200) {
            this.profile = response.data.data
          }
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response)
          // Handle error as needed
        }
      }
    },
  },
  // persist: {
  //   key: 'profile'
  // }
})
