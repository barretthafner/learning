//var data = [
//  18897109,
//  12828837,
//  9461105,
//  6371773,
//  5965343,
//  5946800,
//  5582170,
//  5564635,
//  5268860,
//  4552402,
//  4335391,
//  4296250,
//  4224851,
//  4192887,
//  3439809,
//  3279833,
//  3095313,
//  2812896,
//  2783243,
//  2710489,
//  2543482,
//  2356285,
//  2226009,
//  2149127,
//  2142508,
//  2134411
//];
//
//var sortedData = data.sort(function (a, b) {
//  return a - b;
//});
//
//console.log(sortedData);

var data2 = [
  1,2,3,5,6
];

var sumTotal = 11;


function generateSubsets(arr, targetSum){
  //sort array
  var sortedArr = sortAscending(arr);
  
  //find total
  var total = 0;
  for (var i=0; i < sortedArr.length; i++){
    total += sortedArr[i];
  }
  
  //check target sum is larger than smallest number in array and smaller than total sum of the array
  if (sortedArr[0] <= targetSum && total >= targetSum){
    var result = [];
    subsetSum(sortedArr, result, 0, targetSum);
    return result;
  } else {
    return ["Target sum too large or to be created from values in the array!"]                   
  }
}


function subsetSum(values, result, index, sum, targetSum){
  function recur {
      if (sum === targetSum) {
        result[index] = values[index];
      }
  }
  
  return recur(values){
    
  }

}


function sortAscending(arr){
  return arr.sort(function (a,b) {
    return a - b;
});
}







































function sumOfSubset(arr, total){

  
  function subsetSum(sum, index, remainder){
    //create selection array
    var select = [];
    
    //if sum so far plus current value is equal to total: select current select it.  Solution found!
    select[index] = 1;
    if (sum + arr[index] === total){
      console.log(getSet(arr, select));
      
    }
    // else if 
    else if(sum + arr[index] + arr[index + 1] <= total) {
      subsetSum(sum + arr[index], index + 1, remainder - arr[index])
    }
    select[index] = 0;
    
    
  }
  
}

function getSet(data, select) {
  var result = [];
  for (var i = 0; i < select.length; i++){
    if(select[i]){
      result.push(data[i]);
    }
  }
  return result;
}