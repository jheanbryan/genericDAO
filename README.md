# Gerenciamento de Vendas

Este projeto é um sistema de gerenciamento de vendas.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **SQLite**
- **Jest** (para testes)
- **faker.js** (para geração de dados fictícios)

## Estrutura do Projeto
- models -> Tipos para 4 entidades
- DAO -> Dao genérico e testes
- database -> arquivos para criar o banco, e popular as tabelas com 50 dados ficticios

## Configuração do Ambiente

### 1 - Clone o Repositório:

```sh
git clone https://github.com/jheanbryan/genericDAO.git
```

### 2 - Instale as dependencias:
```sh
yarn install
```

ou

```sh
npm install
```

### 3 - Inicie o banco:
```sh
npm run init-db
npm run insert-db
```
### 3 - Execute os testes:
```sh
npm run test
```


## Informações adicionais:
- O GenericDao foi pensado para funcionar com qualquer entidade existente, neste caso para as 4 criadas. Dessa forma todas as operaçoes devem funcionar para todas as entidades;
- Tetes unitários com jest foram criados para testar o GenericDao;
