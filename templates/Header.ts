import { computed, ref, defineComponent, defineAsyncComponent } from 'vue'
import AddMenuIcon1 from '@/assets/images/menu/menu-icon-add-01.svg'
import AddMenuIcon2 from '@/assets/images/menu/menu-icon-add-02.svg'
import AddMenuIcon3 from '@/assets/images/menu/menu-icon-add-03.svg'
import { useCompanyProfile } from '../stores/CompanyProfile'
import { useNavMenu } from '../stores/NavMenu'
import { useAuthStore } from '../stores/AuthStore'
import { useUserStore } from '../stores/UserStore'
import { useCartStore } from '../stores/Cart'

export default defineComponent({
  name: 'HeaderScript',
  setup() {
    const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;
    const NavMenu = useNavMenu()
    const CompanyProfile = useCompanyProfile()
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const userStore = useUserStore()

    const companyProfile = computed(() => CompanyProfile.profile)
    const menuData = computed<Menu>(() =>{
      
     const headmenu =  NavMenu.Menu.filter((menu) => menu.location=='header')[0]
     return headmenu

    });

    const userData = computed(() => userStore.user?userStore.user:'' || {});

    const mobile_menu = ref(false)
    const OpenMobileMenu = () => {
      if (mobile_menu.value) {
        mobile_menu.value = false
      } else {

        mobile_menu.value = true
      }
    }

    const Menu = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_01/Menu/MainMenu.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/template_01/Menu/MainMenu.vue`);
        }
      },
    });


    return {
      NavMenu,
      companyProfile,
      authStore,
      cartStore,
      userStore,
      userData,
      menuData,
      mobile_menu,
      Menu
      
    };
  },
});