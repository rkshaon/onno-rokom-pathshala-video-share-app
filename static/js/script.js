function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

let token = null;

$(document).ready(function(){
    // console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token") !== null) {
        token = localStorage.getItem("token");
        document.getElementById("icon-register").style.display = 'none';
        document.getElementById("icon-login").style.display = 'none';
    } else {
        document.getElementById("icon-logout").style.display = 'none';
    }
      
    $("#register-button").click(function(){
        let name = document.getElementById("user-name").value;
        let username = document.getElementById("user-username").value;
        let email = document.getElementById("user-email").value;
        let password1 = document.getElementById("user-password1").value;
        let password2 = document.getElementById("user-password2").value;

        if (password1 !== password2) {
            alert('Your password does not matched!')
            location.reload();
        }

        let userData = {
            'name': name,
            'username': username,
            'email': email,
            'password': password1,
            'csrfmiddlewaretoken': csrftoken
        }

        $.post("http://127.0.0.1:8000/user-api/register", userData, function(data, status){
            location.href = 'http://127.0.0.1:8000/login';
        });
    });

    $("#login-button").click(function(){
        let credential = document.getElementById("login-user-credential").value;
        let password = document.getElementById("login-user-password").value;

        let userData = {
            'credential': credential,
            'password': password,
            'csrfmiddlewaretoken': csrftoken
        }

        $.post("http://127.0.0.1:8000/user-api/login", userData, function(data, status){
            // console.log(data, status);
            // console.log(data);
            // console.log(data.data);
            // console.log(data.data.token);
            localStorage.setItem("token", data.data.token);
            let token = localStorage.getItem("token");
            console.log('token: ', token);
            location.href = 'http://127.0.0.1:8000';
        });
    });

    $("#logout-button").click(function(){
        console.log('Logout button hit!');
        token = null;
        localStorage.removeItem("token");
        // location.reload();
        location.href = 'http://127.0.0.1:8000';
    });
});