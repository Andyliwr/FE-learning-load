function js_getDPI() {
	var arrDPI = new Array();
	if (window.screen.deviceXDPI != undefined) {
		arrDPI[0] = window.screen.deviceXDPI;
		arrDPI[1] = window.screen.deviceYDPI;
	}
	else {
		var tmpNode = document.createElement("DIV");
		tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
		document.body.appendChild(tmpNode);
		arrDPI[0] = parseInt(tmpNode.offsetWidth);
		arrDPI[1] = parseInt(tmpNode.offsetHeight);
		tmpNode.parentNode.removeChild(tmpNode);
	}
	return arrDPI;
}
alert("屏幕的DPI:"+js_getDPI());
alert("应该使用的图片的路径:"+returnUrl());
function returnUrl() {
	var urlSelect = "";
	var DPI = js_getDPI()[0];
	if(DPI <= 240){
		urlSelect = "img\icon_common\android\drawable-hdpi";
		return urlSelect;
	}else if(DPI <= 320){
		if((DPI-240)<=(320-DPI)){
			urlSelect = "img\icon_common\android\drawable-hdpi";
			return urlSelect;
		}else{
			urlSelect = "img\icon_common\android\drawable-xhdpi";
			return urlSelect;
		}
	}else if(DPI<=480){
		if((DPI-320)<=(480-DPI)){
			urlSelect = "img\icon_common\android\drawable-xhdpi";
			return urlSelect;
		}else{
			urlSelect = "img\icon_common\android\drawable-xxhdpi";
			return urlSelect;
		}
	}else if(DPI<640){
		if((DPI-480)<=(640-DPI)){
			urlSelect = "img\icon_common\android\drawable-xxhdpi";
			return urlSelect;
		}else{
			urlSelect = "img\icon_common\android\drawable-xxxhdpi";
			return urlSelect;
		}
	}else if(DPI<320){
		if((DPI-240)<=(320-DPI)){
			urlSelect = "img\icon_common\android\drawable-xxhdpi";
			return urlSelect;
		}else{
			urlSelect = "img\icon_common\android\drawable-xxxhdpi";
			return urlSelect;
		}
	}
}

	var a = [];

	a.push(document.getElementsByClassName('location-ico'));
	a.push(document.getElementsByClassName('add'));
	a.push(document.getElementsByClassName('ftil time'));
	a.push(document.getElementsByClassName('ftil place'));
	a.push(document.getElementsByClassName('item'));
	a.push(document.getElementsByClassName('item ico2'));
	a.push(document.getElementsByClassName('item ico3'));
	a.push(document.getElementsByClassName('item ico4'));
    document.getElementById()

	for(var i=0; i<a.length; i++){
		var string = a[0].style.background;
		alert("第i个用到图标的地方，图标的URL是"+string);
	}
