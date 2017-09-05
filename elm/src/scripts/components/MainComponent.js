
import store from '../_flux/store'

import FooterComponent from './FooterComponent'

import ContentComponent from './ContentComponent'

class MainComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
			position:store.getPosition(),
			hot_words:null,
			weather:null
		}
		this.mySwiper =null;
	}

	getHotSearch(){
		var that=this
		//热搜词
		//https://mainsite-restapi.ele.me/shopping/v3/hot_search_words?latitude=39.90469&longitude=116.407173
		$.ajax({
			url:'http://localhost:9000/shopping/v3/hot_search_words?latitude=39.90469&longitude=116.407173',
			success:function(result){
				/*console.log(result)
				console.log("ok")*/
				that.setState({
					hot_words:result
				})
			},
			error:function(err){
				console.log("请求失败");
			}
		})
	}	
	
	getWeather(){
		//console.log(this.state.position.latitude)
		//天气地址
		var that=this
		$.ajax({
			url:'http://localhost:9000/bgs/weather/current?latitude='+this.state.position.latitude+'&longitude='+this.state.position.longitude,
			success:function(result){
				//console.log(result)
				that.setState({
					weather:result
				})				
			}
		})

		//.description(描述).temperature(温度)
	}

	render(){
		let {position,hot_words,weather} = this.state
		//latitude(纬度) longitude(经度)
		let img = weather?'https://fuss10.elemecdn.com/'+weather.image_hash+'.png':''
		return (
	    <div>
			<header className="bar bar-nav ">
				<div className="top-box">
					<a >
						<span className="iconfont">&#xe65b;</span>
						 <span className="tab">{
						 	position.address?position.address:"正在定位中..."
						 }</span>
						 <i className="iconfont">&#xe601;</i>
					</a>
					<a className="wet">
						<span className="weather">
							<i>{
								weather?Math.floor(weather.temperature)+'°':''
							}
							</i>
							<b>
								{
								weather?weather.description:''
								}
							</b>
						</span>
						<img src={img} alt=""/>
					</a>
				</div>
				<div className="top-center">
					<input type="text" className="button" placeholder="搜索商家、店铺"/>

					<div className="swiper-container hot-search">
						<div className="swiper-wrapper">
							{this.pushMainSwiper()}
						</div>
					</div>
				</div>
		   </header>
		   <ContentComponent/>
		   
		   <FooterComponent path={this.props.route.path}/>
		</div>			
		)
	}

	componentDidMount(){
		  
		  	//当从其它路由切换回来的时候，判断一下有没有定位信息，有的话直接获取数据
	 	if(this.state.position.address){
	 		// console.log(123)
	 		this.getWeather()
	    	this.getHotSearch()
	 	}
		 this.mySwiper = new Swiper('.hot-search', {
	        freeMode : true,
			slidesPerView : 'auto',
	        spaceBetween: 30
	     }); 	

		  var that=this;
		  store.addPositionListner(function(){
		  	that.setState({
		  		position:store.getPosition()
		  	})
		  	that.getWeather();
		  	that.getHotSearch();

		  })
	}

	componentDidUpdate(){
		if (this.state.hot_words) {
			/*console.log('swiper更新')
			console.log(this.state.hot_words)*/
			this.mySwiper.update();
		}
	}

	pushMainSwiper(){	//<div className="swiper-slide"></div>.word
		var arr=[];
		if (this.state.hot_words) {
			this.state.hot_words.forEach( (value, index)=> {
				//console.log(value.word)
				arr.push(<div className="swiper-slide">{value.word}</div>);
			})
		} 
		return arr;
	}		

}

export default MainComponent