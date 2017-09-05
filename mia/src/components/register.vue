<template>
  <div class="register">
     <my-header :isPath="isPath">注册</my-header>
    <section class="wrapper">
        <div class="register-box">
          <div class="phone">
            <i :class="['iconfont',isUser?'red':'']">&#xe63a;</i>
            <input type="text" placeholder="请输入手机号" v-model="phone">
            <label  :class="['user-phone',isUser?'red':'black']" v-show="isUserShow" v-text="isUser?'手机号输入正确':'请重新输入手机号'"></label>
          </div>
          <div class="verification">
              <p>
                   <i class="iconfont" >{{isInco?"&#xe681;":"&#xe672;"}}</i>
                   <span class="finish" @click="isShow=!isShow" v-text="isClick"></span>
                   <span class="picture" v-show="isShow">
                       <span class="font">请将小拼图拖动到空缺位置上</span>
                       <img class="big-pic" src="/static/img/01.jpg"  alt=""/>
                       <img class="small-pic"  src="/static/img/01.png" v-drag="changeShow" alt=""/>
                       <span class="icon-box">
                          <i class="iconfont">&#xe601;</i>
                          <i class="iconfont">&#xe69f;</i>
                      </span>
                   </span>
              </p>
          </div> 
          <div class="yzm">
              <i class="iconfont">&#xe622;</i>
              <input type="text" placeholder="请输入短信验证码" >
              <button @click="changeStyle" v-text="word" ></button>
          </div> 
          <div class="password">
              <i :class="['iconfont',isPass?'red':'']">&#xe670;</i>
              <input type="text" placeholder="请输入密码 6-14位数字、英文字母" v-model="password" >
              <label  :class="['user-phone',isPass?'red':'black']" v-show="isPassShow" v-text="isPass?'密码输入正确':'请重新输入密码'"></label>
          </div>                             
        </div>
        <mt-button class="btn" type="danger" size="large" @click="_submit">注册</mt-button>
        <div class="agreen">
          <span>同意并接受</span>
          <router-link to="/sign" class="">蜜芽服务条款</router-link>
        </div>
    </section>
    <div class="po-box" v-show="isMessage" v-text="returnMessage"></div>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from  'axios'
import {MyUI} from '../my-ui'
Vue.use(MyUI)

 const Register = {
  name: 'register',
  data () {
    return {
      isPath:'/sign',
      isShow :false,
      isUser:false,
      isUserShow:false,
      isPass:false,
      isPassShow:false,
      phone:null,
      password:null,
      messageUser:false,
      messagePassword:false,
      reTurn:null,
      returnMessage:null,
      isMessage:null,
      isClick:'点击完成验证',
      isInco:false,
      word:'获取验证码',
      myArray:[{'src':'/static/img/01.png','id':1},{'src':'/static/img/02.png','id':2}]
    }
  },
  methods: {
    changeShow(){
      this.isShow=false;
      this.isClick='完成验证';
      this.isInco = true;
    },
    changeStyle(e){
     // console.log(e.target)
      let num = 60;
      let that = this;
      let timer = setInterval(function(){
          num --;
          if (num<0) {
            clearInterval(timer);
            that.word='获取验证码'
             e.target.style.color = '#ff4e88';
             e.target.style.borderColor = '#ff4e88';
               e.target.disabled=false;
          } else {
             that.word= num+'秒'
              e.target.style.color = '#b6b6b6';
              e.target.style.borderColor = '#b6b6b6';
              e.target.disabled=true;
          }

      },1000)
     
    },
    _submit(){
      if ( this.messageUser && this.messagePassword && this.isInco) {
       // console.log(this.phone,this.password)
        let that = this;
          axios.get('http://datainfo.duapp.com/shopdata/userinfo.php',{
              params:{
                status:'register',
                userID:this.phone,
                password:this.password
              }
          }).then((res)=>{
           // console.log(res.data)
            that.reTurn = res.data
           // console.log(that.reTurn)
          }).catch((res)=>{
            console.log('error')
          })
      } else {
        return false;
      }
    }
  },
  mounted(){
    
  },
  watch:{
    phone(_new,_old){
      //console.log(this.$router.push)
      this.isUserShow = true;
      let str = /^\d{11}$/g;
      if ( str.test(_new) ) {
        this.isUser = true;
        this.messageUser = true;
      } else {
        this.isUser = false;
         this.messageUser = false;
      }
    },
    password(_new,_old){
      //console.log(_new)
      this.isPassShow = true;
      let str = /^\d{6,14}$/g;
      if ( str.test(_new) ) {
        this.isPass = true;
         this.messagePassword = true;
      } else {
        this.isPass = false;
        this.messagePassword = false;
      }      

    },
    reTurn:{
      handler(_new,_old){
         //console.log(typeof(_new));
        if ( typeof(_new)=='number' ) {
          this.isMessage = true;
          //console.log(1111)
        } else {
          this.isMessage = false;
          //console.log(2222)
        }
         let that = this;
          switch (_new) {
            case 0:this.returnMessage="用户名重名"
              break;
            case 1:this.returnMessage="用户注册成功,3秒后跳转登录界面！"
              setTimeout(function(){
                   that.$router.push('/sign');
                   that.isMessage = false;
              },3000)
              break;        
            default:this.returnMessage="服务器炸了！！！";
              break;
          }  
      }
    }
  },
   components: {
   }
}
  
 Vue.directive('drag',function(el,val){
      el.addEventListener('touchmove',function(e){
          let left = e.changedTouches[0].pageX-e.target.offsetWidth;
          let top = e.changedTouches[0].pageY-e.target.offsetHeight/2-e.target.previousElementSibling.height;
          // console.log(left+":"+top)
          this.style.left = left+'px';
          this.style.top = top+'px';
          if ( left>175 && left<179 ) {
             if ( top>134 && top<137 ) {
               //console.log("移动到指定位置")
               val.value()
             }
          } 
      })              



  })  


