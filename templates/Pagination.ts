import { ref ,computed} from 'vue'
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useCategories } from '../stores/Categories';
import { useShopStore } from '../stores/ShopStore';

export default defineComponent({
  name: 'ShopAllScript',
  props: {
    slug: {
      type: String,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    lastPage: {
      type: String,
      required: true
    },
    currentPage: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
      const ChangePage =(async(slug,page)=>{
        scrollToPosition();
        if(route.meta.paged_route=='ShopAll_paged' || route.name=='ShopAll_paged'){
          await useShopStore().getShop(page);
        }else{
          await useCategories().getCategories(slug,page);
        }
        scrollToPosition();
      });

      const scrollToPosition = () => {
        setTimeout(function(){
        window.scrollTo({
          top: 600,
          behavior: 'smooth'
        });
      },100);
      };
      const windoWidth = window.innerWidth

    return {
      route,
      ChangePage,
      windoWidth
    };
  },
});
