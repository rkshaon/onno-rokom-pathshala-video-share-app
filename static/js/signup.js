function signUpForm() {
    // console.log('Button clicked');
    let name = document.getElementById("user-name").value;
    let email = document.getElementById("user-email").value;
    let password1 = document.getElementById("user-password1").value;
    let password2 = document.getElementById("user-password2").value;

    // console.log(name);
    // console.log(email);
    // console.log(password1);
    // console.log(password2);
    if (password1 === password2) {
        let userData = {
            'name': name,
            'email': email,
            'password': password1
        }
    
        console.log(userData);
    } else {
        alert('Password does not matched!');
        // location.href = ''
        location.reload();
    }    
}