document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });

  (function() {
    emailjs.init("F4mLISQpclzpU-vy8"); //please encrypted user id for malicious attacks
  })();
//set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
document
        .getElementById("form-style-identifier")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const serviceID = "service_vavjsb9";
          const templateID = "template_76bkp9g";

          // send the email here
          emailjs.sendForm(serviceID, templateID, this).then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              alert("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error);
              alert("FAILED...", error);
            }
          );
        });
