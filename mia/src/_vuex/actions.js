

const actions = {

	addShopping({commit},opt){
		//console.log('actions',opt)
		commit('addShopping',opt)
	},
	addCar({commit},id){
		commit('addCar',id)
	},
	reduceCar({commit},id){
		commit('reduceCar',id)
	},
	deleteShopping({commit}){
		commit('deleteShopping')
	},
	totalAll({commit}){
		commit('totalAll')
	}




}


export default actions