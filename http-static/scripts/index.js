// const apiUrl = 'http://localhost:3000/api/v1';
var teams = null;
var boards = null;

removeHash();
getBoards();


function checkType() {
    let type = document.getElementById('form.type').value;

    if (type === 'Team') {
        showTeams();
    }
}

function loadTeams() {
    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getUserTeams`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    teams = data;
                })
            }
        }
    }
};

function showTeams() {
    let teamOptions = document.getElementById('form.team');
    teams.forEach((team, index) => {
        console.log(team)
        let option = document.createElement('option');
        option.value = index;
        option.innerText = team.name;
        teamOptions.append(option);
    });
    document.getElementById('team').style = 'display: in-line';
}

function createNewBoard() {
    let board = {
        boardName : document.getElementById('form.name').value,
        type : document.getElementById('form.type').value,
        team : null
    }
    if (board.type === 'Team') {
        board.team = teams[document.getElementById('form.team').value];
    }

    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `${apiUrl}/createBoard`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send(JSON.stringify(board));

    toggleModal();
    location.reload();
}

function getBoards() {
    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getUserBoards`);
    xhttp.setRequestHeader('token', jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    boards = data;
                    showBoards(data);
                })
            }
        }
    }
}

function goToTeams() {
    window.location.pathname = '/teams.html';
}

function goToBoards() {
    window.location.pathname = '/index.html';
}

function showBoards(boards) {
    boards.forEach((board, index) => {
        let boardElement = document.createElement('li');
        boardElement.className = "board-item";
        boardElement.id = board._id;

        let boardSurface = document.createElement('a');
        boardSurface.className = "board-tile";
        boardSurface.addEventListener('click', () => {
            goToBoard(boardElement.id);
        });
        // debugger;

        let boardHeader = document.createElement('div');
        boardHeader.className = "board-header";
        boardHeader.innerText = board.name;

        boardSurface.append(boardHeader);
        boardElement.append(boardSurface);

        document.getElementById('boards-list').append(boardElement);

    })
}

function goToBoard(boardId) {
    window.location.href += `#${boardId}`;
    window.location.pathname = `/dashboard.html`;
}
