
 import  FooterComponent from './FooterComponent'

class BComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
		}
	}
	
	
	render(){
		return (
			<div>
				这是B页面
				<FooterComponent path={this.props.route.path}/>
			</div>
		)
	}

}

export default BComponent