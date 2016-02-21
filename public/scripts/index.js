window.onload = function(){
	var date = document.getElementById('date'),
		top = document.getElementById('top'),
		bottom = document.getElementById('bottom'),
		items = document.getElementsByClassName('items'),
		change = document.getElementById('change');
	var pictureKuai = document.getElementsByClassName('picture');
	var dada = document.getElementById('dada'),
		close = document.getElementById('close');
		
	var date = new Date();

	var ajax = function(o){
		var req = new XMLHttpRequest();
		req.open('get',o.url);
		req.send();
		req.onreadystatechange = function(){
			if(this.readyState == this.DONE && this.status == 200){
				o.success(this.response);
			}
		}
	};

	var requirePicture = function(){
		// var picture = new Date();
		// picture.setDate(top.innerHTML);
		// picture.setHours(8);
		// picture.setSeconds(0);
		// picture.setMinutes(0);
		// picture.setMilliseconds(0);
		// ajax({
		// 	url:'http://localhost/my?time='+picture.getTime()+'&b=2',
		// 	success:function(a){
		// 		if(a != 'none'){
		// 			a = JSON.parse(a);
		// 			console.log(a); 
		// 			for(var i = 0;i<a.length;i++){
		// 				pictureKuai[i].style.background = 'url(images/'+a[i]+')';
		// 			}
		// 		}
		// 	}
		// });
		var allPicture = document.getElementById('all');
		var time2String = function(){
			return date.getFullYear()+'_'+date.getMonth()+'_'+date.getDate();
		}
		ajax({
			url:'http://localhost/my?time=' + time2String(),
			success:function(a){
				var el;
				allPicture.innerHTML = '';
				if( a!='none'){
					a = JSON.parse(a);
					// console.log(a);
					for(var i = 0;i<a.length;i++){
						el = document.createElement('img');
						el.setAttribute('class','fangda');
						el.style.width='80px';
						el.style.height='80px';
						el.style.overflow='hidden';
						el.style.margin='0 10px 10px 0';
						el.src = 'img/'+a[i];
						allPicture.appendChild(el);
					}
					var fangda = document.getElementsByClassName('fangda');
					dada.style.display = 'none';
					dada.style.background ='none';
					for(var i = 0;i<fangda.length;i++){
						fangda[i].index=i;
						fangda[i].onclick = function(){
							dada.style.display = 'block';
							close.style.display = 'block';
							var src = this.getAttribute('src');
							console.log(src);
							dada.style.background ='url('+src+')';
						};
						close.onclick = function(){
							dada.style.display = 'none';
						};
					}
				}
				else{
					dada.style.display = 'none';
					return null;
				}
			}
		});
	};

	var honglinePosition = function(){
		var date = new Date();
		var hours = date.getHours();
		var minite = date.getMinutes();

		var now = date.getTime();
		var h = date.setHours(0);
		var m = date.setMinutes(0);
		var lingchen = date.getTime();
		var nowsAll = now-lingchen;
		hong.style.top = nowsAll/(24*60*60*1000)*1005+'px';

		if(hours<12){
			specific.innerHTML = '上午'+hours+':'+minite;
		}
		if(hours==12){
			specific.innerHTML = '中午'+hours+':'+minite;
		}
		if(hours>12){
			specific.innerHTML = '下午'+(hours-12)+':'+minite;
		}
	}
	honglinePosition();
	var timer = setInterval(function(){
		honglinePosition();
	},1000);
	
	var meiyuetianshu = [31,28,31,30,31,30,31,31,30,31,30,31];
	var addClass = function(el,s){
		var tmp = el.getAttribute('class').split(' ');
		var dict = {};
		for(var i = 0;i<tmp.length;i++){
			dict[tmp[i]] = true;
		}
		if(!dict[s]){
			el.setAttribute('class',el.getAttribute('class')+' '+s)
		}
	}
	var removeClass = function(el,s){
		var tmp = el.getAttribute('class').split(' ');
		var dict = {};
		for(var i = 0;i<tmp.length;i++){
			dict[tmp[i]] = true;
		}
		delete dict[s];
		var ns ='';
		for(var name in dict){
			ns +=' '+ name;
		}
		el.setAttribute('class',ns)
	}

	var isrunnian = function(year){
		if(year%4 == 0 && year%100 != 0 || year%400 == 0){
			return true;
		}
		return false;
	}

	var previousDay = function(){
		var currentyear = date.getFullYear();
		var currentmonth = date.getMonth();
		var currentday = date.getDate();
		var targetyear,targetmonth,targetdate;
		targetyear  = currentyear;
		targetmonth = currentmonth;
		targetdate  = currentday-1;
		if(targetdate == 0){
			targetmonth = currentmonth - 1;
			targetyear = currentyear;
			if(targetmonth == -1){
				targetyear = currentyear - 1;
				targetmonth = 11;
			}
			if(targetmonth == 1 && isrunnian(targetyear)){
				meiyuetianshu[1] = 29;
			}
			targetdate = meiyuetianshu[targetmonth];
		}else{
			targetmonth = currentmonth;
			targetyear = currentyear;
		}
		date = new Date(targetyear,targetmonth,targetdate);
		// console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
	}

	var nextDay = function(){
		var currentyear = date.getFullYear();
		var currentmonth = date.getMonth();
		var currentday = date.getDate();
		var targetyear,targetmonth,targetdate;
		targetyear = currentyear;
		targetmonth = currentmonth;
		targetdate = currentday+1;
		if(targetmonth == 1 && isrunnian(targetyear)){
			meiyuetianshu[1] = 29;
		}
		if(targetdate > meiyuetianshu[currentmonth] ){
			targetmonth = currentmonth + 1;
			targetyear = currentyear;
			if(targetmonth == 12){
				targetmonth = 0;
				targetyear = currentyear + 1;
			}
			targetdate = 1;
		}else{
			targetmonth = currentmonth;
			targetyear = currentyear;
		}
		date = new Date(targetyear,targetmonth,targetdate);
		// console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
	}

	var cc = ['日','一','二','三','四','五','六'];
	var shangyige;

	var ondatechange = function(){
		top.innerHTML = date.getDate();
		var ss = date.getFullYear() +'年'+ (date.getMonth()+1) +'月'+ date.getDate() +'日'+' '+'星期'+ cc[date.getDay()];
		bottom.innerHTML = ss;
		title.innerHTML = ss.slice(0,-3);
		change.innerHTML = '星期'+cc[date.getDay()];

		var todayTime = new Date();
		// console.log(todayTime);
		if(shangyige){
			removeClass(shangyige,'dangyueRed');
			removeClass(shangyige,'onclick_bg');
		}
		var xx = date.getDate();
		// console.log(xx);
		var el = document.getElementById('day'+xx);

		if(date.getFullYear()==todayTime.getFullYear()&&date.getMonth()==todayTime.getMonth()&&date.getDate()==todayTime.getDate()){
			addClass(el,'dangyueRed');
			shangyige = el;
		}
		else{
			if(date.getFullYear()==todayTime.getFullYear()&&date.getMonth()==todayTime.getMonth()){
				var els = document.getElementById('day'+ todayTime.getDate());
				addClass(els,'wordColor');
			}
			if(date.getMonth()==todayTime.getMonth()&&date.getDate()!=todayTime.getDate()){
				addClass(el,'onclick_bg');
			    shangyige = el;
			}
			if(date.getMonth()!=todayTime.getMonth()){
				addClass(el,'onclick_bg');
			    shangyige = el;
			}
		}

		if(date.getDay() == 6 || date.getDay() == 0){
			time.style.background = 'rgb(253, 253, 253)';
			// kuang.style.background = 'rgb(252, 252, 252)';
		}else{
			time.style.background = '#fff';
			// kuang.style.background = '#fff';
		}
	  	requirePicture();


	}
	
   //画日历(画前一个月，画当月的，画后一个月)  2015-11-24
   var huarili = function(){
   		shangyige = '';

   		var i = 0;
		var temp = date.getDate();
		date.setDate(1);
		var xingqi = date.getDay();
		date.setDate(temp);

		//L为前一个月在本月的的个数
		// xingqi 0   L  6
		// 	      1      0
		//        2      1
		L = xingqi == 0?6:xingqi - 1;
		if(date.getMonth()-1 == -1){
			var shangyuetianshu = 31;
		}else{
			var shangyuetianshu = meiyuetianshu[date.getMonth()-1];
		}
		//画前一个月
		// i 0 xxx 26
		// i 1 xxx 27 
		for(;i<L;i++){
			items[i].innerHTML = shangyuetianshu - (L-i-1);
			addClass(items[i],'otherColor');
			items[i].removeAttribute('id');
			removeClass(items[i],'dangyueColor');

			items[i].setAttribute('pr',true);
			removeClass(items[i],'onclick_bg');

			removeClass(items[i],'dangyueRed');
			removeClass(items[i],'wordColor');

		}
		// 画当月的
		if(date.getMonth() == 1 && isrunnian(date.getFullYear()) ){
			meiyuetianshu[1] = 29;
		}
		for(;i<meiyuetianshu[date.getMonth()]+L;i++){
			items[i].setAttribute('id','day'+(i-L+1));
			items[i].innerHTML = i-L+1;
			addClass(items[i],'dangyueColor');
			removeClass(items[i],'otherColor');

			items[i].removeAttribute('pr');
			items[i].removeAttribute('nx');
			removeClass(items[i],'onclick_bg');

			removeClass(items[i],'dangyueRed');
			removeClass(items[i],'wordColor');

			// if()

		}
		meiyuetianshu[1] = 28;
		//画后一个月的
		// 36 1
		// 37 2
		// 38 3
		var D = i;
		// console.log(D);
		for(;i<42;i++){
			if( date.getMonth()==1 && date.getDay() == 1 && date.getDate() == 28 && i>27){
				// num.removeChild(items[i]);
				items[i].innerHTML = '';
			}
			if(42-D >= 7 && i > 34 ){
				// num.removeChild(items[i]);
				items[i].innerHTML = '';
			}
			else{
				items[i].innerHTML = i-D+1;
			}
			items[i].removeAttribute('id'); 	
			addClass(items[i],'otherColor');
			items[i].setAttribute('nx',true);
			removeClass(items[i],'onclick_bg');
			removeClass(items[i],'dangyueColor');

			removeClass(items[i],'dangyueRed');
			removeClass(items[i],'wordColor');
		}	
   }
   huarili();
   ondatechange();

   for(var i = 0;i<items.length;i++){
   		items[i].onclick = function(){
   			var a = date.getFullYear();
   			var b = date.getMonth();
   			var c = date.getDate();

   			if(this.hasAttribute('id')){
   				date.setDate(this.innerHTML);
   				ondatechange();
   			}else if(this.hasAttribute('pr')){
   				//根据a,b,c得到 逻辑正确的x,y,z
   				z = this.innerHTML;
   				y = b-1;
   				if(y == -1){
   					y = 11;
   					x = a - 1;
   				}else{
   					x = a;
   				}
   				date = new Date(x,y,z);
   				huarili();
   				ondatechange();
   			}else if(this.hasAttribute('nx')){
   				z = this.innerHTML;
   				y = b+1;
   				if(y == 12){
   					y = 0;
   					x = a+1;
   				}else{
   					x = a;
   				}
   				date = new Date(x,y,z);
   				huarili();
   				ondatechange();
   			}
   		};
   		items[i].onmousedown = function(e){
   			e.preventDefault();
   		};
   }

	pre.onclick = function(){
		previousDay();
		huarili();
		ondatechange();//这个函数专门用来根据日期更新页面显示	
	};
	pre.onmousedown = function(e){
		e.preventDefault();
	};
	next.onclick = function(){
		nextDay();
		huarili();
		ondatechange();
	};
	next.onmousedown = function(e){
		e.preventDefault();
	};

	var foward_date = document.getElementById('foward_date');
	foward_date.onclick = function(){
		location.reload();
	};
	foward_date.onmousedown = function(e){
		e.preventDefault();
	};
	




};