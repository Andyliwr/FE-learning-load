// 定义一个矩形采样范围

function surfaceRect(a, b) {
	//使用a，b作为采样范围的参数
	return {
		x: a * 50,
		y: b * 50
	}
}

function surfaceCicle(a, b) {
	var x = a * 100;
	var y = b * 100;
	var radius = 50;
	var x0 = 50;
	var y0 = 50;
	if ((x - x0) * (x - x0) + (y - y0) * (y - y0) < radius * radius) {
		return {
			x: x,
			y: y
		};
	} else {
		return null;
	}
}

//另一种定义圆的方式

function surfaceCicle2(a, b) {
	var angle = a * Math.PI * 2;
	var radius = 50;
	var x0 = 50;
	var y0 = 50;
	return {
		x: Math.cos(angle) * radius * b + x0,
		y: Math.sin(angle) * radius * b + y0
	}
}

function surfaceHuaban(a, b) {
	var x = a * 100;
	var y = b * 100;
	var radius = 50;
	var x0 = 50;
	var y0 = 50;
	if ((x - x0) * (x - x0) + (y - y0) * (y - y0) < radius * radius) {
		//圆变形成花瓣
		return {
			x: x,
			y: y * (1 + b) / 2,
			r: 100 + Math.floor((1 - b) * 155),
			// 添加梯度
			g: 50,
			b: 50
		};
	} else {
		return null;
	}
}

function surfacePile(a, b) {
	var angle = a * Math.PI * 2,
		radius = 100,
		length = 400;

	return {
		x: Math.cos(angle) * radius,
		y: Math.sin(angle) * radius,
		z: b * length - length / 2,
		// 将管状物一半放在X/Y平面之下，一半放在平面之上。横截面圆心放在（0，0，0）位置 
		r: 0,
		g: Math.floor(b * 255),
		b: 0
	};
}

//绘制形状
window.onload = function() {
	//appendChild函数会返回被添加的节点
	var roseCanvas = document.body.appendChild(document.createElement('canvas'));
	var context = roseCanvas.getContext('2d');
	var point;
	// for(var a=0; a<1; a += 0.01){
	// 	for(var b=0; b<1; b += 0.01){
	// 		point = surfaceHuaban(a, b);
	// 		if(point){
	// 			context.fillStyle = "rgb(" + point.r + "," + point.g + "," + point.b + ")";
	// 			context.fillRect(point.x, point.y, 1, 1);
	// 		}
	// 		// point = surfaceRect(a, b);
	// 		// context.fillRect(point.x, point.y, 1, 1);//context.fillRect(x,y,width,height);
	// 	}
	// }

	//画管子
	var b = document.body;
	var c = roseCanvas;

	// document.body.clientWidth; 
	var zBuffer = [];
	var SIZE = 777;
	roseCanvas.width = roseCanvas.height = SIZE;
	var h = -350;

	function surfaceRose(a, b, c) {
		if (c > 60) {
			return {
				x: Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
				y: b * SIZE + 50,
				z: 625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
				r: a * 1 - b / 2,
				g: a
			};
		}

		var A = a * 2 - 1;
		var B = b * 2 - 1;

		if (A * A + B * B < 1) {
			if (c > 37) {
				var j = c & 1;
				var n = j ? 6 : 4;
				var o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
				var w = b * h;
				return {
					x: o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
					y: o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
					z: 1180 + Math.cos(B + A) * 99 - j * 300,
					r: .4 - a * .1 + Math.pow(1 - B * B, -h * 6) * .15 - a * b * .4 + Math.cos(a + b) / 5 + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B),
					g: o / 1e3 + .7 - o * w * 3e-6
				};
			}

			if (c > 32) {
				c = c * 1.16 - .15;
				var o = a * 45 - 20;
				var w = b * b * h;
				var z = o * Math.sin(c) + w * Math.cos(c) + 620;
				return {
					x: o * Math.cos(c) - w * Math.sin(c),
					y: 28 + Math.cos(B * .5) * 99 - b * b * b * 60 - z / 2 - h,
					z: z,
					r: (b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3) * b,
					g: b * .7
				};
			}

			var o = A * (2 - b) * (80 - c * 2);
			var w = 99 - Math.cos(A) * 120 - Math.cos(b) * (-h - c * 4.9) + Math.cos(Math.pow(1 - b, 7)) * 50 + c * 2;
			var z = o * Math.sin(c) + w * Math.cos(c) + 700;
			return {
				x: o * Math.cos(c) - w * Math.sin(c),
				y: B * 99 - Math.cos(Math.pow(b, 7)) * 50 - c / 3 - z / 1.35 + 450,
				z: z,
				r: (1 - b / 1.2) * .9 + a * .1,
				g: Math.pow((1 - b), 20) / 4 + .05
			};
		}
	}


	setInterval(function() {
		for (var i = 0; i < 10000; i++) {
			var part = i % 46;
			var c = part / .74;
			var point = surfaceRose(Math.random(), Math.random(), c);
			if (point) {
				var z = point.z;
				var x = parseInt(point.x * SIZE / z - h);
				var y = parseInt(point.y * SIZE / z - h);
				var zBufferIndex = y * SIZE + x;
				if ((typeof zBuffer[zBufferIndex] === "undefined") || (zBuffer[zBufferIndex] > z)) {
					zBuffer[zBufferIndex] = z;
					var r = -parseInt(point.r * h);
					var g = -parseInt(point.g * h);
					var b = -parseInt(point.r * point.r * -80);
					context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
					context.fillRect(x, y, 1, 1);
				}
			}
		}
	}, 0);
}