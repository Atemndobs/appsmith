export default {

	async isCurrentPage: (page) => {
		if(appsmith.store.page ===) return true;
		return false;
	},
	
	async setCurrentPage: (page) => {
		storeValue('page', page)
		navigateTo(page)
	}
}