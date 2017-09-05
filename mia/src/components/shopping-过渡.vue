<template>
  <div class="shopping">
    <div class="btn-box">
      <mt-button type="default" @click="changeDiv(1)">tab1</mt-button>
      <mt-button type="default" @click="changeDiv(2)">tab2</mt-button>
      <mt-button type="default" @click="changeDiv(3)">tab3</mt-button>
    </div>
    <div class="tab-box">
        <mt-tab-container class="page-tabbar-tab-container tab-tan" v-model="active" swipeable >
          <mt-tab-container-item id="1">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
    <div class="transtion-box">
       <mt-button type="default" @click="isShow=!isShow" class="btn">改变</mt-button>
      <transition name="fade"  enter-active-class="animated bounceInRight"  leave-active-class="animated bounce">
        <p v-if="isShow">你好！</p>
      </transition>   
    </div>
            <div id="flip-list-demo" class="demo">
              <button v-on:click="shuffle">Shuffle</button>
              <transition-group name="flip-list" tag="ul">
                <li v-for="item in items" v-bind:key="item">
                  {{ item }}
                </li>
              </transition-group>
            </div>
  </div>
</template>

<script>
import axios from  'axios';
/*import Vue from  'vue';
import { TabContainer, TabContainerItem } from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);*/
export default {
  name: 'shopping',
  data () {
    return {
      active:null,
      isShow:true,
      items: [1,2,3,4,5,6,7,8,9]
    }
  },
  methods:{
      changeDiv(type){
        console.log(type)
        switch(type){
          case 1: this.active = "1";break;
          case 2: this.active = "2";break;
          case 3: this.active = "3";break;
        }
      },
      shuffle: function () {
        this.items = [11,22,33,44]
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tab-tan{
    transition:all 2s !important;
  }
  .transtion-box{
    margin-top: 3rem;
  }
  /* .fade-enter-active{
    transition: all .3s ease;
  }
  .fade-leave-active{
  
     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  
  }
  .fade-enter, .fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }  */
  .btn{
    margin-bottom: 20px;
  }
  .btn+p{
    margin-left: 20px;
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
