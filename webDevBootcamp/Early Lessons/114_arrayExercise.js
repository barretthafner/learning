
//****  printReverse(array)  ****
function printReverse(arry) {
	//loop backwards throught the array and print everything
	for(i = arry.length - 1; i >= 0; i--){
		console.log(arry[i]);
	}


}

//****  isUniform(array)  ****
function isUniform(arry) {
	//find the first item
 	var check = arry[0];

	//compare to the following items
	for (var i = 1; i < arry.length; i++) {
		if( check !== arry[i]) {
			return false;
		}
	}
	return true;
}

//****  sumArray(array)  ****
function sumArray(arry) {
	//create sum variable
	var sum = arry[0];

	//loop through array
	for (var i = 1; i < arry.length; i++) {
		sum += arry[i];
	}

	//Return sum
	return sum;
}

//****  arrayMax(array)  ****
function arrayMax(arry) {
	//create max number var and set to first element of the array
	var max = arry[0];
	
	//compare to the rest of the array
	for (var i = 1; i < arry.length; i++) {
		if (arry[i] > max) {
			max = arry[i];
		}
	}
	//Return max
	return max;
}