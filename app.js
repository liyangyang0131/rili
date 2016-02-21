var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));
 
var show = {
	1448496000000:['1.jpg','2.jpg','3.jpg'],
	1448409600000:['4.jpg','5.jpg','6.jpg'],
	1448323200000:['7.jpg','8.jpg','9.jpg'],
	1448236800000:['10.jpg','11.jpg','12.jpg'],
	1448150400000:['13.jpg','14.jpg','15.jpg'],
	1448553600000:['13.jpg','14.jpg','15.jpg']
};

var shenqi = {};
var fs = require('fs');
fs.readdir('./public/img',function(err,files){
	// console.log(files);  //输出所有img文件夹中的图片
	for(var i = 0;i<files.length;i++){
		fs.stat('./public/img/'+files[i],(function(i){
			return function(err,stats){
				console.log(stats.mtime);
				var key = stats.mtime.getFullYear()+'_'+stats.mtime.getMonth()+'_'+stats.mtime.getDate();
				// console.log(key);
				if( !shenqi[key] ){
					shenqi[key] = [];
				}
				shenqi[key].push(files[i]);
				// console.log(shenqi);
			}
		})(i));
	}
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/my',function(req,res){
	var riqi = req.query.time;
	console.log(riqi);
	if(shenqi[riqi]){
		res.json(shenqi[riqi]);
	}
	else{
		res.send('none');
	}
});
http.listen(80,function(){
	console.log('listening on *:80');
});
