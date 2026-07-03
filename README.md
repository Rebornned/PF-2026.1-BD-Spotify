# 🎵 Spotify Explorer

<p align="center">
  <img src="./app_screenshots/index_musics.png" alt="Spotify Explorer UI" width="100%">
</p>

Sistema Web Full-Stack de alta performance para exploração, filtragem e análise estatística de dados musicais estruturado sob uma **arquitetura distribuída em 3 camadas (3-Tier)**. O projeto contempla desde a engenharia e saneamento de dados brutos de planilhas até a implantação automatizada em ambiente de nuvem.

Este ecossistema foi desenvolvido como **Trabalho Final da disciplina de Banco de Dados 1** no percurso acadêmico de Ciência da Computação.

---

## 🔗 Acesso ao Projeto

A aplicação encontra-se totalmente operacional e publicada nos seguintes ambientes de produção:

* 🌐 **Plataforma Web (Interface):** [https://spotify-frontend-09cs.onrender.com/]
* ⚡ **API REST (Back-end):** [https://pf-2026-1-bd-spotify.onrender.com]
* 🗄️ **Banco de Dados (MySQL):** Instância gerenciada e distribuída na nuvem via **Aiven Cloud**.

---

## 📚 Objetivos do Projeto

O escopo do trabalho exigeu a aplicação rigorosa do ciclo de vida de um sistema de banco de dados relacional:
* [x] **Abstração Conceitual:** Elaboração do Diagrama Entidade-Relacionamento (DER).
* [x] **Mapeamento Lógico:** Tradução para o modelo relacional e normalização estrita até a **Terceira Forma Normal (3FN)**.
* [x] **Modelagem Física & DDL:** Construção manual de scripts SQL com restrições severas e integridade referencial.
* [x] **Pipeline de ETL:** Saneamento, tratamento de dados nulos/duplicados e quebra de atomicidade via scripts Python.
* [x] **Carga de Dados Dinâmica:** População assistida e sequencial das tabelas minimizando violações de chaves estrangeiras (`FK`).
* [x] **Desenvolvimento Web Real:** Construção de uma interface moderna desacoplada consumindo queries complexas por meio de uma API RESTful.

---

## 🌐 Arquitetura do Sistema e Deploy

O projeto adota uma arquitetura descentralizada para simular de forma fiel um ambiente produtivo real de mercado:

1.  **Camada de Apresentação (Frontend):** Construída em **React + Vite**, operando como uma *Single Page Application* (SPA). A interface se comunica de forma totalmente assíncrona (via `fetch`/`axios`) enviando requisições e processando payloads em formato JSON.
2.  **Camada de Aplicação (Backend):** Uma API REST leve desenvolvida em **Python + Flask**. Utiliza o ORM **SQLAlchemy** (e o conector `PyMySQL`) como camada de persistência para isolar a lógica de negócios e as queries complexas das rotas HTTP.
3.  **Camada de Dados (Persistência):** SGBD **MySQL** hospedado de forma gerenciada na nuvem na plataforma **Aiven**, comunicando-se remotamente com o servidor de aplicação.


```
   [ Camada de Apresentação ]          [ Camada de Aplicação ]          [ Camada de Dados ]
   +------------------------+          +---------------------+          +-----------------+
   |      React + Vite      |  =====>  |    Flask REST API   |  =====>  |   MySQL Cloud   |
   |    (Render Cloud)      |   HTTP   |    (Render Cloud)   |   TCP    |  (Aiven Cloud)  |
   +------------------------+  <====   +---------------------+  <====   +-----------------+
                                JSON                                     SQL / SQLAlchemy
```

---

## 🗂️ Estrutura do Projeto

```text
PF-2026.1-BD-Spotify/
│
├── app_concepts/              # Protótipos e conceitos visuais da interface do usuário
├── database/                  # Dump completo do banco de dados relacional MySQL (.sql)
│   └── spotify_db_export.sql
├── dataset/                   # Local do arquivo CSV bruto extraído do Kaggle
├── model/                     # Artefatos das etapas de modelagem (brModelo)
│   ├── conceitual/            # Diagrama Entidade-Relacionamento (DER)
│   ├── logico/                # Diagrama do Modelo Relacional
│   └── fisico/                # Arquivos de modelo físico/mapeamento de tipos
├── project/                   # Código-fonte principal da aplicação distribuída
│   ├── app/                   # Back-end: Servidor Flask, Rotas API e Camada ORM
│   │   ├── __init__.py        # Inicialização do App, instâncias do CORS e SQLAlchemy
│   │   ├── config.py          # Gerenciamento de strings de conexão e variáveis (.env)
│   │   ├── models.py          # Classes de mapeamento objeto-relacional (Tabelas)
│   │   ├── queries.py         # Módulo isolado contendo as 7 Consultas SQL avançadas
│   │   ├── routes.py          # Endpoints REST expostos para o Frontend
│   │   └── templates/         # Página de fallback estática do Flask
│   │       └── index.html
│   ├── frontend/              # Front-end: SPA moderna em React + Vite + Node.js
│   │   ├── package.json       # Manifesto de dependências e scripts Node.js
│   │   ├── vite.config.js     # Configurações do ecossistema de build do Vite
│   │   ├── src/               # Componentes, Abas, Páginas e Requisições da UI
│   │   └── public/            # Ativos públicos e estáticos do cliente
│   ├── frontend_mockup/       # Conceito estático legível de design antigo / Referência
│   ├── .env.example           # Modelo de variáveis de ambiente para o servidor
│   └── run.py                 # Script de inicialização do servidor de desenvolvimento Flask
├── relatorios/                # Relatórios técnicos, parciais e documentações PDF do projeto
├── screenshots/               # Evidências do terminal, métricas e telas em alta resolução
├── scripts/                   # Scripts utilitários em Python para engenharia e ETL
│   ├── process_dataset.py     # Script de engenharia, normalização e quebra N:N
│   ├── clean_dataset.py       # Script focado em expurgar nulos e linhas duplicadas
│   └── create_tables.py       # Automação de criação física via ORM
├── scripts_output/            # Arquivos CSV atômicos gerados após execução do ETL
│   ├── genero.csv
│   ├── artista.csv
│   ├── album.csv
│   ├── musica.csv
│   └── participacao.csv
├── sql/                       # Consultas manuais auxiliares e scripts DDL puros
└── requirements.txt           # Manifesto de dependências e bibliotecas Python do Back-end

```

---

## 📊 O Dataset e a Métrica de Dados (ETL)

O projeto utilizou como ponto de partida o *Spotify Tracks Dataset* obtido via Kaggle. Originalmente, o arquivo consistia em uma única planilha gigante desnormalizada contendo **114.000 registros brutos**.

Através dos scripts contidos em `/scripts`, os dados passaram por um pipeline rigoroso de higienização que mitigou falhas de atomicidade (como múltiplos artistas compactados por ponto-e-vírgula em uma única célula) e eliminou nulos/duplicatas.

Após a conclusão do processo, as seguintes volumetrias foram validadas no MySQL através do comando `COUNT(*)`:

* 🗂️ **Músicas Homologadas (`MUSICA`):** 89.740 registros
* 🎤 **Artistas Isolados (`ARTISTA`):** 29.858 registros
* 💿 **Álbuns Catalogados (`ALBUM`):** 46.589 registros
* 🎼 **Gêneros Musicais (`GENERO`):** 113 registros
* 🔗 **Tabela de Junção (`PARTICIPACAO`):** 123.424 relacionamentos que amparam as participações de múltiplos artistas nas canções de forma perfeitamente normalizada (3FN).

---

## ✨ Funcionalidades e Consultas Avançadas

A aplicação web expõe as seguintes regras de negócio validadas por queries relacionais avançadas mapeadas na interface:

* 🎵 **Exploração de Faixas:** Busca textual parametrizada por nome da canção utilizando correspondência parcial via operador `LIKE` e tratamento do tempo de reprodução em minutos.
* 🎤 **Dossiê do Artista:** Localização instantânea de criadores, listando de forma unificada todas as canções, álbuns e colaborações ramificadas associadas a ele.
* 💿 **Mapeamento de Álbuns:** Recuperação das faixas que constituem um álbum de forma íntegra através de junções eficientes baseadas em chaves primárias e estrangeiras.
* 📊 **Consultas Analíticas Avançadas:**
* Uso expressivo de funções de agregação (`COUNT`, `AVG`, `SUM`, `MAX`).
* Mecanismos complexos de agrupamento (`GROUP BY`) e filtragem condicional agregada (`HAVING`).
* **Subconsultas dinâmicas** para extração de indicadores matemáticos complexos (ex: músicas mais populares de cada gênero e artistas que performam acima da média estatística geral da plataforma).



---

## 🛠️ Tecnologias Utilizadas

| Escopo | Ferramentas e Tecnologias |
| --- | --- |
| **Modelagem de Dados** | brModelo • MySQL Workbench • DBeaver |
| **Camada de Dados (SGBD)** | MySQL • Aiven Cloud Managed Service |
| **Camada de Aplicação (Backend)** | Python 3 • Flask • SQLAlchemy (ORM) • PyMySQL |
| **Camada de Apresentação (Frontend)** | Node.js • React • Vite • HTML5 • CSS3 Moderno |
| **Infraestrutura / Versionamento** | Git • GitHub • Render Cloud (Web Service / Static Site) |

---

## ⚙️ Executando o Projeto Localmente

### 1. Clonagem e Configuração do Repositório

```bash
git clone <url-do-repositório>
cd PF-2026.1-BD-Spotify

```

### 2. Configuração e Inicialização do Back-end (Flask)

Navegue até o diretório do projeto, inicialize o ambiente virtual isolado e instale os pacotes necessários:

```bash
cd project
python -m venv venv

```

* **Ativação no Windows (PowerShell):** `venv\Scripts\Activate.ps1`
* **Ativação no Windows (CMD):** `venv\Scripts\activate.bat`
* **Ativação no Linux/macOS:** `source venv/bin/activate`

Instale as dependências:

```bash
pip install -r ../requirements.txt

```

Crie o arquivo `.env` a partir do modelo estrutural:

```bash
cp .env.example .env

```

Abra o arquivo `.env` criado e insira suas credenciais de acesso local ou sua URL remota da nuvem.

#### Exemplo de Configuração Local

```env
DB_USER=root
DB_PASSWORD=sua_senha_local
DB_HOST=localhost
DB_PORT=3306
DB_NAME=spotify_db
SECRET_KEY=sua_chave_secreta_de_sessao

```

#### Exemplo de Configuração Remota (Aiven)

```env
DATABASE_URL=mysql+pymysql://usuario:senha@host_aiven:porta/nome_do_banco
SECRET_KEY=sua_chave_secreta_de_sessao

```

> 💡 *Nota:* Quando a variável `DATABASE_URL` está preenchida, o back-end a utiliza como prioridade absoluta para a conexão.

### 3. Carga do Banco de Dados Local (Caso opte por localhost)

No seu cliente MySQL local, instancie o esquema de dados:

```sql
CREATE DATABASE spotify_db;

```

Importe a estrutura e os dados limpos utilizando o arquivo disponibilizado em `/database`:

```bash
mysql -u seu_usuario -p spotify_db < ../database/spotify_db_export.sql

```

*Dica: Você também pode realizar esta importação diretamente pela ferramenta gráfica "Data Import" do MySQL Workbench.*

### 4. Inicializando a API do Back-end

Com o ambiente virtual ativado e as variáveis ajustadas no diretório `project/`:

```bash
python run.py

```

O backend passará a escutar chamadas REST na porta padrão: `http://127.0.0.1:5000`

### 5. Configuração e Inicialização do Front-end (React + Vite)

Abra uma **nova janela de terminal**, acesse a pasta do cliente visual, instale os módulos do Node e levante o servidor de desenvolvimento do Vite:

```bash
cd project/frontend
npm install
npm run dev

```

O servidor local do Vite será mapeado e initialized na porta padrão: `http://127.0.0.1:5173`

---

## ⚙️ Ajustes de Comunicação do Front-end

Por padrão, a interface React está configurada para mapear requisições localmente em `http://localhost:5000`. Caso deseje apontar para um endereço customizado ou para o link do deploy, crie um arquivo chamado `.env` na raiz do diretório `project/frontend/` contendo a variável correspondente:

```env
VITE_API_URL=http://seu-endereco-do-backend-no-render

```

---

## 📸 Screenshots da Interface

### Painel Geral de Músicas (Busca e Paginação)

<p align="center">
  <img src="./app_screenshots/index_musics.png" alt="Spotify Explorer UI" width="100%">
</p>

### Painel Geral de Artistas (Relacionamentos e Dossiê)

<p align="center">
  <img src="./app_screenshots/index_artists.png" alt="Spotify Explorer UI" width="100%">
</p>

### Métricas e Estatísticas Avançadas (Agregações SQL e Subqueries)

<p align="center">
  <img src="./app_screenshots/index_statistics.png" alt="Spotify Explorer UI" width="100%">
</p>

---

## 👥 Integrantes do Grupo

* 👤 **Dhemerson Sousa de Albuquerque (Autor e Desenvolvedor Principal)** 
* 🎓 **Ricardo Augusto de Borba**
* 🎓 **Mariana Kellen Araújo Moreira**
* 🎓 **Pedro Salazar Pessoa Machado**
* 🎓 **Emilly Tavares da Silva**

---
