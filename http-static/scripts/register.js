const apiUrl = 'http://localhost:3000/api/v1';

function register() {
    let user = {
        email: document.getElementById('form.email').value,
        username: document.getElementById('form.username').value,
        password: document.getElementById('form.password').value
    };

    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `${apiUrl}/register`, true)
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(user));

    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 ) {
            if(this.status === 200) {
                alert('Registration succesfull');
                window.location.pathname = '/login.html';
            } else {
                 if(!document.getElementById('error')) {
                    let container = document.getElementsByClassName('form-container');
                    let error = document.createElement('p');
                    error.className = 'error';
                    error.innerText = this.response;
                    error.id = 'error';

                    container[0].insertBefore(error, container[0].firstChild);
                } else {
                    let error = document.getElementById('error');
                    error.innerText = this.response;
                }
            }
        }
    }
}

function goToLogin() {
    window.location.pathname = '/login.html';
}
