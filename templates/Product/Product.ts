import { useRoute } from 'vue-router';
import { defineComponent, defineAsyncComponent } from "vue";
import { useProduct } from '../../stores/product';

export default defineComponent({
  name: 'ProductScript',
  setup() {
    const route = useRoute();
    const data = useProduct().data || null;

    const ProdcutComponent = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import(`@/components/template_0${data.template}/Product/${data.type}Product.vue`);
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import(`@/components/template_01/Product/${data.type}Product.vue`);
        }
      },
    });



    return {
      data,
      ProdcutComponent
    };
  },
});