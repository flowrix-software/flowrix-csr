import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/AuthStore';
import { useTogglePassword } from '../../composables/useTooglePassword';
export default defineComponent({
  name: 'LoginScript',  
  setup() {
  		const router = useRouter();
		const authStore = useAuthStore();
		const checked = ref(false);
		const email = ref(null);
		const password = ref(null);
		const { showPassword, togglePassword } = useTogglePassword();
		const form_error = computed(() => {
		  return authStore.errorResponseData?.message || null;
		});

		const handleLogin = async () => {
		  try {
		    await authStore.login({ email: email.value ?? '', password: password.value ?? '' });

		    if (authStore.responseData.status === 'Success') {
		      router.push({ name: 'Dashboard', params: { tab: 'account' } });
		    }
		  } catch (error) {
		    console.error('Error', error);
		  }
		};
			
	return{
		email,
		showPassword,
		togglePassword,
		password,
		checked,
		form_error,
		handleLogin
	}

  }

 });