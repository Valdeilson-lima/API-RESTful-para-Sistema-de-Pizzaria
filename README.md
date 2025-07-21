# Pizzaria API

API para um sistema de pizzaria, desenvolvida em Node.js com TypeScript e Prisma.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3. Configure as variáveis de ambiente em um arquivo `.env`. Veja o arquivo `.env.example` para um exemplo. Certifique-se de incluir as variáveis de ambiente para o Cloudinary:
    ```
    CLAUDINARY_NAME=seu_cloud_name
    CLAUDINARY_KEY=sua_api_key
    CLAUDINARY_SECRET=seu_api_secret
    ```

4. Execute as migrações do banco de dados:
    ```bash
    npx prisma migrate dev
    ```

## Executando a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3333`.

## Endpoints da API

### Autenticação

*   **POST /login** - Autentica um usuário e retorna um token JWT.

    **Corpo da Requisição:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Usuários

*   **POST /users** - Cria um novo usuário.

    **Corpo da Requisição:**
    ```json
    {
      "name": "Nome do Usuário",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

*   **GET /user/detail** - Retorna os detalhes do usuário autenticado. (Requer autenticação)

### Categorias

*   **POST /category** - Cria uma nova categoria. (Requer autenticação)

    **Corpo da Requisição:**
    ```json
    {
      "name": "Pizzas"
    }
    ```

*   **GET /category/list** - Lista todas as categorias. (Requer autenticação)

### Produtos

*   **POST /product** - Cria um novo produto. (Requer autenticação)

    **Corpo da Requisição (multipart/form-data):**
    ```
    name: "Pizza Calabresa"
    price: "50.00"
    description: "Molho de tomate, calabresa, cebola e azeitona"
    category_id: "uuid-da-categoria"
    file: (imagem do produto)
    ```

*   **GET /category/products** - Lista todos os produtos de uma categoria. (Requer autenticação)

    **Query Params:**
    `category_id` - O ID da categoria.

### Pedidos

*   **POST /order/create** - Cria um novo pedido. (Requer autenticação)

    **Corpo da Requisição:**
    ```json
    {
      "table": 10,
      "name": "Cliente da Mesa 10"
    }
    ```

*   **DELETE /order/remove** - Remove um pedido. (Requer autenticação)

    **Query Params:**
    `order_id` - O ID do pedido.

*   **POST /order/add-item** - Adiciona um item a um pedido. (Requer autenticação)

    **Corpo da Requisição:**
    ```json
    {
      "order_id": "uuid-do-pedido",
      "product_id": "uuid-do-produto",
      "amount": 2
    }
    ```

*   **DELETE /order/remove-item** - Remove um item de um pedido. (Requer autenticação)

    **Query Params:**
    `item_id` - O ID do item.

*   **PUT /order/send** - Envia um pedido para a cozinha. (Requer autenticação)

    **Corpo da Requisição:**
    ```json
    {
      "order_id": "uuid-do-pedido"
    }
    ```

*   **GET /orders/list** - Lista todos os pedidos. (Requer autenticação)

*   **GET /order/detail** - Retorna os detalhes de um pedido. (Requer autenticação)

    **Query Params:**
    `order_id` - O ID do pedido.

*   **PUT /order/finish** - Finaliza um pedido. (Requer autenticação)

    **Corpo da Requisição:**
    ```json
    {
      "order_id": "uuid-do-pedido"
    }
    ```
