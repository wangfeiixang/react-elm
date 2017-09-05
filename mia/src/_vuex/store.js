

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'

import { MessageBox } from 'mint-ui';

const state = {
	list:[],
	res:0,
	num:0

}

const mutations = {
	addShopping(state,opt){
		//console.log('mutations',opt)
		if ( state.list.length>0 ) {
			//console.log('数据已经存在')
			for (var i = 0; i < state.list.length; i++) {
				if ( state.list[i].id == opt.id ) {
						state.list[i].count++;
						return;
				} 
			}
		}
		state.list.push(opt);
	},
	addCar(state,id){
		for (var i = 0; i < state.list.length; i++) {
			if ( state.list[i].id==id ) {
				state.list[i].count++;
				break;
			}
		
		}
		//console.log('相加',id)
	},
	reduceCar(state,id){
		for (var i = 0; i < state.list.length; i++) {
			if ( state.list[i].id==id ) {
				state.list[i].count--;
				if ( state.list[i].count<1 ) {

			        MessageBox.confirm('确定执行此操作?').then(action => {
			        	state.list.splice(i,1)
					},action => {
						state.list[i].count=1
					})
				}
				break;
			} 
		}
		//console.log(state.list,'相减')
	},
	deleteShopping(state){
		//console.log('55555')
		// state.list = [];
		let arrShopping = [];
		for (let i = 0; i < state.list.length; i++) {
				//console.log( state.list[i].isChecked )
			if ( state.list[i].isChecked==false ) {
				arrShopping.push(state.list[i])
			}
		}
		
		state.list = arrShopping
	},
	totalAll(state){//计算总价
		state.res = 0;
		state.num = 0;
		for (var i = 0; i < state.list.length; i++) {
				//console.log( state.list[i].isChecked )
			if ( state.list[i].isChecked==true ) {
				state.res += state.list[i].count*Math.floor(state.list[i].sale)
				state.num += state.list[i].count
			}
		}
		//console.log(state.res,state.num,state.list)
	}	


}


const store = new  Vuex.Store({
	state,
	mutations,
	actions	
})

export default store