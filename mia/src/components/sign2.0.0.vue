<template>
  <div class="sign">
      <my-header :isPath="isPath">登录蜜芽</my-header>
      <section class="wrapper">
        <div class="register-box">
              <div class="phone">
                <i :class="['iconfont',user.isTrue?'red':'']">&#xe600;</i>
                <!-- <input type="text" placeholder="请输入手机号" v-model="user.isUser"> -->
               <div class="keyboard">
                <!-- 自定义输入框 -->
                <div class="input-box" @touchstart.stop="focus">
                  <div class="content">
                    <p class="input">
                      {{val}}
                    </p>
                    <p class="placeholder" v-show="val.length === 0">
                      {{placeholder}}
                    </p>
                    <!-- 光标 -->
                    <p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
                  </div>
                </div>
                <!-- 自定义键盘 -->
                <keyboard 
                  :show="keyboard"
                  @typing="typing"
                  @complete="blur"/>
              </div>                   
  <label :class="['user-phone',user.isTrue?'red':'black']" v-show="user.isUserShow"  v-text="user.isTrue?'手机号输入正确':'请重新输入手机号' "></label>
              </div>
              <div class="password">
                   <i :class="['iconfont',password.isTrue?'red':'']">&#xe670;</i>
                   <input type="text" placeholder="请输入密码 6-14位数字、英文字母" v-model="password.isPass" >
   <label :class="['user-phone',password.isTrue?'red':'black']"  v-show="password.isPassShow"  v-text="password.isTrue?'密码输入正确':'请重新输入密码' "></label>
               </div>                             
            <mt-button class="btn" type="danger" size="large" @click="sendMessage">登录</mt-button>
            <div class="agreen">
              <i class="iconfont">&#xe63a;</i>
              <router-link to="/register" >立即注册</router-link>
            </div>
        </div>
    </section>
    <div class="po-box" v-text="returnMessage" v-show="isShow"></div> 
    <div class="po-bottom">
      <p>其他登录方式</p>
      <p class="po-footer"><a class="first"></a><a class="second"></a></p>
      
    </div>   
  </div>
</template>

<script>
import Vue from 'vue'
import axios from  'axios'
import {MyUI} from '../my-ui'
Vue.use(MyUI)

import keyboard from './keyboard'

