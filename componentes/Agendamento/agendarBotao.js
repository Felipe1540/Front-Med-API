const formularioAgendar = document.querySelector("form");
const selectEspecialidade = document.querySelector(".especialidade");
const selectPaciente = document.querySelector(".paciente");
const selectMedico = document.querySelector(".medico");
const inputData = document.querySelector("#dataInput");

function agendar() {
  const inputData = document.querySelector("#dataInput");

  if (!inputData) {
    console.error("Elemento .dataHora não encontrado!");
    return; // Sai da função se o elemento não foi encontrado
  }

  const agendarData = {
    idMedico: selectMedico.value,
    idPaciente: selectPaciente.value,
    data: inputData.value, // Formatar a data antes de enviar para a API
  };

  console.log(agendarData);

  fetch("http://localhost:8080/consulta", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(agendarData),
  })
    .then((response) => {
      if (response.ok) {
        // A resposta do servidor indicou sucesso, então você pode redirecionar para a próxima página.
        window.location.href = "/componentes/Consultas/consultas.html";
      } else if (response.status === 401) {
        // O servidor retornou um status 401 (Não Autorizado), o que indica falha na autenticação.
        console.log("Dados de login incorretos. Tente novamente.");
      } else {
        // Lida com outros códigos de status, se necessário.
        console.log("Erro no servidor. Tente novamente mais tarde.");
      }
    })
    .catch((error) => {
      console.error("Erro na solicitação: " + error);
    });
}

function clean() {
  selectMedico.value = "";
  selectPaciente.value = "";
  selectEspecialidade.value = "";
  inputData.value = "";
}

formularioAgendar.addEventListener("submit", function (event) {
  event.preventDefault();

  agendar();
  clean();
});
