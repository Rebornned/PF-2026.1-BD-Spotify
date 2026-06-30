async function carregarPagina(nomePagina) {

    const resposta = await fetch("/pages/" + nomePagina);

    const html = await resposta.text();

    const app = document.getElementById("app");

    app.innerHTML = html;

}

carregarPagina("musicas");


// carregarPagina("musicas");
//carregarPagina("generos");
//carregarPagina("artistas");
//carregarPagina("estatisticas");
