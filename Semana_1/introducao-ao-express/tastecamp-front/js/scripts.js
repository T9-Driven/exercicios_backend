
let receitas;

buscarReceitas();
// é um alias localhost == 127.0.0.1
function buscarReceitas() {
    const promessa = axios.get("http://localhost:5000/receitas");
    promessa.then(popularReceitas);
}

function popularReceitas(resposta) {
    console.log(resposta.data);
    receitas = resposta.data;
    renderizarReceitas();
}

// Populando menu
function renderizarReceitas() {
    const ulReceitas = document.querySelector(".receitas");
    ulReceitas.innerHTML = "";

    for (let i = 0; i < receitas.length; i++) {
        ulReceitas.innerHTML += `
            <li>
                <ion-icon name="fast-food-outline"></ion-icon>
                ${receitas[i].titulo}
            </li>   
        `;
    }
}

function adicionarReceita() {
    const titulo = document.querySelector(".nome-receita").value;
    const ingredientes = document.querySelector(".ingredientes-receita").value;
    const preparo = document.querySelector(".modo-preparo-receita").value;

    const novaReceita = { titulo: titulo, ingredientes: ingredientes, preparo: preparo };

    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp/receitas", novaReceita);

    promessa.then(buscarReceitas);
    promessa.catch(tratarErro);
}

function tratarErro(erro) {
    if (erro.response.status === 409) {
        alert("Essa receita já existe!");
    } else {
        alert("Ocorreu um erro inesperado. Tente novamente.");
    }
}

