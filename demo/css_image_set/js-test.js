window.onload = function(){
    var testDiv = document.getElementById("test");
    var allNotes = testDiv.getElementsByTagName('*');
	var imgObj = testDiv.getElementsByTagName('img');
    var imgLength = imgObj.length;
        /*alert("testDiv中有"+imgObj.length+"个img元素");*/
	for(var i=0; i<imgLength*imgObj.length; i++){

		var elementIndexNum = findElementPlace(testDiv, imgObj[0]);
        /*alert("第"+i+"次循环找到的img的位置是"+elementIndexNum);*/
		if(elementIndexNum >=0 ){
			var newDiv = document.createElement('div');
			testDiv.insertBefore(newDiv,allNotes[elementIndexNum+1]);
            addClass(newDiv, 'qqlogo');
            testDiv.removeChild(imgObj[0]);
            continue;
		}else{
			alert("The Elememt in testDiv is not found.");
		}
	}


    function findElementPlace(obj1, obj2){
        var allNotes = obj1.getElementsByTagName('*');
        var notFindNum = 0;
        for(var j=0; j<allNotes.length; j++){
            if(equals(obj2, allNotes[j])){
                return j;
            }else{
                if(j >= (allNotes.length-1)){
                    return -1;
                }else {
                    notFindNum ++;
                    if (notFindNum >= allNotes.length){
                        return -1;
                    }
                    continue;
                }
            }
        }
    }

    //判断两个对象是否相等
    function equals ( x, y ) {
        // If both x and y are null or undefined and exactly the same
        if ( x === y ) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
            return false;
        }

        // They must have the exact same prototype chain, the closest we can do is
        // test the constructor.
        if ( x.constructor !== y.constructor ) {
            return false;
        }

        for ( var p in x ) {
            // Inherited properties were tested using x.constructor === y.constructor
            if ( x.hasOwnProperty( p ) ) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined
                if ( ! y.hasOwnProperty( p ) ) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal
                if ( x[ p ] === y[ p ] ) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if ( typeof( x[ p ] ) !== "object" ) {
                    return false;
                }

                // Objects and Arrays must be tested recursively
                if ( ! Object.equals( x[ p ],  y[ p ] ) ) {
                    return false;
                }
            }
        }

        for ( p in y ) {
            // allows x[ p ] to be set to undefined
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
                return false;
            }
        }
        return true;
    };
//该代码片段来自于: http://www.sharejs.com/codes/javascript/1985
    //动态添加类名的方法
    function addClass(element,className){
        if(element.className == ""){
            element.className = className;
        }else{
            element.className += " "+className;
        }
    }
}


