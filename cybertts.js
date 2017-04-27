var request = require('request');
var Sound = require('node-aplay');
var fs = require('fs');
var exec = require('child_process').exec;
const crypto = require('crypto');

const myData = '你會做什麼';

var hash = crypto.createHash('md5').update(myData).digest('hex');
console.log('hash:'+hash);
								
var formData = {
  // Pass a simple key-value pair
  outfmt: 'wav',
  // Pass data via Buffers
  text: myData,
  // Pass data via Streams
  speaker: 'YiChuen'  ,//DaiYu,YouKan, YiChuen,
  language: 'zh-TW'
  
};

request.post({url:'http://vois3.cyberon.com.tw/cloud_tts/gen_tts_file.php', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Get Wave file path!  Server responded with:', body);
  var wave_path =JSON.parse(body).note;
  var songName = wave_path.split("/").pop();
	if(fs.existsSync(songName))
	{
		console.log('file exist');
		var processing_music=new Sound(songName);
		processing_music.play();
	}
	else{
		  
  
		var wget= exec('wget '+wave_path, function(err,stdout, strerr){
				 console.log(stdout);
				 console.log(err);
					if(!err){
								console.log('start to play and block mic');
								
								var processing_music=new Sound(songName);
								processing_music.play();
								//play_and_block_mic(wav_file,callback);
							}
				});
		
		
	}
  
  
  
});									
									