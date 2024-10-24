import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore';
import { useTogglePassword } from '../../composables/useTooglePassword'
import { usePasswordFormat } from '../../composables/usePasswordFormatter'
import { useNumberInput } from '../../composables/useNumberOnly';
export default defineComponent({
  name: 'RegisterScript',  
  setup() {
  		// Initialize Vue Router and Store
	const router = useRouter()
	const route = useRoute()
	const authStore = useAuthStore()

	const inputData = ref({passwordStrengthValue:0});

	// Use composables
	const { showPassword, togglePassword } = useTogglePassword()
	const password = ref<string | null>(null)
	const confirmPassword = ref<string | null>(null)

	// Password format composable
	const {
	    passwordStrength,
	    passwordStrengthClass,
	    passwordStrengthTextColor,
	    passwordStrengthWidth
	} = usePasswordFormat(password,inputData.value)

	// Form fields
	const firstName = ref<string | null>(null)
	const lastName = ref<string | null>(null)
	const email = ref<string | null>(null)
	const { inputValue: mobile, errorMessage, handleInput } = useNumberInput();

	// Signup function
	const signupFunction = async () => {
	    if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
	        console.error('All fields are required')
	        return
	    }

	    try {
	        await authStore.addCustomer({
	            firstname: firstName.value,
	            lastname: lastName.value,
	            email: email.value,
	            mobile: mobile.value,
	            password: password.value,
	            email_confirmation: email.value,
	            password_confirmation: confirmPassword.value
	        })

	        if (authStore.responseData.status === 'Success') {
	            setTimeout(() => {
	                if (route.path.includes('cart')) {
	                    router.push({ name: 'Checkout' })
	                } else if (localStorage.getItem('user')) {
	                    router.push({ name: 'Dashboard', params: { tab: 'account' } });
	                }
	            }, 1000)
	        }
	    } catch (error) {
	        console.error('Signup failed', error)
	    }
	}
			
	return{
		router,
		route,
		authStore,
		inputData,
		passwordStrength,
		passwordStrengthClass,
		passwordStrengthTextColor,
		passwordStrengthWidth,
		firstName,
		lastName,
		email,
		inputValue,
		errorMessage,
		signupFunction
	}

  }

 });