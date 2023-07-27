export default {
	myVar1: [],
	myVar2: {},
	myFun1 () {
		//	write code here
		//	this.myVar1 = [1,2,3]
	},
	async set_criteria (matchCriteria) {
		

  "bpmRange": {{appsmith.store.set_bpm_range}},
  "happy": {{appsmith.store.happy}},
  "sad": {{appsmith.store.sad}},
  "mood": {{appsmith.store.mood}},
  "energy": {{appsmith.store.energy}},
  "key": "E major",
  "scale": "major",
	"genre":{{appsmith.store.genre}},
  "danceability" : 90,
	"aggressiveness" : 50,
		// appsmith.store.related_songs
		appsmith.store.bpm.value = matchCriteria.bpm
		return set_match_criteria.run()
	}
}