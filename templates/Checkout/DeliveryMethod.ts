import { ref, computed, watch, onMounted, onBeforeUnmount, defineComponent, defineAsyncComponent } from "vue";
import { useCheckoutStore } from "../../stores/Checkout";
export default defineComponent({
  name: 'DeliverymethodScript',  
  setup() {	
  	const checkoutStore = useCheckoutStore()
  	const updateDeliveryMethod = (deliveryMethod)=>{
	    // emit('getPreferences');
	    checkoutStore.saveToCheckoutSession(deliveryMethod)
	}

	return{
		checkoutStore,
		updateDeliveryMethod
	}

  }

 });