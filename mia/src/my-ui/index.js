

import commonHeader from './common/common-header'
import shoppingInco from './common/shopping-icon'

//export {MyButton,MyLoading}

const MyHeader = {
	install:(Vue)=>{
		Vue.component('my-header',commonHeader)
	}
}

const Myinco = {
	install:(Vue)=>{
		Vue.component('my-inco',shoppingInco)
	}	
}


const MyUI = {
	install:(Vue)=>{
		Vue.component('my-header',commonHeader);
		Vue.component('my-inco',shoppingInco)
	}
}

export {MyHeader,Myinco,MyUI}

