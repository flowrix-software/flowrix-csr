import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/Cart";

export default defineComponent({
  name: "SimpleAddtoCart",
  props: {
    product: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const router = useRouter();

    const addToCart = async (product, qty) => {
      router.push({ name: "Cart" });
      useCartStore().addToCart(product, qty);
    };

    const quantity = ref(1);

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    return {
      props,
      addToCart,
      incrementQuantity,
      decrementQuantity
    };
  }
});
