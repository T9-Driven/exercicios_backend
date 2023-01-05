let receitas;

buscarReceitas();

function buscarReceitas() {
    const promessa = axios.get(
        "http://localhost:5001/receitas"
    );
    promessa.then(popularReceitas);
}

function buscarReceitaEspecifica(id) {
    document.querySelector(".receita").classList.remove("escondido");
    document.querySelector(".adicionar-receita").classList.add("escondido");

    const titulo = document.querySelector(".titulo-pagina-receita");
    const ingredientes = document.querySelector(".destaque-ingredientes");
    const preparos = document.querySelector(".destaque-preparo");

    const promessa = axios.get(
        `http://localhost:5001/receitas/${id}`
    );
    promessa.then((resp) => {
        titulo.innerHTML = resp.data.titulo;
        ingredientes.innerHTML = resp.data.ingredientes;
        preparos.innerHTML = resp.data.preparo;
    });
}

function popularReceitas(resposta) {
    console.log(resposta.data);
    receitas = resposta.data;
    renderizarReceitas();
}

// Populando menu
function renderizarReceitas() {
    const ulReceitas = document.querySelector(".receitas");
    const contador = document.querySelector(".contador")
    ulReceitas.innerHTML = "";
    contador.innerHTML = `Qtd de receitas: ${receitas.length}`
    for (let i = 0; i < receitas.length; i++) {
        ulReceitas.innerHTML += `
            <li onclick="buscarReceitaEspecifica(${receitas[i].id})">
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

    const novaReceita = {
        titulo: titulo,
        ingredientes: ingredientes,
        preparo: preparo,
    };

    const promessa = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp/receitas",
        novaReceita
    );
    //const promessa = axios.post("http://localhost:4000/receitas", novaReceita);

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