/*文字滚动插件
 *更改了下让插件支持rem，
 */
function scroll_text(option) {
	var area = document.getElementById(option.target);
	area.style.webkitUserSelect = "none";
	//rem
	// var rem = document.getElementsByTagName('html')[0].style.fontSize.replace(/px/, '');
	// var distance = parseInt(option.distance*rem) || 24; //单行滚动的高度
	var distance = option.distance|| 24; //单行滚动的高度

	var speed = option.speed || 50; //滚动的速度
	var time;
	var delay = option.delay;
	if(option.direction == 'top') {
		area.scrollTop = 0;
		area.innerHTML += area.innerHTML;
		//这里之前没有区分startScroll1和startScroll2，由于函数申明提前，所以在某些情况下会出现函数覆盖的问题
		function startScroll1() {
			time = setInterval(scrollUp, speed);
			area.scrollTop++;
		}

		function scrollUp() {
			if(area.scrollTop % distance == 0) {
				clearInterval(time);
				setTimeout(startScroll1, delay);
			} else {
				area.scrollTop++;
				if(area.scrollTop >= area.scrollHeight / 2) {
					area.scrollTop = 0;
				}
			}
		}
		setTimeout(startScroll1, delay)
	}
	if(option.direction == 'left') {
		area.scrollLeft = 0;
		var li_width = 0;
		$('#'+option.target + ' li').each(function(item,value){
			li_width += $(value).width();
		});
		if(li_width > $('#'+option.target).width()){
			setTimeout(startScroll2, delay);
			area.innerHTML += area.innerHTML;
		}
		function startScroll2() {
			time = setInterval(scrollLeft, speed);
			area.scrollLeft++;
		}

		function scrollLeft() {
			if(area.scrollLeft % distance == 0) {
				clearInterval(time);
				setTimeout(startScroll2, delay);
			} else {
				area.scrollLeft++;
				if(area.scrollLeft >= area.scrollWidth / 2) {
					area.scrollLeft = 0;
				}
			}
		}
	}
	$('#'+option.target).on('click',function(e){
		if($(e.target)[0].tagName.toUpperCase() == 'LI'){
			if($($(e.target)[0]).attr('data-url')){
				window.location.href = $($(e.target)[0]).attr('data-url');
			}
		}
	});
}

$(document).ready(function(){
	//初始化插件
	scroll_text({target:'text-lunbo-up', direction:'top', distance: 40, speed:40, delay:2000});
	scroll_text({target:'text-lunbo-left', direction:'left', distance: 100, speed:40, delay:2000});
});