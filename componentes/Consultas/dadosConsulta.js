document.addEventListener("DOMContentLoaded", function () {
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
                    </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);

        console.log(row);
      });
    })
    .catch((error) => console.error(error));
});
