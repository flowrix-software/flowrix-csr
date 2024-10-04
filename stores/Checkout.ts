import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance' // Adjust the import path accordingly
import { useCartStore } from './Cart.js'

interface PreferenceData {
    fields?: Record<string, any>;
    deliverytype?: string;
    order_no?: string;
    publishableKey?: any;
    [key: string]: any;
}
interface ConfigData {
    preferences?: Record<string, any>[];
    outlets?: Record<string, any>[];
    deliverytype?: string;
    order_no?: string;
    publishableKey?: any;
    calculations?: any;
    shippingmethods?: any;
    cart?: any;
    [key: string]: any;
}

interface fieldData {
    billing_state: number | string,
    billing_firstname: string | number;
    firstname: string | number;
    billing_lastname: string | number;
    lastname: string | number;
    email: string | number;
    billing_mobile: string | number;
    billing_address: string | number;
    billing_suburb: string | undefined;
    billing_postcode: number | undefined,
    shipping_postcode: number | undefined,
    deliverymethod: number | string,
    shippingmethod: number | string,
    authoritytoleave: number | undefined,
    customernotes: string,

}
interface CheckoutState {
    publishableKey: Record<string, any>;
    responseData: any[];
    config:ConfigData;
    checkoutSession: PreferenceData;
    errorResponseData: object;
}

export const useCheckoutStore = defineStore('checkout', {
    state: (): CheckoutState => ({
        publishableKey: {},
        responseData: [],
        config: {},
        checkoutSession: {},
        errorResponseData: {}
    }),

    actions: {
        resetState() {
            this.publishableKey = {}
            this.responseData = []
            this.config = {}
            this.checkoutSession = {}
            this.errorResponseData = {}
        },

        async paymentMethods(formData: any) {
            try {
                const sesisondata = JSON.parse(localStorage.getItem('checkoutSession') as string)
                const apiUrl = `checkout/paymentmethod`
                const response = await axiosInstance.post(apiUrl, formData)
                if (response.status === 200) {
                    this.publishableKey = response.data.data
                }
                sesisondata.fields.paymentmethod = formData.paymentmethod
                return response
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async getConfig() {
            try {
                const formData: any = this.checkoutSession.fields ?? this.checkoutSession;

                if (formData.cart && Object.keys(formData.cart).length > 0) {
                    const itemsToRemove = Object.keys(formData.cart).filter(
                        (key) => formData.cart[key].name === 'Check Measure'
                    )
                    itemsToRemove.forEach((key) => delete formData.cart[key])

                    const samples = Object.keys(formData.cart).filter(
                        (key) => formData.cart[key].product_type === 'sample'
                    )
                    if (samples.length > 0) {
                        samples.forEach((key) => (formData.cart[key].id = formData.cart[key].pid))
                    }
                }

                if (useCartStore().coupon) {
                    formData.vouchercodes = useCartStore().coupon
                }
                formData.cart = useCartStore().cart.items

                const apiUrl = `checkout/configs`
                const response = await axiosInstance.post(apiUrl, formData,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 200) {

                    this.config = response.data.data
                        // fields: {
                        //     ...this.checkoutSession.fields, // Keep existing fields
                        //     ...response.data.data,         // Overwrite with new fields if they exist
                        // }
                    
                    // this.checkoutSession = response.data.data
                    const cart = response.data.data.cart
                    if (cart) {
                        this.config.totals = response.data.data.calculations
                    }

                    let activeService: any = []

                    // if (this.preference.data.deliverytype === 'service') {
                    //     activeService = this.preference.data.preferences.find(
                    //         (pref: any) => pref.id === formData.preferencetype
                    //     ) || []
                    // }

                }
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async submitCheckout() {
            try {
                // const sesisondata = JSON.parse(localStorage.getItem('checkoutSession') as string)
                const formData = this.checkoutSession.fields
                // if (sesisondata.deliverytype === 'shipping') {
                // const itemsToRemove = Object.keys(formData.cart).filter(
                //     (key) => formData.cart[key].type === 'service'
                // )
                // itemsToRemove.forEach((key) => delete formData.cart[key])
                // }

                // const samples = Object.keys(formData.cart).filter(
                //     (key) => formData.cart[key].product_type === 'sample'
                // )
                // if (samples.length > 0) {
                //     samples.forEach((key) => (formData.cart[key].id = formData.cart[key].pid))
                // }

                // if (!sesisondata.hasOwnProperty('order_no')) {
                    const apiUrl = `customer/checkout`
                    // if (localStorage.getItem('coupons')) {
                    //     formData.vouchercodes = JSON.parse(localStorage.getItem('coupons') as string)
                    // }
                    // delete formData.ewayKey

                    const response = await axiosInstance.post(apiUrl, formData,{
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })

                    if (response.status === 200) {
                        this.responseData = response.data
                        let orderData = response.data.data
                         console.log(orderData)
                        window.dataLayer = window.dataLayer || []
                            window.dataLayer.push({
                            "remarketing_event": "purchase",
                            "value": formData.calculations.total,
                            "items": [
                                {
                                    "id": "10",
                                    "google_business_vertical": "retail"
                                }
                            ],
                            "ecommerce": {
                                "purchase": {
                                    "actionField": {
                                        "id": orderData.order_no,
                                        "affiliation": "Main Website-iSeekBlinds-Default Store View",
                                        "order_id": orderData.order_no,
                                        "subtotal": orderData.subtotal,
                                        "shipping": orderData.shipping,
                                        "tax": orderData.tax,
                                        "revenue": orderData.total,
                                        "discount": orderData.discount,
                                        "coupon": orderData.vouchercode,
                                        "created_at": orderData.created_at,
                                        "items": "Automate Pulse 2 Hub",
                                        "items_qty": "Automate Pulse 2 Hub:2"
                                    },
                                    "products": formData.cart
                                },
                                "currencyCode": "AUD",
                                "transaction_id": orderData.order_no,
                                "affiliation": "Main Website-iSeekBlinds-Default Store View",
                                "value": "538.0000",
                                "tax": orderData.tax,
                                "shipping": orderData.shipping,
                                "currency": "AUD",
                                "coupon": orderData.vouchercode,
                                "items": formData.cart
                            },
                            "ga4_event": "purchase",
                            "enhanced": {
                                "email": formData.email,
                                "first_name": formData.billing_firstname,
                                "last_name": formData.billing_lastname,
                                "phone": formData.billing_mobile,
                                "street": formData.billing_address,
                                "city": formData.billing_suburb,
                                "region": formData.billing_state,
                                "postal_code": formData.billing_postcode,
                                "country": "AU"
                            }
                        })
                    }
                // }
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                    this.checkoutSession = {
                        ...this.checkoutSession,
                        fields: {
                            ...this.checkoutSession.fields, // Keep existing fields
                            invoice:error.response.data.data.order_no,         // Overwrite with new fields if they exist
                        }
                    };
                }
            }
        },

        async confirmPayment(checkoutId: string) {
            try {
                const apiUrl = `checkout/success`
                await axiosInstance.post(apiUrl, { token: checkoutId }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } catch (error) {
                console.error('Error confirming payment:', error)
            }
        },

        saveToCheckoutSession(fieldsData: fieldData) {
            this.checkoutSession.fields = {
                ...this.checkoutSession.fields,
                ...fieldsData,
            };
            this.errorResponseData = {}
            this.getConfig()
        },

    },
    persist: {
        key: 'Checkout'
    }
})
