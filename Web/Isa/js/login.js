
var btnSignin = document.querySelector("#Entrar");
var btnSignup = document.querySelector("#Cadastrar-se");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "Entrar-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "Cadastrar-se-js";
})

