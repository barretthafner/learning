
var list = [];
var done = false;
var input = undefined;

while (!done){

	input = prompt("What would you like to do?");
	
	if (input === "list") {
		listTodos();
	} else if (input === "new") {
		newTodo();
	} else if (input === "delete"){
		deleteTodo();
	} else if (input === "quit") {
		console.log("Thank you, come again!");
		done = true;
	} else {
		console.log("Invalid Input!");
	}

}


function listTodos() {
			if (list.length < 1) {
			console.log("List Empty!");
		}

		else {
			console.log("**********");
			list.forEach(function(todo, i){
				console.log(i + ": " + todo);
			});
			console.log("**********");
		}
}

function newTodo() {
		var newTodo = prompt("Enter new todo:");
		list.push(newTodo);
}

function deleteTodo() {
		var index = prompt("Enter index of Todo to be deleted?");
		console.log("Deleted: " + list[index]);
		list.splice(index, 1);
}