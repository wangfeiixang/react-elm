<template>
  <div class="list" v-scroll>
      <my-header :isPath="isPath"><input type="text" placeholder="请输入关键字"></my-header>
      <div class="scroll-list">
        <ul>
          <li :class="[active=='人气'?'active':'']" @click="changeActive('人气')" >人气</li>
          <li :class="[active=='销量'?'active':'']" @click="changeActive('销量')" >销量</li>
          <li :class="[active=='新品'?'active':'']" @click="changeActive('新品')" >新品</li>
          <li :class="[active=='价格'?'active':'']" @click="changeActive('价格')" >价格
            <i class="iconfont" v-html="isPrice?'&#xe616;':'&#xe619;'"></i>
          </li>
        </ul>
        <p>
          <a >
            <span :class="[spanActive?'active':'']" @click="changeStyle">蜜芽自营 <i class="iconfont" v-html="spanActive?'&#xe616;':'&#xe619;'"></i><b></b></span> 
          </a>
        </p>
      </div>
      <div class="scroll" >
        <div class="scroll-shopping">
            <ul
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="notLoad"
              infinite-scroll-distance="10">
              <li v-for="data in data"  >
                  <a class="scroll-html">
                      <dl>
                        <dt><a :href="'#/detail/'+data.id"><img :src="data.m_search_pic" alt=""> </a></dt>
                        <dd>
                          <p class="title" v-html="data.brand_name+data.name"></p>
                          <span class="price">
                            <span class="new_price"><i>￥</i><b v-html="Math.floor(data.sale_price)"></b></span>
                            <span class="old_price"><i>￥</i><b v-html="Math.floor(data.market_price)"></b></span>
                            <!-- {{list}} -->
                          </span>
                          <span class="shoppCar">
                            <i class="iconfont" @click="addShopping(data)">&#xe64a;</i>
                          </span>
                        </dd>
                      </dl>                  
                  </a>
              </li>
                                              
            </ul>
        </div>
      </div>
     <my-inco :isShopping="isShopping" :isShoppingicon="isShoppingicon"></my-inco>
  </div>
</template>

<script>
import Vue from 'vue'

import axios from 'axios'

import {mapState,mapActions} from 'vuex'

const List = {
  name: 'list',
  data () {
    return {
      isPath:'classify',
      active:"人气",
      spanActive:false,
      scroll:'',
      pargeNum:40,
      notLoad:false,
      isPrice:null,
      isClick:false,
      isShopping:true,
      isShoppingicon:false,
      data:[]

    }
  },
  computed:{
    ...mapState({list:'list'}),
  },
  mounted(){
    
  },
  methods:{
    /*...mapActions({
      reduce:'reduceNumber'
    }),*/    
    changeActive(type){
      this.isClick = true;
      switch (type) {
        case '人气': this.active =type;
        break;
        case '销量': this.active =type;this.popularity();
        break;
        case '新品': this.active =type;this.sale();
        break;
        case '价格': this.active =type;this.isPrice = !this.isPrice;this.price();
        break;
      }
    },
    addShopping(data){//显示图标
      this.isShopping = true;
      this.isShoppingicon = true;
      let that = this;
      let num = 0;
      let timer=null;
      clearInterval(timer)
      timer = setInterval(()=>{
          num++;
          that.isShopping = false;
          //console.log(num)
          if (num>=2) {
            that.isShoppingicon = false;
            clearInterval(timer)            
          } 
      },1000)
      //获取id，数量，做出参数
      let opt = {
          id:data.id,
          src:data.m_search_pic,
          title:data.brand_name+data.name,
          sale:data.sale_price,
          isChecked:true,
          isAllchecked:true,
          count:1
      }   

      //添加购物车
      
      this.$store.dispatch('addShopping',opt)
     // console.log(this.list)
    },
    changeStyle(){
      this.spanActive = !this.spanActive;
    },
    menu(e){
      this.scroll = e.path[0].scrollTop;
      let oScroll = document.getElementsByClassName('scroll-list');
      if ( this.scroll>44 ) {
          oScroll[0].style.position = 'fixed';
          oScroll[0].style.top = 0;
      } else {
           oScroll[0].style.position ="static"
      }
    },
    loadMore(){
        //console.log("执行")
        let that = this;
       axios.get('https://m.mia.com/s/cat288_jh1_f0.html',{
          params:{
             per_page:this.pargeNum,
             per_data:1
          }
       })
        .then((res)=>{
         let data = res.data;
         //console.log(data)
            if(data.length==0){
              //console.log('没数据,不执行')
              this.notLoad=true;
            }         
            data.forEach((item,i)=>{
              that.data.push(item)
            })
            that.pargeNum += 40;

            if ( that.isClick ) {
               
               that.sale();
               that.popularity();
               that.price();
            } 
             //console.log("加载",that.pargeNum)
        })
        .catch((res)=>{
          console.log('错误')
        })
    },
    popularity(){
      //人气 main_parent_id
      this.sameFunction('main_parent_id');     
    },
    sale(){
      //销量.total_sale_amount
      this.sameFunction('total_sale_amount');
    },
    price(){
      //价格 sale_price
        let that = this;
        let _data = this.data;
        _data.sort((a,b)=>{
          if ( that.isPrice ) {
            return Math.floor(a.sale_price)-Math.floor(b.sale_price);
          } else {
            return Math.floor(b.sale_price)-Math.floor(a.sale_price);
          }
        })  
        this.data = _data
        // console.log(_data,'价格')  
        return  this.data;  
    },
    sameFunction(type){
       // console.log(type)
        let _data = this.data;
        _data.sort((a,b)=>{
          return a[type]-b[type]
        })  
       // console.log( _data)
        this.data = _data
        return  this.data;        
    }    
  },
  watch:{
    data:{
      deep:true,
      handler(newVal){
        //console.log(this.data,'正在监听')
      }
    }

  }
}

