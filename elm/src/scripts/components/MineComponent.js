
import  FooterComponent from './FooterComponent'
class MineComponent extends React.Component { 
	constructor(props,context){
		super(props,context)
		this.state={
		}
	}
	
	
	render(){
		return (
			<div>
				这是我的页面
				<FooterComponent path={this.props.route.path}/>
				{this.props.children}
			</div>
		)
	}

}

export default MineComponent