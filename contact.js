const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userName = document.getElementById("name").value;
        formMessage.textContent =
            "Thank you, " + userName + "! Your message has been received.";

        contactForm.reset();
    });
}
