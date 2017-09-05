<template>
  <div class="detail">
      detail
  </div>
</template>

<script>
import axios from  'axios';
export default {
  name: 'detail',
  data () {
    return {
    }
  },
  mounted(){
   /*axios.get('https://m.mia.com/instant/seckill/seckillPromotionItem/43328')
    .then((res)=>{
      console.log(res.data)
    })
    .catch((res)=>{
      console.log('错误')
    })*/
    console.log(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
