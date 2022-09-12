// function signUpForm() {
//     // console.log('Button clicked');
//     let name = document.getElementById("user-name").value;
//     let email = document.getElementById("user-email").value;
//     let password1 = document.getElementById("user-password1").value;
//     let password2 = document.getElementById("user-password2").value;

//     // console.log(name);
//     // console.log(email);
//     // console.log(password1);
//     // console.log(password2);
//     if (password1 === password2) {
//         let userData = {
//             'name': name,
//             'email': email,
//             'password': password1
//         }
    
//         console.log(userData);
//     } else {
//         alert('Password does not matched!');
//         // location.href = ''
//         location.reload();
//     }    
// }
// $("#register-button").click(function(){
//     alert('Button-hitted');
// });

// $("#register-button").click(function(){
//     alert('Button');
//     console.log('Hello button');
//     // $.post("demo_test_post.asp",
//     // {
//     //   name: "Donald Duck",
//     //   city: "Duckburg"
//     // },
//     // function(data, status){
//     //   alert("Data: " + data + "\nStatus: " + status);
//     // });
//   });
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

        // console.log(userData);

        $.post("http://127.0.0.1:8000/user-api/register", userData, function(data, status){
            // alert("data: " + data + "\nstatus: ", status);
            console.log(status);
            console.log(data);
        });
    });
});