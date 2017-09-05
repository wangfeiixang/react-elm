


import store from '../_flux/store'
import MainconComponent from './MainconComponent'

class ContentComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
			position:store.getPosition(),
			shopping:null
		}
		this.mySwiper =null;
	}

	getShopping(){
		//console.log(this.state.position.latitude)
		//https://mainsite-restapi.ele.me/shopping/v2/entries?latitude=40.11492489999999&longitude=116.2454136&templates[]=main_template
		var that=this
		$.ajax({
			url:'http://localhost:9000/shopping/v2/entries?latitude='+this.state.position.latitude+'&longitude='+this.state.position.longitude+'&templates[]=main_template',
			success:function(result){
				//console.log(result)
				that.setState({
					shopping:result
				})				
			}
		})

		//.description(描述).temperature(温度)
	}

	render(){
		let {position} = this.state

		//console.log(this.state)
		//latitude(纬度) longitude(经度)
		return (
			<div className="content" id="wrapper">
                <div className="content-block" id="scroller">
                	<div className="swiper-container nav-news">
				        <div className="swiper-wrapper">
				        	{this.pushNewSwiper()}
				        </div> 
				    </div>
				    <MainconComponent/>  
                </div>
		    </div>
		)
	}

	componentDidMount(){
	  
		  	//当从其它路由切换回来的时候，判断一下有没有定位信息，有的话直接获取数据
	 	// if(this.state.position.address){
	 	// 	console.log(123)
	 	// 	this.getWeather()
	  //   	this.getHotSearch()
	 	// }
		 this.mySwiper = new Swiper('.nav-news', {
	       slidesPerView: 4,
	       slidesPerColumn: 2,
	       spaceBetween: 20,
	       freeMode: true
	     }); 	

		  var that=this;
		  store.addPositionListner(function(){
		  	that.setState({
		  		position:store.getPosition()
		  	})

		  	that.getShopping();
		  	

		  })
	}

	componentDidUpdate(){
		if (this.state.shopping) {
			this.mySwiper.update();
		}
	}

	pushNewSwiper(){//描述.shopping["0"].entries["0"].name  图片.shopping["0"].entries["0"].image_hash
		var arr=[];
		if (this.state.shopping) {
			//console.log(this.state.shopping[0].entries)
			this.state.shopping[0].entries.forEach( (value, index)=> {
				 /*console.log( value.image_hash )
				console.log( value.name )*/
				arr.push( <div className="swiper-slide">
				            	<img src={value.image_hash?'https://fuss10.elemecdn.com/'+value.image_hash+'.jpeg':''} alt=""/>
				            	<span>{value.name}</span>
				           </div>);
			})
		} 
		return arr;
	}		

}

export default ContentComponent