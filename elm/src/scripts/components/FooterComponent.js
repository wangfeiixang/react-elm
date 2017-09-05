

import {Link} from 'react-router';

class FooterComponent extends React.Component {
	constructor(props,context){
		super(props,context)
	}

	getActiveClass(type) {
		//console.log(type)
		var path = this.props.path;
		if (path==undefined || path=="*") {
			path ="main";
		}else{
			path = path;
					
		}
		if(path==type){
			return 'tab-item external flexbox active'
		}else{
			return "tab-item external flexbox"
		}

		/*var active=this.props.path==undefined?'main':this.props.path
		return active==type?'tab-item external flexbox active':"tab-item external flexbox"*/				
	}	
	render(){
		return (
				
			 <nav className="bar bar-tab">
	              <a className={this.getActiveClass("main")}  href="#/main">
	                  <span className="iconfont">&#xe608;</span>
	                  <span className="tab-label">外卖</span>
	              </a>
	              <a className={this.getActiveClass("find")}  href="#/find">
	              	  <span className="iconfont">&#xe607;</span>
	                  <span className="tab-label">发现</span>
	              </a>
	              <a className={this.getActiveClass("order")}  href="#/order">
	                  <span className="iconfont">&#xe67f;</span>
	                  <span className="tab-label">订单</span>
	              </a>
	          	  <a className={this.getActiveClass("mine")}  href="#/mine">
	                   <span className="iconfont">&#xe644;</span>
	                  <span className="tab-label">我的</span>
	              </a>                
	         </nav> 
		)
	}
	
}

export default FooterComponent