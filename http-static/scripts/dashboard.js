getBoard();
getAllTasks();
var board = null;
var currentTask = {
    _id: null,
    createdBy: null,
    taskName: null,
    taskType: null,
    taskStatus: null,
}



function getBoard() {
    let boardId = window.location.href.split('#')[1];
    let jwt = localStorage.getItem('jwt');

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getBoard`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.setRequestHeader('board', boardId);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    board = data;
                    if(user._id === data.owner._id) {
                        board.deletable = true;
                    }
                    loadBoard();
                })
            }
        }
    }
};

function saveTask() {
    let jwt = localStorage.getItem('jwt');
    let task = {
        _id: currentTask._id || null,
        createdBy: currentTask.createdBy,
        taskTitle: document.getElementById('form.name').value,
        taskStatus: document.getElementById('form.status').value,
        taskDescription: document.getElementById('form.description').value
    };

    let xhttp = new XMLHttpRequest();
    if (!task._id) {
        xhttp.open('POST', `${apiUrl}/createTask`, true);
    } else {
        xhttp.open('PUT', `${apiUrl}/updateTask`, true);
    };

    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.setRequestHeader('board', board._id);
    xhttp.send(JSON.stringify(task));

    if (task._id) {
        console.log(task._id)
        let node = document.getElementById(`${task._id}`);
        node.parentNode.removeChild(node);
    }

        xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    renderTasks([data])
                    // clearTaskForm();
                    toggleTaskModal();
                })
            }
        }
    }
};

function getAllTasks() {
    let jwt = localStorage.getItem('jwt');
    let boardId = window.location.href.split('#')[1];

    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getTasksByBoardId`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.setRequestHeader('board', boardId);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    renderTasks(data);
                })
            }
        }
    };
};

function renderTasks(tasks) {
    tasks.forEach((task,index) => {
        let taskItem = document.createElement('div');
        taskItem.id = task._id;
        taskItem.className = 'list-item';
        taskItem.addEventListener('click', ()=>{
            toggleTaskModal(task);
        })

        let taskHeader = document.createElement('div');
        taskHeader.innerText = task.title;
        taskHeader.className = 'item-header';

        let taskContent = document.createElement('div');
        taskContent.innerText = task.description;
        taskContent.className = 'item-content';

        taskItem.append(taskHeader, taskContent);

        document.getElementById(`${task.status}`).append(taskItem);
    });
};

function addUserToBoard() {
    let user = {
        email: document.getElementById('email').value
    }
    let jwt = localStorage.getItem('jwt');
    let boardId = window.location.href.split('#')[1];
    console.log(email)
    let xhttp = new XMLHttpRequest();
    xhttp.open('PUT', `${apiUrl}/addUserToBoard`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.setRequestHeader('board', boardId);
    xhttp.send(JSON.stringify(user));

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
                window.alert(this.response);
                document.getElementById('email').value = '';
        }
    };
};

function deleteTask() {
    console.log('test')
    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    let task = {
        taskId: currentTask._id
    }

    xhttp.open('DELETE', `${apiUrl}/deleteTask`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    console.log(currentTask);
    xhttp.send(JSON.stringify(task));

    location.reload();
}



function loadBoard() {
    document.getElementById('board-name').innerText = board.name;
    document.getElementById('board-type').innerText = board.type;
};

function goToBoards() {
    window.location.href = '/index.html'
};




