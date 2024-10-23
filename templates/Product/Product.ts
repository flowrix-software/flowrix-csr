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
     watch(
      () => route.params.slug, // The route path or any reactive route property
      (newSlug, oldSlud) => {
        ProductComponent.value = defineAsyncComponent({
        loader: async () => {
          try {
            const template = data.value.template;
            const type = data.value.type;

            return await import(
              /* webpackChunkName: "[request]" */
              `@/components/template_${template.padStart(2, '0')}/Product/${type}Product.vue`
            );
          } catch (error) {
            const template = data.value.template;
            const type = data.value.type;
            return import(`@/components/template_01/Product/${type}Product.vue`);
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