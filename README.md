# TRAFFIC MANAGER
TRAFFIC MANAGER é um projeto proposto pelo desafio técnico da empresa TIVIC. O objetivo deste projeto é criar um sistema simplificado de gerenciamento de ocorrências de trânsito que permita ao usuário criar, visualizar e excluir ocorrências.

A aplicação é dividida em duas partes: o frontend e o backend. O frontend é desenvolvido em Angular, enquanto o backend é desenvolvido em Java com Spring Boot 3 e utiliza PostgreSQL como banco de dados.

## Pré-requisitos
- Java (versão 17 ou superior)
- Angular CLI (versão 17)
- PostgreSQL

## Instalação
Para instalar a aplicação, siga os seguintes passos:

1. Clone o repositório:

```bash
git clone https://github.com/leonardovbdo/traffic-manager.git
```

2. Configure o banco de dados PostgreSQL:
```SQL
CREATE DATABASE traffic_reports_db;
```

3. Configure as credenciais do banco de dados:

- As configurações de conexão com o banco de dados estão localizadas no arquivo `application.properties` dentro do diretório `backend/src/main/resources/`.

- Edite o arquivo `application.properties` com suas credenciais do PostgreSQL:
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/traffic_reports_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

4. Execute o backend:

- Abra um IDE com compilador Java (por exemplo, IntelliJ IDEA, Eclipse).

- Importe o projeto backend localizado no diretório `backend`.

- Compile e execute o backend dentro da IDE.

- O backend será iniciado em http://localhost:8080.

5. Abra outro terminal, navegue até a pasta do frontend e instale as dependências:
```bash
cd frontend
npm install
```

6. Inicie o servidor local angular:
```bash
ng serve
```

7. Abra o navegador e acesse http://localhost:4200.
- Usuário padrão pré cadastrado para testes:
    - Email: leonardovbdo@gmail.com
    - Senha: 1234567890

## Funcionalidades
A aplicação permite que os usuários realizem as seguintes operações:

- Login com autenticação por token armazenado no `session storage`
- Registro de novos usuários com criptografia de senha
- Listagem de ocorrências de trânsito registradas pelo usuário respectivo
- Registro, visualização e exclusão de ocorrências de trânsito registradas pelo usuário respectivo
- Logout de usuário

## Estrutura do projeto
O projeto está organizado da seguinte forma:
- Backend: Contém o código do servidor desenvolvido em Java com Spring Boot 3 e Hibernate, que se comunica com o banco de dados PostgreSQL através de JPA para fornecer uma API REST para o frontend.
- Frontend: Contém o código do cliente desenvolvido em Angular 17, que se comunica com o servidor através da API REST disponibilizada e apresenta a interface gráfica para o usuário.