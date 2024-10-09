# Front-end GProJurídico

Este repositório contém o front-end do sistema **GProJurídico**, um sistema **eficiente** para gestão e controle de **processos** e **atendimentos jurídicos**, destinado a uma organização que presta atendimentos às pessoas de baixa renda.

As tecnologias envolvidas no front-end são: **Typescript**, **HTML**, **SCSS**, **Angular**, **Angular Material**, **JWT** (JSON Web Token), **Firebase/Firestore**, **Jasmine**, **Karma**, **ESLint** e **Node.js**.

As versões das tecnologias acima encontram-se no arquivo **package.json**.

## Instalação

Pré-requisitos para a instalação e execução do projeto localmente: para você poder instalar e executar o front-end do GPRO é necessário você tenha instalado o [NodeJS](https://nodejs.org/pt), depois o [TypeScript](https://www.npmjs.com/package/typescript) e por o [Angular CLI](https://angular.dev/tools/cli/setup-local).

1. Clone o repositório:

   1. Via HTTPS
      ```bash
      git clone https://github.com/fabuniprojecaotag/npj-frontend.git
      ```
   
   2. Ou via SSH
        ```bash
        git clone git@github.com:fabuniprojecaotag/npj-frontend.git
        ```

2. Instale as dependências node_modules do projeto:
        ```npm
        install
        ```

Observação: Recomendado usar o Node a partir da versão 16

## Uso

1. Inicie a aplicação no CLI com:
       ```ng
        serve --o
        ```
2. Realize o login (de algum usuário cadastrado) para acessar a aplicação.

## Autorização

Dado o login efetuado com sucesso, o usuário precisará ter a **role** necessária para acessar alguns **recursos protegidos**.

A API usa o **Spring Security** para o controle de autenticação. As seguintes roles estão disponíveis:

````
ESTAGIARIO → Possui acesso para executar GET em todos os endpoints
PROFESSOR → possui acesso para executar GET e POST em todos e um endpoint, respectivamente
SECRETARIA → possui acesso para executar GET, POST e PUT em todos os endpoints
COORDENADOR → Possui acesso total
````

## Mais sobre o Projeto

O sistema **GProJurídico** é fruto de um trabalho realizado pelo time da **Fábrica de Software** do **UniProjeção** de Taguatinga. 

Com o intuito de permitir que um **NPJ** (Núcleo de Práticas Jurídicas) vinculado à universidade tenha uma **gestão e controle eficientes dos atendimentos** que este presta para **comunidade de baixa de renda** e realiza entre os **estudantes e professores de Direito**, foi criado este projeto de software.

O trabalho encontra-se, atualmente, **em desenvolvimento**, segmentado entre **Back-end** e **Front-end** pela equipe e possui a previsão de ter a versão **1.0** lançada até o **final do 1º semestre de 2024**.
