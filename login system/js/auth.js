let background = document.getElementById("background");
let loginBox = document.getElementById("loginBox");
let registerBox = document.querySelectorAll(".register");

function switchScreen(){
    background.classList.toggle("ltor"); 

    // media query to check
var media_query = 'screen and (max-width:900px)';

// matched or not
var matched = window.matchMedia(media_query).matches;

if(matched)
    loginBox.style.backgroundColor = "blue";
else
	console.log('Screen is not between 320 and 1023 pixels');
}


const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    if(checkLoginForm(email.value, password.value) === true){
        var formdata = new FormData();
        formdata.append("email", email.value);
        formdata.append("password", password.value);
        
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("status 200")
            if(xhttp.responseText == "No account found with that email."){
                swal("error", "No account found with that email.", "error")
            }else if(xhttp.responseText == 1){
                swal("login successful", "welcome", "success");
                setTimeout(function(){ location.href = "home.php"; }, 2500);
            }else if(xhttp.responseText == "The password you entered was not valid."){
                swal("error", "The password you entered was not valid.", "error")
            }else{
                swal("error","Something went wrong. Please try again later.", "error")
            }
        } else if (this.readyState == 4 && this.status != 200) {
            swal("error","Something went wrong. Please try again later.", "error")
        }
        }
        xhttp.open("POST", "php/login.php", true);
        xhttp.send(formdata);
    }else{
        alert("error, email or password incorrect")
    }
})

const regiaterForm = document.getElementById("regiaterForm");
regiaterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.getElementById("register_email");
    let password = document.getElementById("register_password");
    let confirm_password = document.getElementById("confirm_password");

    if(checkRegisterForm(email.value, password.value, confirm_password.value) === true){
        var formdata = new FormData();
        formdata.append("email", email.value);
        formdata.append("password", password.value);
        formdata.append("confirm_password", confirm_password.value);

        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("status 200");
            console.log(xhttp.responseText);
            if(xhttp.responseText == 1){
                swal("Success!", "Your user created succefull", "success"); 
                setTimeout(function(){ location.href = "index.html"; }, 2500);
            }else if(xhttp.responseText == "error"){
                swal("error","Something went wrong. Please try again later.", "error")
            }else if(xhttp.responseText == "password did not match"){
                swal("error", "password did not match", "error")
            }else if(xhttp.responseText == "Your password can't be your email"){
                swal("error", "Your password can not be your email.", "error")
            }else if(xhttp.responseText == "This email is already taken."){
                swal("error", "This email is already taken.", "error")
            }else if(xhttp.responseText = "Password must have atleast 8 characters."){
                swal("error", "Password must have atleast 8 characters.", "error")
            }
        } else if (this.readyState == 4 && this.status != 200) {
            swal("error","Something went wrong. Please try again later.", "error")
        }
        }
        xhttp.open("POST", "php/register.php", true);
        xhttp.send(formdata);
    }else{
        alert("error, email or password incorrect")
    }
    
})



function checkRegisterForm(email, password, confirm_password){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        if(password.length >= 8){
            if(password === confirm_password){
                return true;
            }
        }else{
            //alert("password too short, try again")
            return false;
        }
    } else {
        //alert("Invalid email address!");
        return false;
    }
}

function checkLoginForm(email, password){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        if(password.length >= 8){
            return true;
        }else{
            //alert("password too short, try again")
            return false;
        }
    } else {
        //alert("Invalid email address!");
        return false;
    }
}