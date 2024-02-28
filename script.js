const formulario = document.querySelector("form");
const inputLogin = document.querySelector(".login");
const inputSenha = document.querySelector(".senha");

function logar() {
  const loginData = {
    login: inputLogin.value,
    senha: inputSenha.value
  };

  fetch('http://localhost:8080/login', {
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (response.status === 200) {
      // A resposta do servidor indicou sucesso, então você pode redirecionar para a próxima página.
      window.location.href = "agendamento.html";
    } else if (response.status === 401) {
      // O servidor retornou um status 401 (Não Autorizado), o que indica falha na autenticação.
      console.log("Dados de login incorretos. Tente novamente.");
    } else {
      // Lida com outros códigos de status, se necessário.
      console.log("Erro no servidor. Tente novamente mais tarde.");
    }
  })
  .catch(error => {
    console.error("Erro na solicitação: " + error);
  });
}

function clean() {
  inputLogin.value = "";
  inputSenha.value = "";
}

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  logar();
  clean();
});

