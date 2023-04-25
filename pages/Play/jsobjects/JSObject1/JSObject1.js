export default {
	search_results_player: {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 3,
		'search_hits' : 0
	},
	
	selectd_song_play (currentSong = {}) {
		search_results_player.isVisible = true
		song_search_results.isVisible = false
		player_song.autoPlay
		this.get_related_songs(currentSong)
		return currentSong
	},
	async get_related_songs (currentSong = {}) {
		let related_url = currentSong.related_songs ?? "";
		console.log({ related_url });
		
		
	return fetch( related_url, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "Referer": "http://app.curator.atemkeng.eu/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
		});
	},
	
	search_song () {
		if(search.text === "") {
			return;
		}
		clear_search.isVisible = true
		song_search_api.run()
		song_search_results.isVisible = true
	},
	
	clear_search(){
		song_search_results.isVisible = false;
		search_results_player.isVisible = false;
		song_search_api.clear();
		clear_search.isVisible = false
		search.text = "";
		
		
	}
}