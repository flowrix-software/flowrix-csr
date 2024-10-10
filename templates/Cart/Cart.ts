import { defineComponent,defineAsyncComponent } from 'vue';
import { computed } from 'vue';
import { useCartStore } from '../../stores/Cart'
import { useAuthStore } from "../../stores/AuthStore";

export default defineComponent({
  name: 'ShopScript',  
  setup() {
    const fetchCart = useCartStore()

    const isObjectEmpty = computed(() => {
        if (fetchCart.cart.items !== undefined) {

            const itemNames = Object.values<CartItem>(fetchCart.cart.items).map((item) => item.name);
            const checkForMeasure = itemNames.includes('Check Measure')

            if (checkForMeasure && itemNames.length === 1) {
                return false // Only 'Check Measure' is present
            }

            return itemNames.length > 0
        } else {
            return false
        }
    });
    
    const CartDetail = defineAsyncComponent(() =>
      import('@/components/template_01/Cart/CartDetail.vue')
    )

    const CartTotalAndPromo = defineAsyncComponent(() =>
      import('@/components/template_01/Cart/CartTotalAndPromo.vue')
    )
    
    return {
      useCartStore,
      useAuthStore,
      isObjectEmpty,
      CartDetail,
      CartTotalAndPromo
    };
  },
});