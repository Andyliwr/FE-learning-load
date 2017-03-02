// 定义一个矩形采样范围
function surfaceRect(a, b){
	//使用a，b作为采样范围的参数
	return {
		x: a*50,
		y: b*50
	}
}

function surfaceCicle(a, b){
	var x = a*100;
	var y = b*100;
	var radius = 50;
	var x0 = 50;
	var y0 = 50;
	if((x-x0)^2+(y-y0)*() < radius*radius){
		return {x: x, y: y};
	}else{
		return null;
	}
}

//绘制形状
window.onload = function(){
	//appendChild函数会返回被添加的节点
	var roseCanvas = document.body.appendChild(document.createElement('canvas'));
	var context = roseCanvas.getContext('2d');
	var position;
	for(var a=0; a<1; a += 0.1){
		for(var b=0; b<1; b += 0.1){
			position = surfaceCicle(a, b);
			if(position){
				context.fillRect(position.x, position.y, 1, 1);
			}
			// position = surfaceRect(a, b);
			// context.fillRect(position.x, position.y, 1, 1);//context.fillRect(x,y,width,height);
		}
	}
}