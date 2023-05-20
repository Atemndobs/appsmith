export default {
	myVar1: [],
	myVar2: {},
		getMatchCriterion () {
		//	write code here
		//	this.myVar1 = [1,2,3]
	},
	async setMatchCriterion () {
		settings_container.isVisible = true;
		appsmith.store.bpm = !show_bpm_range.isSwitchedOn? bpm.value : 0 ; 
		appsmith.store.bpm_range_start = show_bpm_range.isSwitchedOn? bpm_range.start : "0";
		appsmith.store.bpm_range_end = show_bpm_range.isSwitchedOn? bpm_range.end : "200";
		appsmith.store.set_bpm_range = show_bpm_range.isSwitchedOn? appsmith.store.bpm_range_start + '-' + appsmith.store.bpm_range_end : "0-200"
		appsmith.store.mood = mood.isSwitchedOn ?  appsmith.store.mood = 'happy' :  appsmith.store.mood = 'sad';
		appsmith.store.happy = mood.isSwitchedOn ? happy.value : 0;
		appsmith.store.sad = mood.isSwitchedOn ? sad.value: 0;
		appsmith.store.genre = genre.selectedOptionValue
		appsmith.store.energy = energy.value
		set_match_criteria.run()
	}

}