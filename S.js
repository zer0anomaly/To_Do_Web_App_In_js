let list = [];

let newtask = document.getElementById('new-task')
let addtask = document.getElementById('add-task')
let tasklist= document.getElementById('task-list')

addtask.addEventListener('click', () => {
	let task = newtask.value.trim();

	if(tasl){
		list.unshift(task)
		newtask.value = ''
		functionone()
	}
})

function functionone(){
	tasklist.innerHTML = '';
	let li = document.createElement('li');
	li.textContent = list;
	tasklist.appendChild(li);
}