function parseResponse(xml) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(xml.response)
        resolve(data);
    })
};

function removeHash () {
    history.pushState("", document.title, window.location.pathname + window.location.search);
};

function toggleModal() {
    let modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
}

function toggleDialogModal() {
    let modal = document.querySelector("#dialog-modal");
    modal.classList.toggle("show-modal");
}

function toggleTaskModal(task) {
    clearTaskForm();
    if(task) {
        currentTask = task;
        document.getElementById('modal-title').innerText = 'Edit task';
        document.getElementById('form.name').value = task.title;
        document.getElementById('form.status').value = task.status;
        document.getElementById('form.description').value = task.description;
        createDeleteButton(document.getElementById('modal-form'));
    } else {
        currentTask = {
            _id: null,
            createdBy: null,
            taskName: null,
            taskType: null,
            taskStatus: null,
        }
        document.getElementById('modal-title').innerText = 'Create new task'
    }
    let modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
}

function clearTaskForm() {
    let deleteButton = document.getElementById('delete-button');
    if(deleteButton) {
        deleteButton.remove();
    }
    document.getElementById('form.name').value = "";
    document.getElementById('form.status').value = "";
    document.getElementById('form.description').value = "";
};

function createDeleteButton(node) {
    let deleteButton = document.createElement('input');
    deleteButton.id = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.addEventListener('click',  () => deleteTask());
    node.append(deleteButton);
}

function clearTeamForm() {
    document.getElementById('form.name').value = "";
}

function toggleTeamModal(team) {
    clearTeamForm();
    if(team) {
        console.log(team)
        currentTeam = team;
        document.getElementById('modal-title').innerText = '';
        document.getElementById('form.name').value = currentTeam.name;
    } else {
        document.getElementById('modal-title').innerText = 'Create new team';
    }

    let modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
}

function logout() {
    localStorage.removeItem('jwt');
    window.location.reload();
}