<template>
	<header>
       <router-link :to="isPath" class="iconfont icon-back">&#xe623;</router-link>
       <span class="top-center"><slot></slot></span>  
       <router-link to="/index" class="iconfont icon-index">&#xe602;</router-link>  
    </header>
</template>

<script>
	
	export default {
		props:["isPath"]
	}
	
</script>

<style scoped lang="scss">
	 header{
      height: 44px;
      background: #ff4e88;
      overflow: hidden;
      width: 100%;
      z-index: 999;
      text-align: center;
      color: #fff;
      font-size: 18px;
      line-height: 44px;
      a{
        display: inline-block;
        width: 46px;
         height: 44px;
         color: #fff;
         font-size:20px;
      }
        a:hover{
            text-decoration: none !important;
        }      
      a.icon-back{
        float: left;
      }
      a.icon-index{
        float: right;
      }
      input{
         color: #aaa;
         border:none;
         padding: 0.1rem .4rem;
         width:75%;
         border-radius:3px;
         outline: 0;
      }
    }
	    
</style>