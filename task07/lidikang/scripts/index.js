/* created by lidikang(andyliwr@qq.com) on 2016/11/13 */
// when page is loaded
window.onload = function(){
	//add click events to (nav > ul > li)
	document.getElementById("nav-list").addEventListener("click",function(e) {
    	var evt=e||window.event;
    	var target=evt.target;
    	if(target&&target.nodeName=="LI"){
    		//remove li.active
    		var liActive = document.querySelector('#nav-list > li.active');
    		liActive.className = "";
        	target.className="active";
    	}
    },false);
}

// img lazy load