# 🎵 Spotify Database Project

Este trabalho tem como objetivo desenvolver o projeto e implementação de um banco de dados baseado em informações musicais obtidas a partir de datasets do Spotify, servindo como projeto final da disciplina.

O tema escolhido busca organizar e permitir consultas relacionadas a músicas, artistas, álbuns e gêneros musicais, utilizando dados reais extraídos do conjunto de dados selecionado.

A partir desse banco de dados, será desenvolvida uma aplicação Web simples voltada para busca, consulta e visualização de informações musicais através de uma interface gráfica integrada ao banco.

O projeto foi desenvolvido utilizando modelagem entidade-relacionamento, conversões para os modelos lógico e físico e posterior implementação no SGBD, buscando representar adequadamente as relações existentes entre os elementos musicais presentes no dataset.

---

# 📚 Objetivo

Este projeto possui como objetivo realizar:

* Construção do modelo conceitual
* Conversão para modelo lógico
* Implementação do modelo físico
* Criação do banco de dados utilizando MySQL
* Limpeza, normalização e processamento do dataset
* População automática das tabelas
* Execução e validação das consultas exigidas

---

# 🗂 Estrutura do Projeto

```text
Projeto/
│
├── database/
│   └── spotify_db_export.sql
│
├── dataset/
│   └── dataset_limpo.csv
│
├── model/
│   ├── conceitual/
│   │   └── modelo_conceitual.brM3
│   │
│   ├── logico/
│   │   └── modelo_logico.brM3
│   │
│   └── fisico/
│       └── modelo_fisico.brM3
│
├── relatorios/
│   └── relatorio_parcial.pdf
│
├── screenshots/
│   └── imagens_utilizadas_nos_relatorios
│
├── scripts/
│   ├── process_dataset.py
│   ├── clean_dataset.py
│   └── create_tables.py
│
├── scripts_output/
│   ├── genero.csv
│   ├── artista.csv
│   ├── album.csv
│   ├── musica.csv
│   └── participacao.csv
│
└── sql/
    └── create_database.sql
```

---

# 📁 Descrição das Pastas

## database/

Contém o arquivo SQL exportado do banco de dados completo.

Inclui:

* Estrutura das tabelas
* Chaves primárias
* Chaves estrangeiras
* Dados populados

Permite recriar completamente o banco.

---

## dataset/

Contém o dataset tratado utilizado no projeto.

Este arquivo passou por:

* Remoção de duplicatas
* Remoção de registros inválidos
* Ajustes para normalização

---

## model/

Armazena todos os modelos produzidos utilizando brModelo.

### conceitual/

Modelo entidade-relacionamento inicial.

### logico/

Conversão do modelo conceitual para o modelo relacional.

### fisico/

Implementação física contendo tipos de dados e restrições.

---

## relatorios/

Contém os relatórios entregues durante as etapas do projeto.

---

## screenshots/

Armazena capturas de tela utilizadas como evidências no relatório.

Exemplos:

* Criação do banco
* Estrutura das tabelas
* Consultas SQL
* Resultados obtidos

---

## scripts/

Contém os scripts Python responsáveis pelo tratamento do dataset.

Funções realizadas:

* Leitura dos CSVs
* Limpeza dos dados
* Separação das entidades
* Exportação dos arquivos finais

---

## scripts_output/

Contém os arquivos CSV gerados automaticamente pelos scripts.

Cada arquivo corresponde a uma tabela do banco.

---

## sql/

Contém scripts SQL utilizados durante a implementação.

Exemplos:

* criação das tabelas
* constraints
* relacionamentos
* consultas auxiliares

---

# ⚙️ Como recriar o banco

## 1. Criar banco MySQL

Execute:

```sql
CREATE DATABASE spotify_db;
USE spotify_db;
```

---

## 2. Importar banco completo

Abra MySQL Workbench:

```
Server
↓
Data Import
↓
Import from Self Contained File
↓
Selecionar database/spotify_db_export.sql
↓
Start Import
```

---

# 🛠 Tecnologias Utilizadas

* Python
* MySQL
* MySQL Workbench
* brModelo
* CSV
* Git / GitHub

---

# 📊 Dataset Utilizado

O conjunto de dados contém informações relacionadas a:

* músicas
* artistas
* álbuns
* gêneros musicais
* participações

Após processamento:

* ~89 mil músicas
* ~29 mil artistas
* ~46 mil álbuns
* mais de 120 mil participações

---

# 👥 Integrantes

* Dhemerson Sousa de Albuquerque
* Ricardo Augusto de Borba
* Mariana Kellen Araújo Moreira
* Pedro Salazar Pessoa Machado
* Emilly Tavares da Silva 

---

Projeto desenvolvido para fins acadêmicos.
