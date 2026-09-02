const valorConta = 100;
const percentualGorjeta = 15;

const form = document.querySelector("#tip-form");
const valorContaInput = document.querySelector("#valor-conta");
const percentualGorjetaInput = document.querySelector("#percentual-gorjeta");
const totalOutput = document.querySelector("#total-output");
const tipOutput = document.querySelector("#tip-output");
const subtotalOutput = document.querySelector("#subtotal-output");
const percentageOutput = document.querySelector("#percentage-output");
const formError = document.querySelector("#form-error");
const tipOptions = document.querySelectorAll(".tip-option");

const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const calcularGorjeta = (valor, percentual) => valor * (percentual / 100);

const exibirResultado = (conta, percentual) => {
    const valorGorjeta = calcularGorjeta(conta, percentual);
    const valorTotal = conta + valorGorjeta;
    const mensagem = `Valor da Conta: ${formatarMoeda(conta)}, Gorjeta (${percentual}%): ${formatarMoeda(valorGorjeta)}, Total a pagar: ${formatarMoeda(valorTotal)}`;

    totalOutput.textContent = formatarMoeda(valorTotal);
    subtotalOutput.textContent = formatarMoeda(conta);
    tipOutput.textContent = formatarMoeda(valorGorjeta);
    percentageOutput.textContent = `(${percentual}%)`;
    console.log(mensagem);
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contaInformada = Number(valorContaInput.value);
    const percentualInformado = Number(percentualGorjetaInput.value);

    if (!Number.isFinite(contaInformada) || contaInformada <= 0) {
        formError.hidden = false;
        formError.textContent = "Informe um valor de conta maior que zero.";
        valorContaInput.focus();
        return;
    }

    if (!Number.isFinite(percentualInformado) || percentualInformado < 0 || percentualInformado > 100) {
        formError.hidden = false;
        formError.textContent = "Informe uma gorjeta entre 0% e 100%.";
        percentualGorjetaInput.focus();
        return;
    }

    formError.hidden = true;
    exibirResultado(contaInformada, percentualInformado);
});

tipOptions.forEach((option) => {
    option.addEventListener("click", () => {
        percentualGorjetaInput.value = option.dataset.percentage;
        tipOptions.forEach((item) => item.classList.remove("is-selected"));
        option.classList.add("is-selected");
        percentualGorjetaInput.focus();
    });
});

valorContaInput.value = valorConta;
percentualGorjetaInput.value = percentualGorjeta;
exibirResultado(valorConta, percentualGorjeta);
