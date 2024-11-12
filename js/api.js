/* Cria a variável global logo no começo do .js para garantir que ela poderá ser acessada por todas as funções: */ 
var contato = {};

/* Pega a referência dos campos e acrescenta na variável contato QUANDO O DOM FOR CARREGADO */
document.addEventListener("DOMContentLoaded", function() {
    contato.nome = document.getElementById('nome');
    contato.email = document.getElementById('email');
    contato.mensagem = document.getElementById('msg');
})

/* Função de Validação para determinar se o campo está vazio: */
function naoVazio(value) {
    if (value == null || typeof value == 'undefined' ) return false;

    return (value.length > 0);
}

/* Função de Validação para determinar se o conteúdo de e-mail é realmente um e-mail: */
function ehEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
    return regex.test(String(email).toLowerCase());
}

/* Função GERAL de Validação de campos, que pode ser usada com qualquer das validações de campo acima: */
function validacaoCampo(campo, funcaoValidacao) {
    if (campo == null) return false;

    let campoEhValido = funcaoValidacao(campo.value)
    if (!campoEhValido) {
    campo.className = 'erro';
    } else {
    campo.className = '';
    }

    return campoEhValido;
}

/*Função CENTRAL de Validação que roda todas as validações acima e checa TODOS os campos do formulário: */
function ehValido() {
    var valido = true;
    
    valido &= validacaoCampo(contato.nome, naoVazio);
    valido &= validacaoCampo(contato.email, naoVazio);
    valido &= validacaoCampo(contato.email, ehEmail);
    valido &= validacaoCampo(contato.mensagem, naoVazio);
    return valido;
}

/* Construtor de nova Classe do tipo Contato para envio dos dados: */
class Contato {
    constructor(nome, email, mensagem) {
    this.nome = nome;
    this.email = email;
    this.mensagem = mensagem;
    }
}

/* Função que faz o teste de validação e, se positivo, constrói uma instância de Contato chamada 'mensagem' e a envia como parâmetro para a função inserirMensagem(mensagem): */

function construirMensagem() {
    if (ehValido()) {
        var mensagem = new Contato(contato.nome.value, contato.email.value, contato.mensagem.value);
        console.log(mensagem.nome)
        console.log(mensagem.email)
        console.log(mensagem.mensagem)
        alert(`Mensagem enviada, ${mensagem.nome}!`)
        inserirMensagem(mensagem)
    } else {
    alert("Houve um erro no seguinte campo:")
    }
}

/* Funções ADMIN: */

function acrescentarMensagens() {
    var corpoMensagens = document.getElementById("corpoMensagens");
    var bancoMensagens = obterMensagens();
    console.log(bancoMensagens[1].nome);

    for (var i = 0; i <= bancoMensagens.length; i++) {
        var html = "<tr><td>" + bancoMensagens[i].nome + "</td><td>" + bancoMensagens[i].email + "</td><td>" + bancoMensagens[i].mensagem + "</td></tr>";
        corpoMensagens.innerHTML += html;
    }
}

function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {

    var inserir = $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function validarUsuario() {
    var objLoginSenha = {
        email: document.getElementById('emailAdmin').value,
        senha: document.getElementById('senhaAdmin').value
    }

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    if (retorno == true) {
        location.href = "mensagens.html"
    } else {
        alert(`E-mail ou senha inválida.`)
    }
    return retorno;
}