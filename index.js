let list = [];
let completedlist = [];

let newtask = document.getElementById('new-task')
let addtask = document.getElementById('add-task')
let tasklist= document.getElementById('task-list')
let numberoftasks = document.getElementById('task-count')
let completedbutton = document.getElementById('completedbutton')
let activebutton = document.getElementById('activebutton')
let completedtaskcount = document.getElementById('completedtask-count')
let clearcompletedbutton = document.getElementById('clear-completed')

addtask.addEventListener('click', () => {
	let task = newtask.value.trim();
	if (task){
		list.unshift(task)
		newtask.value = ''
		functionone()
		functiontwo()
		functionthree()
	}	
})

function functionone(){
	tasklist.innerHTML = '';
	for (let i = 0; i < list.length; i++){
		let li = document.createElement('li');
		let cpltbutton = document.createElement('button');
		cpltbutton.textContent = "Completed"
		li.textContent = list[i];
		li.appendChild(cpltbutton) 
		tasklist.appendChild(li);
		cpltbutton.addEventListener('click', () => {
			let element = list.splice(i, 1)[0];
			completedlist.unshift(element)
			newtask.value = ''
			functiontwo()
			functionone()
			functionthree()
		})
	}
}
function functiontwo () {
	numberoftasks.textContent = list.length + " Tasks Left"
}
function functionthree (){
	completedtaskcount.textContent = completedlist.length + " Tasks Completed"
}
finishedbutton.addEventListener('click', () => {
	tasklist.innerHTML = '';
	for (i = 0; i < completedlist.length; i++){
		let li = document.createElement('li');
		li.textContent = completedlist[i]
		tasklist.appendChild(li)
		functionthree()
	}
})

activebutton.addEventListener('click', () => {
	tasklist.innerHTML = '';
	for (let i = 0; i < list.length; i++){
		let li = document.createElement('li');
		let cpltbutton = document.createElement('button');
		cpltbutton.textContent = "Completed"
		li.textContent = list[i];
		li.appendChild(cpltbutton) 
		tasklist.appendChild(li);
		functionone()
	}
})
clearcompletedbutton.addEventListener('click', () => {
	completedlist.length = 0;
	functionthree()
	tasklist.innerHTML = '';
})