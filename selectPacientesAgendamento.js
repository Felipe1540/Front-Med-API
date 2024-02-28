document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("pacientesSelect");

  console.log("Iniciando solicitação à API...");

  fetch("http://localhost:8080/pacientes")
    .then((response) => response.json())
    .then((data) => {
      console.log("Dados retornados pela API:", data);

      data.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.id; // Supondo que o paciente tenha uma propriedade 'id'
        option.text = paciente.nome; // Supondo que o paciente tenha uma propriedade 'nome'
        select.appendChild(option);
      });

      console.log("Preenchimento do <select> concluído.");
    })
    .catch((error) => console.error("Erro ao buscar pacientes: " + error));
});
