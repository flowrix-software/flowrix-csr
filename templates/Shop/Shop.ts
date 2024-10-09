import { defineComponent,defineAsyncComponent } from 'vue';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: 'ShopScript',  
  props: {
    template: {
      type: String,
      required: false
    }
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
    
    const InnerBanner = defineAsyncComponent(() =>
      import('@/components/InnerBanner.vue')
    )

    const Pagination = defineAsyncComponent(() =>
      import('@/components/Others/Pagination.vue')
    )

    const ProductCard = defineAsyncComponent(() =>
      import('@/components/Product/ProductCard.vue')
    )

    const CheckProducts = (category: string, productsList: any[]) => {
      return productsList
            .filter((el) => category === el.category && el.type === 'custom')
            .slice(0, 4);
    };
    return {
      shop,
      CheckProducts,
      ShopTemplate,
      InnerBanner,
      Pagination,
      ProductCard,
      ShopMain,
    };
  },
});