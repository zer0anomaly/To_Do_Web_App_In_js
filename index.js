const todolist = [];
const completedlist = [];

let add = document.getElementById("add");
let input = document.getElementById("input");
let removebutton = document.getElementById("removebutton");
let secondinput = document.getElementById("inputsecond");

add.addEventListener("click", function(){
	document.getElementById("listitemsfordiv").innerHTML = '';
	if (input.value.trim() !== '') {
		todolist.unshift(input.value);
		input.value = '';
		mainfucntion();
		secondmainfunction();
	}
	mainfucntion();
	secondmainfunction();
});
removebutton.addEventListener("click", function(){
	document.getElementById("completeddiv").innerHTML = '';
	let indexvariable = completedlist.indexOf(secondinput.value);
	if (indexvariable !== -1){
		completedlist.splice(indexvariable, 1);
	}else {
		alert("Item not found, please try again.")
	}
	secondinput.value = '';
	mainfucntion();
	secondmainfunction();
});

function mainfucntion(){
	let ul = document.createElement("ul");
	for(let i = 0; i < todolist.length; i++){
	let li = document.createElement("li");
		li.textContent = todolist[i];
		let completedbutton = document.createElement('button')
		completedbutton.textContent = "Completed";
		completedbutton.classList.add("completed-button")

		completedbutton.addEventListener('click', function (){
			thirdmainfunction(i);
		})
		ul.appendChild(li);
		li.appendChild(completedbutton);
	}
	document.getElementById("listitemsfordiv").innerHTML = '';
	document.getElementById("listitemsfordiv").appendChild(ul);

}

function secondmainfunction(){
	let secondul = document.createElement("ul");
	for(let i = 0; i < completedlist.length; i++){
		let secondli = document.createElement("li");
		secondli.textContent = completedlist[i];
		secondul.appendChild(secondli);
	}
	document.getElementById("completeddiv").innerHTML = '';
	document.getElementById("completeddiv").appendChild(secondul);
}
function thirdmainfunction(index){
	completedlist.push(todolist[index]);
	todolist.splice(index, 1);
	mainfucntion();
	secondmainfunction();
}
