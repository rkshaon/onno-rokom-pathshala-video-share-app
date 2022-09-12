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

$(document).ready(function(){
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
});