import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/Cart";

export default defineComponent({
    name: "SimpleAddtoCart",
    setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const productQty = ref(1)

    const addToCart = async (product, qty) => {
      router.push({ name: "Cart" });
      cartStore.addToCart(product, qty);
    };


    const checkInCart = ref(0)

    const isProductInCart = (productId: string) => {
        // Iterate over the cart object and check if the product ID exists
        if (cartStore.cart.items) {
            var isincart = Object.values(cartStore.cart.items).filter((v) => v.slug == productId)
            if (isincart.length > 0) {
                productQty.value = isincart[0].qty
                checkInCart.value = 1
            } else {
                productQty.value = 0 
                checkInCart.value = 0
                
            }
        }
    }

    const incrementQuantity = () => {
        productQty.value++;
    };
    
    const decrementQuantity = () => {
      if (productQty.value > 1) {
        productQty.value--;
      }
    };
    return {
      addToCart,
      isProductInCart,
      productQty,
checkInCart,
      incrementQuantity,
      decrementQuantity
    };
  }
});
