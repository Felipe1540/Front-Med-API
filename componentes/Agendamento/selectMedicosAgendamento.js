document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("medicoSelect");

  console.log("Iniciando solicitação à API...");

  fetch("http://localhost:8080/medicos")
    .then((response) => response.json())
    .then((data) => {
      console.log("Dados retornados pela API:", data);

      data.forEach((medico) => {
        const option = document.createElement("option");
        option.value = medico.id; // Supondo que o paciente tenha uma propriedade 'id'
        option.text = medico.nome; // Supondo que o paciente tenha uma propriedade 'nome'
        select.appendChild(option);
      });

      console.log("Preenchimento do <select> concluído.");
    })
    .catch((error) => console.error("Erro ao buscar médicos: " + error));
});
