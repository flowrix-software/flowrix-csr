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
      () => data, // The route path or any reactive route property
      async(newdata) => {
        const datababu =  computed(() => useProduct().data || null);
        ProductComponent.value = defineAsyncComponent({
          loader: async () => {
            try {
                
              // Attempt to dynamically import the specified template component
              return await import(`@/components/template_0${newdata.value.template}/Product/${newdata.value.type}Product.vue`);
            } catch (error) {
              // If the specified template fails to load, fall back to SimpleProduct1.vue
              console.log(datababu.value);
              if(datababu.value.type=='custom'){
                return import(`@/components/template_01/Product/customProduct.vue`);
              }
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