Vue.directive('scroll',function(el,val){
    el.addEventListener('scroll',List.methods.menu)
})

export default List

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .list{
      overflow-y: scroll;
      width:100%;
      position: relative;
    }
    .scroll-list {
        background:#fff;
        box-shadow: 0 0 5px #ccc;
        width:100%;
        overflow: hidden;
        z-index: 200;
        ul{
            display: flex;
            padding: 10px 0 0 0;
            border-bottom: 1px solid #e9e9e9;
            li{
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: center;
              height: 20px;
              font-size: 13px;
              color: #666;
              padding-bottom: 10px;
            }
            li.active{
              color: #ff4e88;
            }
        }
        p{
          color: #686868;
          padding-bottom: 0.3rem;
          a{
            display: inline-block;
          }
          span{
            margin: 0.2rem 0 0 0.4rem;
            border:1px solid #f5f5f5;
            padding:0.1rem 0.1rem 0.1rem 0.2rem;
            border-radius: .15rem;
            background: #f5f5f5;
            display: inline-block;
            border: none;
            font-size: 14px;
            position: relative;
            b{
              position: absolute;
            }
          }
          span.active{
            border:1px solid #ff4e88;
            color:#ff4e88;
            background: #fff;
          }
        }
    }
    .scroll{
      height:616px;
      margin-top: 10px;
      width:100%;
     
      .scroll-shopping{
         overflow: hidden;
         background:#f5f5f5;
      }
      a.scroll-html{
       
        dl{
          margin:0.2rem 0.25rem ;
           background:#fff;
          dt{
            
            img{
              width:100%;
            }
             margin-bottom: -0.3rem; 
          }
          dd{
            overflow: hidden;
            position: relative;
            p{
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              padding: 3px 10px 0;
              line-height: 1.4;
              font-size: 13px;
              color: #333;
              margin-bottom: 0.5rem;
            }
            span.price{
              padding: 0 10px 10px;
              display: inline-block;
              span.new_price{
                color: #fa4b9b;
                i{
                  font-style:normal;
                }
                b{
                  font-weight:normal;
                      font-size: 18px;

                }
              }
              span.old_price{
                    text-decoration: line-through;
                color: #999;
                i{
                  font-style:normal;
                }
                b{
                  font-weight:normal;

                }                
              }
            }
            span.shoppCar{
                width: 40px;
                height: 40px;
                border-radius: 100%;
                border: 1px solid #ffd9d9;
              padding-right: 10px;
              position: absolute;
              right:10px;
              bottom:5px;
              display: block;
              text-align: center;
              line-height: 42px;
              i.iconfont{
                color:#fa4b9b;
                margin-left: 8px;
              }
            }

          }
        }
      }
      
    }
    .scroll-shopping ul{
      overflow: hidden;
      width:100%;
      li{
        overflow: hidden;
         float: left;
        width:50%;
        display: inline-block;
        max-width: 296px;
        height:280px;
      }
    }

</style>
