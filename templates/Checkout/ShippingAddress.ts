import { ref,defineComponent } from 'vue';
import { useCheckoutStore } from "../../stores/Checkout";
export default defineComponent({
  name: 'ShippingAddressScript',  
  setup() {	
  	const checkoutStore = useCheckoutStore()
		const updateShippingAddress = ((shippingfield)=> {
    	checkoutStore.saveToCheckoutSession(shippingfield)
		})

	return{
		checkoutStore,		
		updateShippingAddress
	}

  }

 });