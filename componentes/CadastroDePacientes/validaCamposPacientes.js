// Função para validar e atualizar feedback
function validateInput(input, status) {
  if (input.validity.valid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    status.classList.remove("invalid-feedback");
    status.classList.add("valid-feedback");
    status.textContent = "";
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    status.classList.remove("valid-feedback");
    status.classList.add("invalid-feedback");
    status.textContent = "Campo obrigatório";
  }
}

// Adiciona o evento blur a todos os campos de entrada
var inputs = document.querySelectorAll(".form-control");
inputs.forEach(function (input) {
  var status = input.nextElementSibling;
  if (
    input.id != "numero" &&
    input.id != "complemento" &&
    input.id != "logradouro"
  )
    input.addEventListener("blur", function () {
      validateInput(input, status);
    });
});
