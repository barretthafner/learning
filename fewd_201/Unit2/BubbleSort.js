var swap = function(array, i, j) {
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

var bubbleSort = function(array) {
    var swaps = 0;
    for (var i=0; i<array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};