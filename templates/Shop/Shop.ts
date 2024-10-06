import { defineComponent,defineAsyncComponent } from 'vue';
import InnerBanner from '@/components/InnerBanner.vue';
import Pagination from '@/components/Others/Pagination.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import banner from '@/assets/images/banner.webp';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: 'ShopScript',  
  props: {
    template: {
      type: String,
      required: false
    }
  },
  components: {
    InnerBanner,
    Pagination,
    ProductCard
  },
  setup(props) {
    const shop = useShopStore().shop;

    const ShopMain = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/Shop/ShopMain.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/Shop/ShopMain.vue`);
        }
      },
    });
    const ShopTemplate = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_0${props.template}/Shop/Shop.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/template_01/Shop/Shop.vue`);
        }
      },
    });


    const CheckProducts = (category: string, productsList: any[]) => {
      return productsList
            .filter((el) => category === el.category && el.type === 'custom')
            .slice(0, 4);
    };
    return {
      shop,
      CheckProducts,
      ShopTemplate,
      ShopMain,
      banner, // Ensure banner is returned if used in template
    };
  },
});