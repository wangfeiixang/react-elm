
import store from '../_flux/store'

class MainconComponent extends React.Component {
	constructor(props,context){
		super(props,context)
		this.state={
			position:store.getPosition(),
			num:40,
			data:null
		}
	}

	getData(){
		//数据接口
		//https://mainsite-restapi.ele.me/shopping/restaurants?latitude=39.90282&longitude=116.31082&offset=40&limit=20&extras[]=activities&terminal=h5
		//http://localhost:9000/shopping/restaurants?latitude='+this.state.position.latitude+'&longitude='+this.state.position.longitude+'&offset='+this.state.num+'&limit=20&extras[]=activities&terminal=h5
		var that = this;
		$.ajax({
			url:'http://localhost:9000/shopping/restaurants?latitude='+this.state.position.latitude+'&longitude='+this.state.position.longitude+'&offset='+this.state.num+'&limit=20&extras[]=activities&terminal=h5',
			success:function(data){
				//console.log(data)
				that.setState({
					data:data
				})

			}
		})


	}


	render(){
		this.pushData();
	//	console.log(this.state)dangerouslySetInnerHTML={{__html:{this.pushData()}}}
		return(
			<div className="shopping-list">
				<div className="card" dangerouslySetInnerHTML={{__html:this.pushData()}}>

				</div>

			</div>

			)
	}

	//插入数据/**/

	pushData(){

		var arr = [];

		//console.log(this.state.data)
		
		var html="";
		var str = "";
		var distance = 0;
		var img = "";

		if (this.state.data) {

			this.state.data.forEach( function(data,i) {
				/*console.log(data.activities[0].icon_name)
				console.log(data.activities[0].tips)*/

				if (data.distance) {
					distance =Math.floor(data.distance*100/1000)/100
				} 

				if (data.image_path) {

					if ( data.image_path.indexOf("jpeg") > -1 ) {
						img = data.image_path+'.jpeg'
					}else{
						img = data.image_path+'.png'
					} 
				} 

				html += '<div class="img pull-left">'
								+'<img src="https://fuss10.elemecdn.com/'+img+'" alt=""/>'
							+'</div>'	
							+'<div class="cont pull-right">'
								+'<h3><span class=" pull-left">'+data.name+'</span><span class=" pull-right">票</span></h3>'
								+'<p class="evaluate">'
									+'<span class="star">'
										+'<i class="iconfont">&#xe606;</i>'	
										+'<i class="iconfont">&#xe606;</i>'	
										+'<i class="iconfont">&#xe606;</i>'	
										+'<i class="iconfont">&#xe606;</i>'	
										+'<i class="iconfont">&#xe606;</i>'	
									+'</span>'
									+'<span class="average">'+data.rating+'</span>'
									+'<span class="indent">月售>'+data.recent_order_num+'单</span>'				
								+'</p>'
								+'<p class="order">'
									+'<span class="distribution pull-left">'
										+'<span class="orderGo">'+data.piecewise_agent_fee.extra_fee+'/</span>'
										+'<span class="orderFree">'+data.piecewise_agent_fee.description+'/</span>'
										+'<span class="orderPeople">'+data.average_cost+'</span>'
									+'</span>'
									+'<span class="time pull-right">'
										+'<span class="journey">'+distance+'km</span><i>/</i>'
										+'<span class="journeyTime">'+data.order_lead_time+'分钟</span>'
									+'</span>'
								+'</p>'
								+'<p class="remission">'
									+'<span class="user">'
										+'<span class="user-left pull-left">'
											+'<i class="green">'+data.activities[0].icon_name+'</i>'
											+'<span>'+data.activities[0].tips+'</span>'						
										+'</span>'
										+'<span class="user-right pull-right">'
											+'<span>'+data.activities.length+'个活动</span>'
											+'<i class="iconfont">&#xe601;</i>'						
										+'</span>'					
									+'</span>'
								+'</p>'
							+'</div>';


			});
		} 
		//console.log(html)
					
		//arr.push(html)


		return html;

	}

	componentDidMount(){
		var that=this;
		  store.addPositionListner(function(){
		  	that.setState({
		  		position:store.getPosition()
		  	})

		  	that.getData();
		  })

	}

	componentDidUpdate(){
		if (this.state.data) {
			//this.mySwiper.update();
		}
	}	





} 

export default MainconComponent


					/*<div class="img pull-left">
						<img src="./lib/img/10.jpg" alt=""/>
					</div>	
					<div class="cont pull-right">
						<h3><span class=" pull-left">小贤家千层榴莲蛋糕</span><span classNameclassNameclassNameclass=" pull-right">票</span></h3>
						<p class="evaluate">
							<span class="star">
								<i class="iconfont">&#xe606;</i>	
								<i class="iconfont">&#xe606;</i>	
								<i class="iconfont">&#xe606;</i>	
								<i class="iconfont">&#xe606;</i>	
								<i class="iconfont">&#xe606;</i>	

							</span>
							<span class="average">4.5</span>
							<span class="indent">月售2389单</span>				
						</p>
						<p class="order">
							<span class="distribution pull-left">
								<span class="orderGo">¥0起送/</span>
								<span class="orderFree">免配送费/</span>
								<span class="orderPeople">¥23/人</span>
							</span>
							<span class="time pull-right">
								<span class="journey">20.40km</span><i>/</i>
								<span class="journeyTime">79分钟</span>
							</span>
						</p>
						<p class="remission">
							<span class="user">
								<span class="user-left pull-left">
									<i class="green">新</i>
									<span>新用户下单立减23.0元</span>						
								</span>
								<span class="user-right pull-right">
									<span>6个活动</span>
									<i class="iconfont">&#xe601;</i>						
								</span>					
								
							</span>
							<span class="reduce">
								<i>减</i>
								<span>满50减3，满100减5</span>					
							</span>
							<span class="reduce">
								<i>减</i>
								<span>满50减3，满100减5</span>					
							</span>	
							<span class="reduce">
								<i>减</i>
								<span>满50减3，满100减5</span>					
							</span>
							<span class="reduce">
								<i>减</i>
								<span>满50减3，满100减5</span>					
							</span>													
						</p>
					</div>*/

								/*<p class="remission">
									<span class="user">
										<span class="user-left pull-left">
											<i class="green">${data.activities[0].icon_name}</i>
											<span>${data.activities[0].tips}</span>						
										</span>
										<span class="user-right pull-right">
											<span>${data.activities.length}个活动</span>
											<i class="iconfont">&#xe601;</i>						
										</span>					
									</span>
									<span class="reduce">
										<i>${data.activities[1].icon_name}</i>
										<span>${data.activities[1].tips}</span>					
									</span>
									<span class="reduce">
										<i>${data.activities[2].icon_name}</i>
										<span>${data.activities[2].tips}</span>					
									</span>	
									<span class="reduce">
										<i>${data.activities[3].icon_name}</i>
										<span>${data.activities[3].tips}</span>					
									</span>
									<span class="reduce">
										<i>${data.activities[4].icon_name}</i>
										<span>${data.activities[4].tips}</span>					
									</span>
									<span class="reduce">
										<i>${data.activities[5].icon_name}</i>
										<span>${data.activities[5].tips}</span>					
									</span>																						
								</p>*/						