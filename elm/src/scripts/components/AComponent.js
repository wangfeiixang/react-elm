
 import  FooterComponent from './FooterComponent'

class AComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
		}
	}
	
	
	render(){
		return (
			<div>
				这是A页面
				<FooterComponent path={this.props.route.path}/>
			</div>
		)
	}

}

export default AComponent