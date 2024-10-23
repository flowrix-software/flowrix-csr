import { useRoute } from 'vue-router';
import {ref,watch, defineComponent, defineAsyncComponent,computed } from "vue";
import { useProduct } from '../../stores/product';

export default defineComponent({
  name: 'ProductScript',
  setup() {
    const route = useRoute();
    const data =  computed(() => useProduct().data || null);
    const ProductComponent = ref('')
    const scrollToPosition = (top) => {
        setTimeout(function(){
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });  
      },0);
      };      
        const componentContext = require.context('@/components/', true, /\.vue$/);
     watch(
      () => route.params.slug, // The route path or any reactive route property
      (newSlug, oldSlud) => {

          ProductComponent.value = defineAsyncComponent({
            loader: async () => {
              try {
                const template = data.value.template;
                const type = data.value.type;
                const componentPath = `@/components/template_${template.padStart(2, '0')}/Product/${type}Product.vue`;

                if (componentContext.keys().includes(componentPath)) {
                  return await componentContext(componentPath);
                } else {
                  throw new Error('Component not found');
                }
              } catch (error) {
                // Fallback component
                return await import('@/components/template_01/Product/customProduct.vue');
              }
            },
          });
        scrollToPosition(0);
      },{ immediate: true })

      
    return {
      data,
      ProductComponent
    };
  },
});