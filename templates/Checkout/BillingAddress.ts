import { ref,defineComponent } from 'vue';
import { useCheckoutStore } from "../../stores/Checkout";
export default defineComponent({
  name: 'BillingAddressScript',  
  setup() {	
  	const checkoutStore = useCheckoutStore()
		const passwordShow = ref('password')
		const password = ref('')
		const passwordconfirmShow = ref('password')

		const updateBillingAddress = ((billingfield)=> {
    	checkoutStore.saveToCheckoutSession(billingfield)
		})

		const UserAccount = ref(true)

		const CheckUserAccount = (async(billingDetails,userEmail)=>{
		    billingDetails.createacount = false
		    billingDetails.password = ''
		    billingDetails.passwordconfirm = ''
		    if(userEmail!=''){
		        await checkoutStore.CheckUserAccount(userEmail)
		        if(checkoutStore.checkCustomer.status=="Error"){
		            UserAccount.value=true
		        }else{
		            UserAccount.value=false
		        }
		    }else{
		        UserAccount.value=true
		    }
		    
		})

	return{
		checkoutStore,
		passwordShow,
		password,
		passwordconfirmShow,
		updateBillingAddress,
		UserAccount,
		CheckUserAccount
	}

  }

 });