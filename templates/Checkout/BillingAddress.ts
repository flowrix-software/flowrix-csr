import { ref,defineComponent } from 'vue';
import { useCheckoutStore } from "../../stores/Checkout";
export default defineComponent({
  name: 'BillingAddressScript',  
  setup() {	
  	const checkoutStore = useCheckoutStore()
		const passwordShow = ref('password')
		const password = ref('')
		const password_confirmationShow = ref('password')

		const updateBillingAddress = ((billingfield)=> {
			if(billingfield.register==false){
				 billingfield.password = ''
		    billingfield.password_confirmation = ''
			}
    	checkoutStore.saveToCheckoutSession(billingfield)
		})

		const UserAccount = ref(true)
		const timeout = ref('')
		const CheckingUserAccount = ref(false)
		const CheckUserAccount = (async(billingDetails,userEmail)=>{
			
			console.log(timeout.value)
			if (timeout.value) {
      clearTimeout(timeout.value)
    }
			timeout.value = setTimeout(async() => {
		    billingDetails.register = false
		    billingDetails.password = ''
		    billingDetails.password_confirmation = ''
		    if(userEmail!=''){
		    	CheckingUserAccount.value=true
		        await checkoutStore.CheckUserAccount(userEmail)
		        if(checkoutStore.checkCustomer.status=="Error"){
		            UserAccount.value=true
		        }else{
		            UserAccount.value=false
		        }
		    }else{
		        UserAccount.value=true
		    }
		    		  CheckingUserAccount.value=false
		  },1000);

		  
		    
		})

	return{
		checkoutStore,
		passwordShow,
		password,
		password_confirmationShow,
		updateBillingAddress,
		UserAccount,
		CheckUserAccount,
		CheckingUserAccount
	}

  }

 });