var mergeSort = function(array) {
    if (array.length <= 1) {
        return array;
    }

    var middle = Math.floor(array.length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

var merge = function(left, right, array) {
    var leftIndex = 0;
    var rightIndex = 0;
    var outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (var i=leftIndex; i<left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (var i=rightIndex; i<right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};