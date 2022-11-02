const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', () => {
    if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('message').value == "") {
        alert("All Fields Required");
    } else {
        alert("Form Submitted");
    }
});