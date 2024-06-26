# NotasApp Backend


Este é um projeto de backend desenvolvido com Node.js e SQLite para gerenciar notas pessoais. O objetivo é permitir o cadastro e listagem de notas, garantindo que cada usuário tenha acesso apenas às suas próprias notas. A listagem é paginada, permitindo um máximo de 10 notas por página.

## Tecnologias Utilizadas

* Node.js
* Express.js
* SQLite
* Swagger

## Funcionalidades

* Cadastro de notas
* Listagem de notas paginada
* Autenticação de usuário por login

## Como Rodar o Projeto

### Pré-requisitos

* Node.js instalado
* npm ou yarn instalado

### Passos para executar

1. Clone o repositório:

```git clone https://github.com/seuusuario/notasapp-backend.git```

2. Instale as dependências:

```
cd notasapp-backend
npm install
```

3. Configure o banco de dados SQLite:

A configuração padrão já está pronta para uso. Se desejar, você pode alterar as configurações no arquivo **config/database.js**.

Inicie o servidor:
```
cd app
npm app.js
```

O servidor estará rodando na porta 4200. Você pode acessar via **http://localhost:4200**.


## Endpoints

### Teste com Swagger
/api-docs

### Usuarios
**Cadastro de usuarios**
**POST /register**

- body:
* **username** (string): Nome do usuario
*  **email** (string): Email do usuario
*  **senha** (string): Senha do usuario

**GET /users**
* Resgata os usuarios cadastrados

**POST /login**
* **email** (string): Email do usuario
* **senha** (string): Senha do usuario

**POST /logout**
* Desconecta o login do usuario

### Cadastro de Nota
**POST /notes**

Parâmetros:

* **login** (string): Login do usuário
* **title** (string): Título da nota
* **content** (string): Conteúdo da nota
  
### Listagem de Notas
**GET /notes**

Parâmetros:

* **login** (string): Login do usuário
* **page** (number): Número da página (opcional, padrão é 1)
* **limit** (number): Quantidade de itens por página (opcional, padrão é 10, máximo é 10)
  
**TODO List**

 - [x] Configurar o ambiente de desenvolvimento
 - [x] Inicializar o projeto Node.js
 - [x] Configurar o SQLite
 - [X] Criar o modelo de banco de dados para notas e usuários - UM PARA MUTOS, E MUITOS PARA UM
 - [x] Implementar o endpoint de cadastro de nota
 - [x] Implementar o endpoint de listagem de notas com paginação
 - [x] Implementar autenticação básica de usuário
 - [x] Escrever a documentação da API
 - [x] Api com swagger para testar
 - [x] Usar Token com JWT
 - [ ] renovação do teken de 30 minutos
 - [ ] variavel de ambiente
