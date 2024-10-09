import { ref ,computed,defineAsyncComponent} from 'vue'
import { defineComponent } from 'vue';
import InnerBanner from '@/components/InnerBanner.vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import banner from '@/assets/images/banner.webp'
import Pagination from '@/components/Others/Pagination.vue';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: 'ShopAllScript',
   props: {
    template: {
      type: String,
      required: false
    }
  },
  components: {
    InnerBanner,
    Pagination,
    ProductCard,
  },
  setup(props) {
    const shop = computed(() => useShopStore().AllShop);  
    const products = computed(() => useShopStore().AllShop.products);  
    const pagination = computed(() => useShopStore().AllShop.products.links);  
    const currentPage = computed(() => useShopStore().AllShop.products.current_page);  
    const lastPage = computed(() => useShopStore().AllShop.products.last_page);  

    
    const ShopTemplate = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_01/Shop/ShopAll.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/template_01/Shop/ShopAll.vue`);
        }
      },
    });


    return {
      shop,
      pagination,
      currentPage,
      products,
      lastPage,
      ShopTemplate,
      banner, // Ensure banner is returned if used in template
    };
  },
});