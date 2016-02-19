function isEven(num) {
	if (typeof num !== "number")	{return undefined;}
	else {return num % 2 === 0;}
}

function factorial(num) {
	if (typeof num !== "number" || num < 0)	{return undefined;}
	else {
		var output = 1;
		for(var i = 2; i <= num; i++)	{output *= i;}
		return output;
	}
}

function kebabToSnake(str){
	if (typeof str !== "string")	{return undefined;}
	else	{return str.replace(/-/g, "_");}
}
