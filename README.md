# Banco API Tests

Este projeto contém testes automatizados na API REST do banco-api, utilizando [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Supertest](https://github.com/ladjs/supertest). Os relatórios dos testes são gerados pelo [Mochawesome](https://github.com/mochawesome/mochawesome).

## Estrutura do Projeto

```
.
├── .env.example
├── .env
├── package.json
├── fixtures/
│   ├── post-login.json
│   └── post-transferencias.json
├── helpers/
│   └── auth.js
├── test/
│   ├── login.test.js
│   └── transferencias.test.js
└── mochawesome-report/
    ├── mochawesome.html
    ├── mochawesome.json
    └── assets/
```

- **fixtures/**: Contém exemplos de payloads para os testes.
- **helpers/**: Funções auxiliares para autenticação.
- **test/**: Testes automatizados.
- **mochawesome-report/**: Relatórios gerados após a execução dos testes.

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd banco-api-tests
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência:

```
URL = 'url-da-sua-aplicacao'
```

Substitua `'url-da-sua-aplicacao'` pela URL da sua API (exemplo: `http://localhost:3000`).

## Executando os Testes

Para rodar todos os testes e gerar o relatório:

```sh
npm test
```

## Acessando o Relatório

Após a execução dos testes, o relatório estará disponível em:

- [mochawesome-report/mochawesome.html](mochawesome-report/mochawesome.html)

Abra este arquivo em seu navegador para visualizar os resultados detalhados.

## Documentação

- [Supertest](https://github.com/ladjs/supertest) - Biblioteca para chamadas HTTP
- [Chai](https://www.chaijs.com/) - Biblioteca para validação e asserções
- [Mocha](https://mochajs.org/) - Framework de testes
- JavaScript (Node.js) - Linguagem de programação utilizada
---