const apiUrl = 'http://localhost:3000/api/v1';

getUser();

var user = null;
function getUser() {
    let jwt = localStorage.getItem('jwt');
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', `${apiUrl}/getUser`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.setRequestHeader('token', jwt)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if(this.status === 200) {
                parseResponse(this).then((data) => {
                    user = data;
                })
            } else if (this.status === 403) {
                localStorage.removeItem('jwt');
                window.location.href = 'http://localhost:3000/login.html'
            }
        }
    };
}
