 function checkMessage() {
    if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('message').value == "") {
        alert("All Fields Required");
    } else {
        alert("Form Submitted");
    }
 }

const contactFrom = document.getElementById('contactForm');

FormData.addEventListener('submit', checkMessage);