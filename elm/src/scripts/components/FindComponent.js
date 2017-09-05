 import  FooterComponent from './FooterComponent'
 import store from '../_flux/store'

class FindComponent extends React.Component { 
	/*render(){
		//console.log(this)
		return (
			<div>
				这是发现页面

				<FooterComponent path={this.props.route.path}/>
			</div>
		)
	}
*/

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
	//	dangerouslySetInnerHTML={{__html:this.pushData()}}
		return(
			<div className="shopping-list">
				<div className="card" >

					{this.pushData()}

				</div>
				<FooterComponent path={this.props.route.path}/>

			</div>

			)
	}

	//插入数据/**/

	pushData(){
		//console.log(1)
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

				console.log(data)

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

				arr.push( <div>
							<div className="img pull-left">
								<img src={'https://fuss10.elemecdn.com/'+img} alt=""/>
							</div>
							<div className="cont pull-right">
								<h3><span className=" pull-left">{data.name}</span><span className=" pull-right">票</span></h3>
								<p className="evaluate">
									<span className="star">
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
									</span>
									<span className="average">{data.rating}</span>
									<span className="indent">月售>{data.recent_order_num}单</span>				
								</p>
								<p className="order">
									<span className="distribution pull-left">
										<span className="orderGo">{data.piecewise_agent_fee.extra_fee}/</span>
										<span className="orderFree">{data.piecewise_agent_fee.description}/</span>
										<span className="orderPeople">{data.average_cost}</span>
									</span>
									<span className="time pull-right">
										<span className="journey">{distance}km</span><i>/</i>
										<span className="journeyTime">{data.order_lead_time}分钟</span>
									</span>
								</p>
								<p className="remission">
									<span className="user">
										<span className="user-left pull-left">
											<i className="green">{data.activities[0].icon_name}</i>
											<span>{data.activities[0].tips}</span>						
										</span>
										<span className="user-right pull-right">
											<span>{data.activities.length}个活动</span>
											<i className="iconfont">&#xe601;</i>					
										</span>				
									</span>
								</p>
							</div>

						  </div>		
							);


			});
		} 
		//console.log(html)
					
		//arr.push(html)


		return arr;

	}
	/**/

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

export default FindComponent


							/*<div className="cont pull-right">
								<h3><span className=" pull-left">{data.name}</span><span className=" pull-right">票</span></h3>
								<p className="evaluate">
									<span className="star">
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
										<i className="iconfont">&#xe606;</i>	
									</span>
									<span className="average">{data.rating}</span>
									<span className="indent">月售>{data.recent_order_num}单</span>				
								</p>
								<p className="order">
									<span className="distribution pull-left">
										<span className="orderGo">{data.piecewise_agent_fee.extra_fee}/</span>
										<span className="orderFree">{data.piecewise_agent_fee.description}/</span>
										<span className="orderPeople">'+data.average_cost+'</span>
									</span>
									<span className="time pull-right">
										<span className="journey">{distance}km</span><i>/</i>
										<span className="journeyTime">{data.order_lead_time}分钟</span>
									</span>
								</p>
								<p className="remission">
									<span className="user">
										<span className="user-left pull-left">
											<i className="green">{data.activities[0].icon_name}</i>
											<span>{data.activities[0].tips}</span>						
										</span>
										<span className="user-right pull-right">
											<span>{data.activities.length}个活动</span>
											<i className="iconfont">&#xe601;</i>					
										</span>				
									</span>
								</p>
							</div>*/
