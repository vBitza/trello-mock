getTeams();

var teams = null;
var currentTeam = null;

function getTeams() {
    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getUserTeams`);
    xhttp.setRequestHeader('token', jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                parseResponse(this).then((data) => {
                    teams = data;
                    showTeams(data);
                })
            }
        }
    };
};

function showTeams(teams) {
    teams.forEach((team, index) => {
        let boardElement = document.createElement('li');
        boardElement.className = "board-item";
        boardElement.id = index;

        let boardSurface = document.createElement('a');
        boardSurface.className = "board-tile";
        boardSurface.addEventListener('click', () => {
            // toggleTeamModal(team);
        });

        let boardHeader = document.createElement('div');
        boardHeader.className = "board-header";
        boardHeader.innerText = team.name;

        boardSurface.append(boardHeader);
        boardElement.append(boardSurface);

        document.getElementById('boards-list').append(boardElement);

    })
}

function createNewTeam() {
    let team = {
        teamName : document.getElementById('form.name').value,
    }

    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `${apiUrl}/createTeam`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send(JSON.stringify(team));

    toggleModal();
    location.reload();
}

function openTeam(boardId) {
    window.location.href += `#${boardId}`;
    window.location.pathname = `/dashboard.html`;

}


function goToBoards() {
    window.location.pathname = '/index.html';
};