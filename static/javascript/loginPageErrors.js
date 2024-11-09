function displayError(errorCode) {
    if (errorCode === 0) {
        errorMessage = "Fill in all the inputs";
        document.getElementById('empty_inputs_login').style.display = 'block';
        return
    } else if (errorCode === 1) {
        errorMessage = "Incorect Password";
        wrong_label = document.getElementById('password_login_label');
        wrong_input =document.getElementById('password_login');
    } else if (errorCode === 2) {
        errorMessage = "Invalid Username";
        wrong_label = document.getElementById('username_login_label');
        wrong_input =document.getElementById('username_login');

    } else if (errorCode === 3) {
        errorMessage = "Fill in all the inputs";
        document.getElementById('empty_inputs_signup').style.display = 'block';
        return
    } else if (errorCode === 4) {
        errorMessage = "Username already used.";
        wrong_label = document.getElementById('username_signup_label');
        wrong_input =document.getElementById('username_signup');
    } else if (errorCode === 5) {
        errorMessage = "Email already used.";
        wrong_label = document.getElementById('email_signup_label');
        wrong_input = document.getElementById('email_sign_up');
    }
    wrong_label.style.color = '#d62828';
    wrong_label.innerText = errorMessage;
    wrong_input.style.border = '2px solid #CB4D56';
}