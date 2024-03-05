document.addEventListener("DOMContentLoaded", function () {
  const itensPorPagina = 5; // Defina a quantidade de itens por página
  let paginaAtual = 0; // Página inicial
  let idConsulta;

  function carregarDadosPaginados(pagina) {
    const url = `http://localhost:8080/consulta?page=${pagina}&size=${itensPorPagina}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API: " + response.status);
        }
        return response.json();
      })
      .then((page) => {
        const data = page.content; // Extrai os dados da página
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // Limpa os dados da tabela antes de preencher com os novos dados

        // Função para preencher o modal com os valores da linha correspondente
        function preencherModal(event) {
          const button = event.target;
          const row = button.closest("tr");

          const nomeMedico = row.querySelectorAll("td")[0].innerText;
          const nomePaciente = row.querySelectorAll("td")[1].innerText;
          const horario = row.querySelectorAll("td")[2].innerText;

          // Definir o ID da consulta
          idConsulta = row.querySelector("th").innerText;

          const modal = document.getElementById("modalEditar");
          const pacienteSelect = modal.querySelector("#pacientesSelect");
          const medicoSelect = modal.querySelector("#medicoSelect");
          const especialidadeSelect = modal.querySelector(
            "#especialidadeSelect"
          );
          const dataInput = modal.querySelector("#dataInput"); // Selecione o campo de data

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

          // Converter e formatar a data no formato desejado
          const [day, month, year, hour, minute] = horario
            .replace(",", "")
            .split(/[ /:]/);
          const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`;

          dataInput.value = formattedDateTime;

          console.log(pacienteSelect, medicoSelect, formattedDateTime);

          // Abrir o modal
          var myModal = new bootstrap.Modal(modal);
          myModal.show();
        }

        // Preenche a tabela com os dados da API
        data.forEach((item) => {
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
                                <td><button type="button" class="btn btn-warning btn-editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></button></td>                       
                      </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });

        // Adicionar evento de clique aos botões "Editar" para preencher o modal
        const buttonsEditar = document.querySelectorAll(".btn-editar");
        buttonsEditar.forEach(function (button) {
          button.addEventListener("click", preencherModal);
        });

        atualizarPaginacao(page.totalPages); // Atualiza a paginação após preencher a tabela com os novos dados
      })
      .catch((error) => console.error(error));
  }

  function atualizarPaginacao(totalPaginas) {
    const paginationElement = document.querySelector(".pagination");

    console.log(totalPaginas);

    paginationElement.innerHTML = ""; // Limpa a paginação atual

    // Adiciona o link "Anterior"
    const previousPageItem = document.createElement("li");
    previousPageItem.classList.add("page-item");
    const previousPageLink = document.createElement("a");
    previousPageLink.classList.add("page-link");
    previousPageLink.href = "#";
    previousPageLink.tabIndex = "-1";
    previousPageLink.setAttribute("aria-disabled", "true");
    previousPageLink.innerText = "Anterior";
    previousPageLink.addEventListener("click", () => {
      if (paginaAtual > 0) {
        paginaAtual--;
        carregarDadosPaginados(paginaAtual);
      }
    });
    previousPageItem.appendChild(previousPageLink);
    paginationElement.appendChild(previousPageItem);

    // Adiciona os números das páginas
    for (let i = 0; i < totalPaginas; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      if (i === paginaAtual) {
        pageItem.classList.add("active");
      }
      const pageLink = document.createElement("a");
      pageLink.classList.add("page-link");
      pageLink.href = "#";
      pageLink.innerText = i + 1;
      pageLink.addEventListener("click", (event) => {
        paginaAtual = parseInt(event.target.innerText);
        carregarDadosPaginados(paginaAtual);
      });
      pageItem.appendChild(pageLink);
      paginationElement.appendChild(pageItem);
    }

    // Adiciona o link "Próximo"
    const nextPageItem = document.createElement("li");
    nextPageItem.classList.add("page-item");
    const nextPageLink = document.createElement("a");
    nextPageLink.classList.add("page-link");
    nextPageLink.href = "#";
    nextPageLink.innerText = "Próximo";
    nextPageLink.addEventListener("click", () => {
      if (paginaAtual < totalPaginas - 1) {
        paginaAtual++;
        carregarDadosPaginados(paginaAtual);
      }
    });
    nextPageItem.appendChild(nextPageLink);
    paginationElement.appendChild(nextPageItem);
  }

  carregarDadosPaginados(paginaAtual);

  function salvarAlteracoes() {
    const modal = document.getElementById("modalEditar");
    const dataInput = modal.querySelector("#dataInput");

    const updateData = {
      id: idConsulta,
      data: dataInput.value,
    };

    //SALVAR ALTERACOES
    console.log(updateData);

    fetch("http://localhost:8080/consulta", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/componentes/Consultas/consultas.html";
        } else if (response.status === 401) {
          // O servidor retornou um status 401 (Não Autorizado), o que indica falha na autenticação.
          console.log("Dados incorretos. Tente novamente.");
        } else {
          // Lida com outros códigos de status, se necessário.
          console.log("Erro no servidor. Tente novamente mais tarde.");
        }
      })
      .catch((error) => {
        console.error("Erro na solicitação: " + error);
      });

    console.log(updateData);
  }

  const buttonsSalvar = document.querySelectorAll(".btn-alterar");
  buttonsSalvar.forEach(function (button) {
    button.addEventListener("click", salvarAlteracoes);
  });
});
