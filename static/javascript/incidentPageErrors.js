function displayError(errorCode){
    if (errorCode === 0) {
        errorMessage = "Description cannot be empty.";
        wrong_label = document.getElementById('incident_description_label');
        wrong_textArea = document.getElementById('incident_description');

    } else if (errorCode === 1) {
        errorMessage = "Address cannot be empty";
        wrong_label = document.getElementById('incident_adress_label');
        wrong_textArea = document.getElementById('incident_adress');

    } else if (errorCode === 2) {
        document.getElementById('notConnectedError').style.display = 'block';
        return
    }
    
    wrong_label.style.color = '#d62828';
    wrong_label.innerText = errorMessage;
    wrong_textArea.style.border = '2px solid #CB4D56';
}