# Projeto de Gerenciamento de Clientes

## Introdução:
Esse projeto tem como objetivo o estudo e a implementação de uma aplicação completa no docker. A estrutura <br /> da aplicação foi dividida em 3 frentes, sendo elas: Backend, Frontend e Testes, siga o passo a passo abaixo para <br /> para conseguir rodar o projeto em sua maquina.
<br />
<br />

## Backend
### Instalação
    - git clone https://github.com/AllanScala1991/management-clients-docker
    - cd management-clients-docker/backend
    - npm install
    - npm run start

### Variaveis de ambiente .env
- DATABASE_URL : URL do seu banco de dados
- SECRET_TOKEN : token md5 hash
- CEP_API : URL da API do Viacep
- USERNAME : usuário ADMIN ("O mesmo deve ser criado após iniciar a aplicação")
- PASSWORD : senha do usuário ADMIN ("O mesmo deve ser criado após iniciar a aplicação")
<br />
<br />
### Tecnologias utilizadas
- Express
- Typescript
- Prisma
- Axios
- Email Validator
- JsonWebToken
- Bcrypt
<br />
<br />

## Frontend
### Instalação
    - cd management-clients-docker/front
OBS: É necessario subir um docker com nginx ou criar um http server.
<br />
### Tecnologias utilizadas
- HTML
- CSS
- Javascript
- Jquery
- Sweet Alert
<br />
### Screenshots
LOGIN
![login](img/login.png)
HOME
![home](img/home.png)
USER
![user](img/user.png)
CUSTOMER
![customer](img/customer.png)
REPORT
![report](img/report.png)
<br />
<br />

## Testes
### Instalação
    - cd management-clients-docker/tests
    - npm install
    - npm run open

### Variaveis de ambiente .env
- BASE_URL : URL do seu frontend
- LOGIN : usuário ADMIN ("O mesmo deve ser criado após iniciar a aplicação")
- PASSWORD : senha do usuário ADMIN ("O mesmo deve ser criado após iniciar a aplicação")
<br />
<br />
### Tecnologias utilizadas
- Cypress
- Typescript
- Chance
<br />
<br />