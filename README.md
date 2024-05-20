# Sistema de Registro de Protestos e Emolumentos

Este é um sistema desenvolvido em Node.js e Express para realizar operações CRUD (Create, Read, Update, Delete) em três
entidades: "Protesto", "Emolumento" e "Usuário". O sistema permite o registro de protestos contra dívidas não pagas,
cálculo automático do emolumento com base nos dados do protesto e gerenciamento de usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Jest**: Framework de testes para JavaScript.
- **bcryptjs**: Biblioteca para hash de senhas.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.
- **swagger-ui-express**: Middleware para documentação de APIs.

## Arquitetura do Projeto

O projeto foi desenvolvido seguindo alguns padrões de projeto e design patterns, como:

- **Repository Pattern**: Separação das operações de banco de dados em repositórios.
- **Service Layer**: Separação das regras de negócio em serviços.
- **Middleware Pattern**: Utilização de middlewares para tratamento de requisições.
- **Strategy Pattern**: Definição de interfaces para encapsular algoritmos.

## Funcionalidades

- **CRUD**: Operações CRUD para usuários, protestos e emolumentos.
- **Autenticação**: Autenticação JWT para proteger rotas.
- **Autorização**: Controle de acesso baseado em roles `(USER, EMPLOYEE, ADMIN)`.
- **Cálculo Automático do Emolumento**: O valor do emolumento é calculado automaticamente com base no valor do protesto.

## Controle de acesso

- As rotas de login não possuem autenticação.
- Aos usuários `ADMIN` ou `EMPLOYEE`, são permitidas todas as operações.
- Ao usuário `USER`, são permitidas as operações de listagem de protestos, emolumentos, além da busca de um registro
  apenas.

## Instalação e Configuração

### Pré-requisitos

- Node.js v20 LTS
- PostgreSQL

### Passos para Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone git@github.com:victoralcan/ineo-teste.git
   cd ineo-teste
   ```
2. Instale as dependências:

  ```bash
   yarn install
 ```

3. Execute o `docker-compose.yml` com o comando:
   ```bash
      docker compose up -d
   ```
4. Configure as variáveis de ambiente no arquivo `.env` seguindo o `.env.example`
5. Rode as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```
6. Gere o prisma client
    ```bash
   npx prisma generate
   ```
7. Rode o seed para popular o banco de dados com dados iniciais
   ```bash
   yarn seed
   ```
8. Rode a aplicação
   ```bash
   yarn dev
   ```

## Testes

Para rodar os testes, execute o comando:

```bash
yarn test
```

## Estrutura do Projeto

* `bin/`: Inicializador do servidor
* `docs/`: Documentação da API.
* `errors/`: Erros lançados pela aplicação.
* `middlewares/`: Middlewares da aplicação.
* `prisma/`: Configuração do Prisma.
* `public/`: Arquivos estáticos.
* `repositories/`: Repositórios da aplicação.
* `routes/`: Rotas da aplicação.
* `services/`: Serviços da aplicação.
* `utils/`: Funções utilitárias.
* `app.ts`: Configuração do Express.
* `docker-compose.yml`: Configuração do Docker Compose com a infraestrutura necessária.

## Documentação

Esta API é documentada utilizando Swagger(OpenAPI). Para acessar a documentação, acesse a rota `/api-docs`.

## Seeds

Ao popular o banco com as seeds, é criado 1 usuário com a role `EMPLOYEE`:

- **Usuário**:
    - **Email**: `employee@example.com`
    - **Senha**: `senha`

## Pontos de Melhoria

- **Filtro de Protestos e Emolumentos**: Implementar filtros para busca de protestos e emolumentos.
- **Logs**: Implementar logs para monitoramento da aplicação.
- **Validação de Dados**: Implementar validação de dados com `Joi` ou `Yup`.
- **Testes de Integração**: Implementar testes de integração.
