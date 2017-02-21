//remove all values less than 5 from the array
//given an array = input


//iterate through array and write everything greater or equal to five to a new array


var input = [1, 4, 6, 8, 2, 7, 13,  8, 3, 4, 78, 9, 3, 2, 0, -15, 2, -1244, 35, 4, 2, -1, 0, 0];



var output = [];

input.forEach(function (item) {
  if (item >= 5) {
    output.push(item);
  }
});

console.log("arr: " + input);
console.log("output: " + output);

// This has Θ(n) complexity.


console.log("--------------------------------------------------------------------------");
//--------------------------------------------------------------------------


//find the third largest value in a binary search tree


//find the largest
//trace back to the third

var BST = require("./BinarySearchTree");

var tree = new BST(50, "hotdog");

tree.insert(2, "peanut");
tree.insert(7, "robot");
tree.insert(22, "donut");
tree.insert(67, "lizard");
tree.insert(78, "australia");
tree.insert(33, "centerpoint");
tree.insert(54, "nebula");
tree.insert(1, "minstrel");


var third = (function (tree) {
  var largest = tree._findMax();

  if (!largest.parent || (!largest.parent.left && !largest.parent.parent)) {
    throw new Error('Tree Not Large Enough!');
  }
  if (largest.parent.left) {
    return largest.parent.left;
  } else {
    return largest.parent.parent;
  }
}(tree));

console.log("third largest node: " + third.key);




console.log("--------------------------------------------------------------------------");
//Reverse a linked list

var LL = require("./LinkedList");

var list1 = new LL();


list1.insert(0, "peanut");
list1.insert(0, "robot");
list1.insert(0, "donut");
list1.insert(0, "lizard");
list1.insert(0, "australia");
list1.insert(0, "centerpoint");
list1.insert(0, "nebula");
list1.insert(0, "minstrel");

console.log("\nList Length: " + list1.length);
console.log("Values in order: ");

var node = list1.head;
for (var i=0; i<list1.length; i++) {
  console.log("\t" + i + ": " + node.value);
  node = node.next;
}

var listReversed = (function (list) {
  var tempList = new LL();
  var node = list.head;
  for(var i=0; i<list.length; i++){
    tempList.insert(0, node.value);
    node = node.next;
  }
  return tempList;
}(list1));

console.log("\nList Length: " + listReversed.length);
console.log("Values in reverse: ");

node = listReversed.head;
for (var i=0; i<listReversed.length; i++) {
  console.log("\t" + i + ": " + node.value);
  node = node.next;
}

console.log("-------------------------------------------------------------------");
//Reverse a linked list - alternate solution
// from stack overflow: http://stackoverflow.com/questions/23278017/strategies-to-reverse-a-linked-list-in-javascript

(function reverseLinkedList(list){

  var head = list.head;

  (function reverse(node, previous) {
    if(node.next !== null){
      reverse(node.next, node);
    } else {
      list.head = node;
    }
    node.next = previous;
  }(head, null));

}(list1));

console.log("List Length: " + list1.length + "\n");
console.log("Values in reverse (recursive): ");

var node = list1.head;
for (var i=0; i<list1.length; i++) {
  console.log("\t" + i + ": " + node.value);
  node = node.next;
}



console.log("--------------------------------------------------------------------------");
//Find the third element from the end of a linked list


var list2 = new LL();

list2.insert(0, "peanut");
list2.insert(0, "robot");
list2.insert(0, "donut");
list2.insert(0, "lizard");
list2.insert(0, "australia");
list2.insert(0, "centerpoint");
list2.insert(0, "nebula");
list2.insert(0, "minstrel");
list2.insert(0, "hotdog");

console.log("List Length: " + list2.length + "\n");
console.log("Values in order: ");

node = list2.head;
for (var i=0; i<list2.length; i++) {
  console.log("\t" + i + ": " + node.value);
  node = node.next;
}

var thirdFromEnd = list2.get(list2.length - 3);

console.log("third from end: " + thirdFromEnd);














