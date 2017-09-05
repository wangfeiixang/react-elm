<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
	#app{
	   height: 100%;
	}

 .mint-msgbox-wrapper button.mint-msgbox-confirm{
    color: #f34fa1 !important;
  }  
  
  @import './styles/_base.scss';
  @import './styles/_reset.scss';
  @import './styles/_common.scss';

</style>

