# Vue Todo List

Aplicacao de lista de tarefas desenvolvida com Vue 3, Vuex, Vite e JSON Server. O projeto foi estruturado como uma peca de portfolio para demonstrar organizacao de componentes, gerenciamento de estado, integracao com API REST local e uma interface responsiva.

## Visao Geral

O Vue Todo List permite cadastrar, listar, concluir e remover tarefas. As alteracoes sao persistidas em uma API local baseada em JSON Server, enquanto a interface e atualizada imediatamente por meio do estado global com Vuex.

### Principais recursos

- Listagem de tarefas carregadas da API local.
- Cadastro de novas tarefas sem recarregar a pagina.
- Marcacao de tarefas como concluidas ou pendentes.
- Remocao de tarefas com sincronizacao entre backend e Vuex.
- Estado global centralizado com Vuex.
- Layout responsivo para desktop, tablet e mobile.
- Configuracao do Vite para evitar reload automatico quando o banco JSON e alterado.

## Tecnologias

- Vue 3
- Vuex 4
- Vite
- Tailwind CSS
- Axios
- JSON Server

## Estrutura de Pastas

```txt
vue-list/
├── api/
│   └── database.json          # Base de dados local usada pelo JSON Server
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css       # Importacao do Tailwind e estilos globais
│   │   └── img/
│   │       └── spinner.svg    # Indicador visual de carregamento
│   ├── components/
│   │   ├── ToDoEmpty.vue      # Estado vazio da lista
│   │   ├── ToDoFormAdd.vue    # Formulario de cadastro
│   │   ├── ToDoItem.vue       # Item individual com concluir/remover
│   │   ├── ToDoItems.vue      # Renderizacao da colecao de tarefas
│   │   └── ToDoSpinner.vue    # Loading inicial
│   ├── store/
│   │   └── index.js           # Estado global, mutations e actions Vuex
│   ├── App.vue                # Layout principal e carregamento inicial
│   └── main.js                # Inicializacao da aplicacao Vue
├── index.html
├── package.json
└── vite.config.js
```

## Como Executar

### 1. Instalar dependencias

```sh
npm install
```

### 2. Subir a API local

O projeto consome os dados em `http://localhost:3000/todos`. Execute o JSON Server apontando para o arquivo de banco local:

```sh
npx json-server api/database.json --port 3000
```

### 3. Subir a aplicacao Vue

Em outro terminal, execute:

```sh
npm run dev
```

Depois acesse a URL exibida pelo Vite, geralmente:

```txt
http://localhost:5173
```

## Scripts Disponiveis

```sh
npm run dev
```

Executa o servidor de desenvolvimento com Vite.

```sh
npm run build
```

Gera a versao de producao do projeto.

```sh
npm run preview
```

Executa uma previa local do build de producao.

## Fluxo de Dados

O componente `App.vue` dispara a action `getTodos` ao montar a aplicacao. A action busca as tarefas na API e envia os dados para a mutation `storeTodos`, atualizando o estado global.

Ao criar uma tarefa, `ToDoFormAdd.vue` dispara a action `addTodo`. A action faz um `POST` para a API e, depois da resposta, adiciona a nova tarefa ao Vuex com a mutation `storeTodo`.

Ao concluir ou reabrir uma tarefa, `ToDoItem.vue` dispara a action `updateTodo`. A action faz um `PUT` para a API e substitui o item correspondente no estado com a mutation `updateTodo`.

Ao remover uma tarefa, `ToDoItem.vue` dispara a action `deleteTodo`. A action faz um `DELETE` na API e remove o item do estado com a mutation `deleteTodo`.

## Endpoints Utilizados

```txt
GET    /todos
POST   /todos
PUT    /todos/:id
DELETE /todos/:id
```

## Observacoes Tecnicas

- O arquivo `api/database.json` fica dentro do projeto para facilitar a execucao local.
- O Vite foi configurado para ignorar alteracoes nesse arquivo durante o desenvolvimento. Isso evita que a tela recarregue quando o JSON Server salva uma nova tarefa.
- O estado visual da lista e atualizado pelo Vuex apos cada resposta da API, mantendo a interface sincronizada com o backend local.
- Os botoes de acao usam `type="button"` para evitar submits acidentais.

## Build

Para validar se o projeto esta pronto para producao:

```sh
npm run build
```

O resultado sera gerado na pasta `dist/`.
