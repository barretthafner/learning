var quickSort = function(array, start, end) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;
    if (start >= end) {
        return array;
    }
    var middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

var partition = function(array, start, end) {
    var pivot = array[end - 1];
    var j = start;
    for (var i=start; i<end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};