export default Register

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .register{
      background: #f3f4f8;
      position: relative;
      i.red{
        color:#e91e63 !important;
      }
    }
    section.wrapper{
      max-width: 640px;
      margin: 0 auto;
      padding: 0 .5rem;
       // overflow: hidden;
       div.register-box{
        margin-top: 1rem;
        background: #fff;
        border: 1px solid #d7d7d7;
        padding: 0 .5rem;
        -webkit-border-radius: .2rem;
        border-radius: .2rem;
          div.phone,div.yzm,div.password{
            position: relative;
            border-bottom: 1px solid #d7d7d7;
             padding: .5rem 0  0.1rem 0;
             box-sizing: border-box;
            i.iconfont{
              display: inline-block;
              width: .7rem;
              height: .7rem;
              font-size:20px;
              color:#e6e6e6;
              line-height: .7rem;
              margin-left: .25rem;
              margin-right: .25rem;
              vertical-align: middle;
            }
            input{
                border: none;
                width: 50%;
                font-size: 16px;
                background: #fff;
            }
          }
          div.verification{
                width: 100%;
                margin: 0.35rem 0 0 0;
                border-bottom: 1px solid #d7d7d7;
                 p{
                   padding:0.1rem 0;
                   margin-bottom: 0.3rem;
                   border:1px solid #d7d7d7;
                   position: relative;

                    i{
                        font-size:24px;
                        color:blue;
                        display: inline-block;
                        margin-left: .25rem;
                        margin-right: .25rem; 
                        vertical-align: middle;                   
                     }  
                     span.finish{
                      font-size:16px;
                      display: inline-block;
                      vertical-align: middle;    
                     }
                     span.picture{
                        display: inline-block;
                        width:100%;
                        position: absolute;
                        left:0;
                        top:0.795rem;
                         z-index: 900;
                       background:#fff;                        
                        span.font{
                            display: inline-block;
                            height: 40px;
                            line-height: 40px;
                            display: block;
                            font-size: 13px;
                        }
                        img{
                          width:100%;
                        }
                        img.big-pic{
                          position: relative;
                        }
                        img.small-pic{
                            height: 65px;
                            width: 65px;
                            left: 16px;
                            top: 86px;
                            position: absolute;
                        }
                        span.icon-box{
                          display: block;
                          padding:10px 0;
                          i.iconfont{
                            margin:0;
                            font-size: 24px;
                             color: #b3b3b3
                          }
                        }

                     }

                 }
          }
          div.yzm{
              position: relative;
              padding:0.3rem 0;
              i{
                vertical-align: 0;
              }
              button{
                position: absolute;
                height: 1rem;
                border: 1px solid #ff4e88;
                -webkit-border-radius: .2rem;
                border-radius: .2rem;
                color: #ff4e88;
                right: 0;
                top: 50%;
                background: #fff;
                outline: 0;
                margin-top: -.5rem;
                padding: 0 .2rem
              }
          }
         div.password{
            padding:0.5rem 0 0.2rem 0;
          }          
       }
       .mint-button--danger{
           background: #ff4e88;
           margin-top: 1rem;
           height: 1.5rem;
            line-height: 1.5rem;
            border-radius: .2rem;
       }
       div.agreen{
           margin-top: 1rem;
           padding-bottom: 6.2rem;
           span{
            font-size: 16px;
            line-height: 1.5;
            color: #333;
           }
           a{
            color: #9b9b9d;
            font-size: 16px;
            display: inline;
            text-decoration: underline;
           }
       }
    }
    .user-phone{
      position: absolute;
      left: 1.25rem;
      top: 0.15rem;
      font-size: 14px;
    }
   .register-box label.red{
      color:#e91e63;
    }
    label.black{
      color:#b6b6b6;
    }    
    div.po-box{
      position: absolute;
       left: 20%;
      top: 40%;
      // background:red;
      width:8rem;
      height:2rem;
      color:gold;
      font-size:16px;
      line-height: 2rem;
    }


</style>
