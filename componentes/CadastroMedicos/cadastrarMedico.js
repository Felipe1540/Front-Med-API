const formularioAgendar = document.querySelector("form");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");
const inputCrm = document.querySelector("#crm");
const inputEspecialidade = document.querySelector("#especialidade");
const inputCep = document.querySelector("#cep");
const inputLogradouro = document.querySelector("#logradouro");
const inputBairro = document.querySelector("#bairro");
const inputCidade = document.querySelector("#cidade");
const inputNumero = document.querySelector("#numero");
const inputComplemento = document.querySelector("#complemento");
const inputUf = document.querySelector("#uf");

function cadastrar() {
  const CadastrarDados = {
    nome: inputNome.value,
    email: inputEmail.value,
    telefone: inputTelefone.value,
    crm: inputCrm.value,
    especialidade: inputEspecialidade.value,
    endereco: {
      logradouro: inputLogradouro.value,
      bairro: inputBairro.value,
      cep: inputCep.value,
      cidade: inputCidade.value,
      uf: inputUf.value,
      numero: inputNumero.value,
      complemento: inputComplemento.value,
    },
  };

  console.log(CadastrarDados);

  fetch("http://localhost:8080/medicos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(CadastrarDados),
  })
    .then((response) => {
      if (response.ok) {
        // A resposta do servidor indicou sucesso, então você pode redirecionar para a próxima página.
        alert("Cadastro bem-sucedido!");
      } else if (response.status === 401) {
        // O servidor retornou um status 401 (Não Autorizado), o que indica falha na autenticação.
        console.log("Dados incorretos. Tente novamente.");
        console.log(CadastrarDados);
      } else {
        // Lida com outros códigos de status, se necessário.
        console.log(CadastrarDados);
        console.log("Erro no servidor. Tente novamente mais tarde.");
      }
    })
    .catch((error) => {
      console.error("Erro na solicitação: " + error);
    });
}

function clean() {
  inputNome.value = "";
  inputEmail.value = "";
  inputTelefone.value = "";
  inputCrm.value = "";
  inputEspecialidade.value = "";
  inputLogradouro.value = "";
  inputBairro.value = "";
  inputCep.value = "";
  inputCidade.value = "";
  inputUf.value = "";
  inputNumero.value = "";
  inputComplemento.value = "";
}

formularioAgendar.addEventListener("submit", function (event) {
  event.preventDefault();

  cadastrar();
  clean();
});
