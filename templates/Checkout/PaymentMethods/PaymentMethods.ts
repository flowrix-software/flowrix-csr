import {defineComponent, defineAsyncComponent } from "vue";
import { useCheckoutStore } from "../../../stores/Checkout";
export default defineComponent({
  name: 'PaymentMethodScript',  
  setup() {	
  	const Stripe = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Stripe.vue')
		)

		const Eway = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Eway.vue')
		)

		const Till = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Till.vue')
		)
		const Paypal = defineAsyncComponent(() =>
			import('@/components/template_01/Checkout/PaymentMethods/Paypal.vue')
		)
		 
		function getPaymentComponent(methodKey) {
		    switch (methodKey) {
		        case 'web-eway':
		            return Eway;
		        case 'web-till-payment':
		            return Till;
		        case 'web-stripe':
		            return Stripe;
				case 'web-paypal':
		            return Paypal;
		        default:
		            return null;
		    }
		}

	return{
		Stripe,
		Eway,
		Till,
		Paypal,
		getPaymentComponent
	}

  }

 });