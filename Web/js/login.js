var formSignIn = document.querySelector('#signIn')

var formSignUp = document.querySelector('#signUp')

var btnCor = document.querySelector('.btnCor')

document.querySelector('#btnSignIn').addEventListener('click', () => {
    formSignIn.style.left = "25px"    // Mostra o formulário de login
    formSignUp.style.left = "450px"   // Esconde o formulário de cadastro
    btnCor.style.left = "0px"         // Move o botão colorido para a esquerda
})

document.querySelector('#btnSignUp').addEventListener('click', () => {
    formSignIn.style.left = "-450px"  // Esconde o formulário de login
    formSignUp.style.left = "25px"    // Mostra o formulário de cadastro
    btnCor.style.left = "110px"       // Move o botão colorido para a direita
})

// Confirmação de senha
document.addEventListener("DOMContentLoaded", () => {
    const senha = document.getElementById("senha");        // Campo de entrada da senha
    const confirmar = document.getElementById("confirmar"); // Campo de confirmação da senha
    const msg = document.getElementById("msg");             // Elemento para exibir a mensagem

    if (senha && confirmar && msg) {
        confirmar.addEventListener("input", () => {
           
            if (senha.value === confirmar.value) {
                msg.textContent = "Senhas iguais!"; // Exibe mensagem positiva se forem iguais
            } else {
                msg.textContent = "Senhas diferentes!"; // Exibe mensagem de erro se forem diferentes
            }
        });
    }
});