export default {
  name: 'sign',
   created () {
      document.addEventListener('touchstart', () => {
        this.blur();
      });
    },  
    props: {
      value: '',
      placeholder: {
        default: '请输入手机号'
      }
    },
  data () {
    return {
      isPath:'/index',
      user:{
        isUser:null,
        isTrue:false,
        isUserShow:false
      },
      password:{
        isPass:null,
        isTrue:false,
        isPassShow:false
      },
      reTurn:null,     
      returnMessage:null,
      isShow:false,
        cursor: false,
        keyboard: false,
        /*value 在组件中的值*/
        val: '', 
        aIllegal: ['00', '01' ,'02','03','04','05','06','07','08','09', '0..', '.'],
        cursorDuration: 600,
        bodyHeight: '',
        bodyOverflow: ''          
    }
  },
  methods: {
    sendMessage(){
      if ( this.user.isTrue && this.password.isTrue ) {
        // console.log("成功")
          let that = this;
          axios.get('http://datainfo.duapp.com/shopdata/userinfo.php',{
              params:{
                status:'login',
                userID:this.val,
                password:this.password.isPass
              }
          }).then((res)=>{
            console.log(res.data)
            that.reTurn = res.data
            // console.log(that.reTurn)
          }).catch((res)=>{
            console.log('error')
          })        
      } else {
        return;
      }
    },
focus () {
        /*显示键盘*/
        this.showKeyboard();        
        /*显示光标*/
        this.showCursor();
        /*闪烁光标*/
        this.blinkCursor();
      },
      blinkCursor () {
        clearInterval(this.intervalID);
        this.intervalID = setInterval(()=>{
          this.cursor = !this.cursor;
        }, this.cursorDuration);
      },
      unblinkCursor () {
        clearInterval(this.intervalID);
      },
      /*blur*/
      blur () {
        /*隐藏光标*/
        this.hideCursor();
        /*停止光标闪烁*/
        this.unblinkCursor();
        /*隐藏键盘*/
        this.hideKeyboard();
        /*通知父组件, 老子值出来了*/
        this.notify();
      },
      showKeyboard () {
        this.keyboard = true;
      },
      hideKeyboard () {
        this.keyboard = false;
      },
      showCursor () {
        this.cursor = true;
      },
      hideCursor () {
        this.cursor = false;
      },
      checkValue () {
        if (parseFloat(this.val) === 0) {
          this.val = '';
        }
      },
      notify () {
        this.$emit('input',this.val);
      },
      del () {
        /*删除值并不会触发值的校验, 所以需要手动再触发一次*/
        this.val = this.val.slice(0, -1);
        this.notify();
      },
      /*输入*/
      typing (value) {
        /*如果是点击删除*/
        if (value === '') {
          this.del();
        }
        /*保存旧的值*/
        let oldValue = this.val;
        /*获取新的值*/
        this.val = this.val + value;
        /*检验新值, 如果没有通过检测, 恢复值*/
        if (!this.passCheck(this.val)) {
          this.val = oldValue;
          return;
        }
        /*为了让外界同步输入, 需要发送事件*/
        this.notify();
      },
      passCheck (val) {
        /*验证规则*/
        let aRules = [
            this.con,
            this.illegalValue,
          ]
        return aRules.every((item) => {
          return item(val);
        });
      },
      con (val) {
        if (this.aIllegal.indexOf(val) > -1) {
          return false;
        }
        //console.log(this.val)
        //用户手机号验证
        this.user.isUserShow = true;
          let str = /^\d{11}$/g;
          if ( str.test(this.val) ) {
            this.user.isTrue = true;
            //console.log('正确')
          } else {
            this.user.isTrue = false;
             //console.log('error')
          }
        return true;
      },
      /*非法值*/
      illegalValue (val) {
        if (parseFloat(val) != val) {
          return false;
        } 
        //console.log('正确111')
        return true;      
      },
  },  
  mounted(){
  },
  watch:{
    'user.isTrue':{
     },
    password:{
      deep:true,
      handler:function(_new,_old){
          _new.isPassShow = true;
          let str = /^\d{6,14}$/g;
          if ( str.test(_new.isPass) ) {
            _new.isTrue = true;
          } else {
            _new.isTrue = false;
          }        
      }
    },
     reTurn:{
      handler(_new,_old){
        if (_new) {
          this.isShow=true;
        } else {
          this.isShow=false;
        }
         let that = this;
          switch (_new) {
            case 0:this.returnMessage="用户名重名！！！"
              break;
            case 2:this.returnMessage="用户名密码不符！！！"
              break;        
            default:this.returnMessage="登陆成功,3秒后跳转主页！！！";
              setTimeout(function(){
                   that.$router.push('/index');
                   that.isShow = false;
              },3000)              
              break;
          }  
           //console.log(this.returnMessage)
         
       }
    }           
   },
  components: {
      keyboard,
   }  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .sign{
      background: #f3f4f8;
      position: relative;
      i.red{
        color:#e91e63 !important;
      }
    }
    section.wrapper{
      max-width: 640px;
      margin: 0 auto;
       // overflow: hidden;
       div.register-box{
        margin-top: 0.5rem;
        padding: 0.5rem 0.5rem;
        
          div.phone,div.password{
            border-radius: .2rem;        
            position: relative;
             background: #fff;
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
                width: 80%;
                font-size: 16px;
                background: #fff;
            }
          }
         div.password{
            padding:0.5rem 0 0.2rem 0;
          }          
       }
       .mint-button--danger{
           background: #ff4e88;
           margin-top: .5rem;
           height: 1.5rem;
            line-height: 1.5rem;
            border-radius: .2rem;
       }
       div.agreen{
           margin-top: 0.5rem;
           // padding-bottom: 3.2rem;
           i{
            font-size: 16px;
            color: #333;
            vertical-align: 0;
           }
           a{
            color: #333;
            font-size: 16px;
            display: inline-block;
            text-decoration: none;
            vertical-align: 3px;
           }
       }
    }
    .user-phone{
      position: absolute;
      left: 1.25rem;
      top: 0.15rem;
      font-size: 14px;
    }
    label.red{
      color:#e91e63;
    }
    label.black{
      color:#b6b6b6;
    }    
    div.po-box{
      position: absolute;
      left: 27%;
      top: 44%;
      width:8rem;
      height:2rem;
      color:gold;
      font-size:16px;
      line-height: 2rem;
    }  
    div.po-bottom{
      font-size:16px;
      color:#333;
      margin-top: 1.5rem;
      p{
        text-align: center;
        padding-bottom: 0.3rem;
      }
      p.po-footer{
        padding:0.2rem 0 5.9rem 0;
      }
      a{
        display: inline-block;
        margin: 0 10px;
        width: 40px;
        height: 40px;
        background:url(/static/img/weixin.png) no-repeat center center;
        background-size: cover;
      }
      a.first{
            background-position: -80px 0;
      }
      a.second{
         background-position: -40px 0;
      }      
    }  
    
     .keyboard {
      display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    user-select: none;
    font-size: 16px;
  }
  .input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;
    .label {
      color: #333;
    }
    .content {
      display: flex;
      .input {
        font-size: 16px;
        color: #313131;
      }
      .cursor {
        background-color: #4788c5;
        width: 2px;
        margin-left: 2px;
      }
      .placeholder {
        color: #ccc;
      }
    }
  } 
  
</style>
