const togglePassword = document.getElementById("togglePassword");
const togglePassword2 = document.getElementById("togglePassword2");
const closedEye = document.getElementById("closedEye");
const openEye = document.getElementById("openEye");
const closedEye2 = document.getElementById("closedEye2");
const openEye2 = document.getElementById("openEye2");
const createPasswordInput = document.getElementById('password');
const createPassword2Input = document.getElementById('password2');

try {
    if (togglePassword){
        togglePassword.addEventListener("click", function () {
            // Toggle the type attribute between 'password' and 'text'
            const type = createPasswordInput.getAttribute("type") === "password" ? "text" : "password";
            createPasswordInput.setAttribute("type", type);
        
            // Toggle the visibility of the SVG icons
            if (type === "text") {
                closedEye.style.display = "none";
                openEye.style.display = "inline";
            } else {
                closedEye.style.display = "inline";
                openEye.style.display = "none";
            }
        });
    }
    if (togglePassword2) {
        togglePassword2.addEventListener("click", function () {
            // Toggle the type attribute between 'password' and 'text'
            const type = createPassword2Input.getAttribute("type") === "password" ? "text" : "password";
            createPassword2Input.setAttribute("type", type);
        
            // Toggle the visibility of the SVG icons
            if (type === "text") {
                closedEye2.style.display = "none";
                openEye2.style.display = "inline";
            } else {
                closedEye2.style.display = "inline";
                openEye2.style.display = "none";
            }
        });
        
    }
} catch (error) {
    console.log(error)
}
