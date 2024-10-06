import { ref } from 'vue'
import { defineComponent } from 'vue';
import InnerBanner from '@/components/InnerBanner.vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import banner from '@/assets/images/banner.webp'
import Pagination from '@/components/Others/Pagination.vue';
import { useShopStore } from '../../stores/ShopStore';

export default defineComponent({
  name: 'ShopAllScript',
  components: {
    InnerBanner,
    Pagination,
    ProductCard,
  },
  setup() {
    const shop = useShopStore().AllShop;

    return {
      shop,
      banner, // Ensure banner is returned if used in template
    };
  },
});