var scores1 = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores1));
console.log("---");

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
console.log("---");




function average(arr) {
    
    var total = 0;
    
    // for (var i=0; i<arr.length; i++) {
    //     total += arr[i];
    // }
    
    arr.forEach(function(val){
       total += val; 
    });
    
    var avg = Math.round(total/arr.length);
    return avg;
}