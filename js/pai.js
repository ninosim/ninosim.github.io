document.addEventListener('DOMContentLoaded', function() {
    receberMensagens();
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtém o nome do arquivo atual
    const currentPage = window.location.pathname.split("/").pop();

    // Seleciona todos os links da sidebar
    const sidebarLinks = document.querySelectorAll(".sidebar-item");

    // Itera pelos links e adiciona a classe 'active' ao correspondente
    sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se os campos de login foram preenchidos
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
    } else {
        var objLoginSenha = {
            email: username,
            senha: password
        };
/* Envio de dados à API de autenticação
        
        var resposta = validarUsuario(objLoginSenha);
    
        console.log(resposta)

*/
        resposta = true;
        if (resposta == true) {
            window.location.href = '000.dadospaciente2.html';
        } 
        else {
            alert('E-mail e/ou Senha inválidos');
        }
    }
}
