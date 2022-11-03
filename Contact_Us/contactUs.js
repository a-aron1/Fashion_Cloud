function submitFunction() {
    if (document.getElementById('name').value =="" ||
        document.getElementById('email').value == "" ||
        document.getElementById('message').value == "") {
        alert("All Sections Must Be Filled Out");
    } else {
        alert("Form Submitted");
    }
}