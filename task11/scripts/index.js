// 导航的动画
$(document).ready(function(){
	// zepto版的事件委托
	$('.nav').on('click', 'li', function(e){
		$('.nav > li.active').removeClass('active');
		$(this).addClass('active');
	});
});

