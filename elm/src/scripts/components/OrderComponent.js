 import  FooterComponent from './FooterComponent'

class OrderComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
		}
	}
	
	
	render(){
		return (
			<div>
				我是订单页面
				<FooterComponent path={this.props.route.path}/>
			</div>
		)
	}

}

export default OrderComponent