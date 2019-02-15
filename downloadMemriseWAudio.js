// thanks to "raineorshine" on GitHub for creating the most important part of this code
// my own knowledge of javascript is limited and it's a lot easier to modify someone's code than make your own!
// Original source: https://gist.github.com/raineorshine/68fab3b4b96f54b808a858217b83fe94

// See the readme for usage instructions
//static includeAudio = 0;


//var CHINESE = 1000
//var ITALIAN = 1001

(() => {
	//Set whether Audio files should be downloaded. NOTE: It is highly recommended you temporarily setup auto-download, because hundreds of files are required to download.
	var includeAudio = 1;
	
	function messySleep(miliseconds) {
		// Creates a delay, while preventing other things happening at the same time
		var currentTime = new Date().getTime();
		while (currentTime + miliseconds >= new Date().getTime()) {
		}
	}
	
	function downloadAudio(filename) {
		if(filename==null){
			return -1;
		}
		fetch(`https://static.memrise.com/uploads/items/audios/${filename}`, { credentials: 'same-origin' })
		.then((resp) => resp.arrayBuffer())
		.then( data => {
			console.log(data);
			var blob = new Blob([data], {type: 'mp3'});
			var elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			console.log(elem.href);
			elem.download = `memrise_${filename}`;
			document.body.appendChild(elem);
			elem.click();
			
			//elem.click();
			
			//elem.click();
			//elem.click();
			//console.log("HELLO");
			document.body.removeChild(elem);
			window.document.delete(Element
			//window.URL.revokeObjectURL(url
			messySleep(300);
			return 1;
		})
	}
	
	function getWords(courseId, level) {		
		const url = `https://www.memrise.com/ajax/session/?course_id=${courseId}&level_index=${level}&session_slug=preview`
		console.log(url);
		return fetch(url, { credentials: 'same-origin' })
			// parse response
			.then(res => {
				return res.status === 200
					? res.json()
					// map results
					.then(data => {
						console.log(data.screen_template_map[data.learnables[0].learnable_id].presentation[0].audio.value[0])
						messySleep(100)
						return Object.keys(data.learnables).map(key => (
							  
						((includeAudio==1)?({
							original: data.learnables[key].item.value,
							translation: data.learnables[key].definition.value,
							//hanzi: data.screen_template_map[data.learnables[key].learnable_id].presentation[0].visible_info[(data.screen_template_map[data.learnables[key].learnable_id].presentation[0].visible_info[0].label=="Character")?0:1].value,							
							
							audio_reference: (data.screen_template_map[data.learnables[key].learnable_id].presentation[0].audio.value[0]==null)?null:data.screen_template_map[data.learnables[key].learnable_id].presentation[0].audio.value[0].normal.slice(48)

						}):({
							original: data.learnables[key].item.value,
							translation: data.learnables[key].definition.value
						}))))
						
					})
					.then(words => {
						return getWords(courseId, level + 1)
						.then(words.concat.bind(words))
					})
					: ((level<20)?getWords(courseId, level+1):[]) //If the level numbers exceed 20, this needs to be increased.
				  
			})
		.catch(err => {
			console.error(err)
			return []
		})
	}
  
	var fora;
	// fetch
	const start = 18;
	const courseId = location.href.slice(30).match(/\d+/)[0];

	getWords(courseId, start)
	// format as csv
	.then(words => {
		//console.log(word.audio_reference) //Check if the base url works in this case
		if (includeAudio==1){words.map(word => downloadAudio(word.audio_reference))};//Enable to download Audio
		console.log(words.length + ' words');
		//return words.map(word => word.translation + '\t' + word.original + '\t' + word.hanzi + '\t[memrise_' + word.audio_reference + ']\n').join('') //for 4 data things
		return ((includeAudio==1)?words.map(word => word.translation + '\t' + word.original + '\t[memrise_' + word.audio_reference + ']\n').join(''): //for 3 data things
		words.map(word => word.translation + '\t' + word.original + '\n').join('')) //for 3 data things
	})
	.then(console.log)
})()
