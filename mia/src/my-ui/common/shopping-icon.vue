<template>
      <div class="shopping-box" v-show="isShoppingicon">
          <div class="shopping-loading" v-show="isShopping">
            <mt-spinner :type="3" color="#fff"></mt-spinner>
            <p>loading</p>
         </div>
          <div class="shoppin-success" v-show="!isShopping">
            <i class="iconfont">&#xe612;</i>
            <p>已加入购物车</p>
          </div>
      </div>    

</template>

<script>
	
	export default {
    props:['isShopping','isShoppingicon']
	}
	
</script>

<style scoped lang="scss">
	 .shopping-box{
    z-index: 999;
    width:80px;
    height:80px;
    background:#736a6a;
    position: fixed;
    margin:auto;
    top: 0;
    left: 0; 
    bottom: 0;
    right: 0;
  }
  .shopping-loading,.shoppin-success{
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:#fff;
    p{
      padding-top: 10px;
    }
  }
  .shoppin-success{

    i.iconfont{
      font-size:20px;
      display: block;
    }
  }
	    
</style>