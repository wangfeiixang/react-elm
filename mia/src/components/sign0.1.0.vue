<template>
  <div class="sign">
      <draggable v-model="myArray"  @start="drag=true" @end="drag=true">
           <div class='drag' v-for="element in myArray">{{element.id}}</div>
            <!-- <img class="small-pic" v-for="element in myArray" :src="element.src"  alt=""/> -->
      </draggable>
  <div id="box" >
        <div class="demo" v-bgcolor="{color:'red',opt:'55'}" v-drag="1000"></div>
      </div>        
  </div>
</template>

<script>
import Vue from 'vue'
import axios from  'axios';
import draggable from 'vuedraggable'
export default {
  name: 'sign',
  data () {
    return {
       myArray:[{'src':'/static/img/01.png','id':1},{'src':'/static/img/02.png','id':2}]
    }
  },
  mounted(){
  },
  components: {
      draggable,
   }  
}

    Vue.directive('bgcolor',function(val,e){

       // console.log(e.value.color)

        // val.style.background = "yellow"

      })


      Vue.directive('drag',function(val,el){

          val.style.zIndex=el.value||0

          var dx,dy;

          val.addEventListener('touchmove',function(e){
              //.changedTouches[0].clientX
              //.target.offsetWidth
              let left = e.changedTouches[0].clientX-e.target.offsetWidth/2;
              let top = e.changedTouches[0].clientY-e.target.offsetHeight/2;
              this.style.left = left+'px';
              this.style.top = top+'px';
          })              



      })

      /*var vm= new Vue({
          el:"#box",//定义实例启动的dom
          data:{//挂载数据
            word:'hello world',
            color:'green'
          }
      }) */     
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* .drag{
    width:100px;
    height:100px;
    background:red;
  } */
.demo{
      width: 100px;
      height: 100px;
      background: red;
    }  


</style>
