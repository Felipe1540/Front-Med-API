document.addEventListener("DOMContentLoaded", function () {
  // Carregar os dados da API e preencher a tabela
  fetch("http://localhost:8080/consulta")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      // Verifica se os dados retornados são uma lista
      if (!Array.isArray(data)) {
        throw new Error("Os dados retornados pela API não são uma lista.");
      }

      // Limpa a tabela
      const tbody = document.querySelector("table tbody");
      tbody.innerHTML = "";

      // Função para preencher o modal com os valores da linha correspondente
      function preencherModal(event) {
        const button = event.target;
        const row = button.closest("tr");

        const nomeMedico = row.querySelectorAll("td")[0].innerText;
        const nomePaciente = row.querySelectorAll("td")[1].innerText;

        const modal = document.getElementById("modalEditar");
        const pacienteSelect = modal.querySelector("#pacientesSelect");
        const medicoSelect = modal.querySelector("#medicoSelect");

        // Limpar os selects antes de adicionar novas opções
        pacienteSelect.innerHTML = "";
        medicoSelect.innerHTML = "";

        // Criar e adicionar uma nova opção para o médico
        const optionMedico = document.createElement("option");
        optionMedico.text = nomeMedico;
        medicoSelect.appendChild(optionMedico);

        // Criar e adicionar uma nova opção para o paciente
        const optionPaciente = document.createElement("option");
        optionPaciente.text = nomePaciente;
        pacienteSelect.appendChild(optionPaciente);

        console.log(pacienteSelect, medicoSelect);

        // Abrir o modal
        var myModal = new bootstrap.Modal(modal);
        myModal.show();
      }

      // Preenche a tabela com os dados da API
      data.forEach((item) => {
        // Formata a data
        const formattedDate = new Date(item.data).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const row = `<tr>
                      <th scope="row">${item.id}</th>
                      <td>${item.nomeMedico}</td>
                      <td>${item.nomePaciente}</td>
                      <td>${formattedDate}</td>
                      <td><button type="button" class="btn btn-primary btn-editar">Editar</button></td>                      
                    </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });

      // Adicionar evento de clique aos botões "Editar" para preencher o modal
      const buttonsEditar = document.querySelectorAll(".btn-editar");
      buttonsEditar.forEach(function (button) {
        button.addEventListener("click", preencherModal);
      });
    })
    .catch((error) => console.error(error));
});
