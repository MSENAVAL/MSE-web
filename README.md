# MSE - Naval Consultancy & Survey

Esse projeto refere-se à MSE, uma empresa de engenharia naval que atua nas áreas técnicas e operacionais do setor marítimo, fluvial e portuário.

## Como rodar o projeto

1. Clone este repositório.
2. Instale as dependências com `npm install` ou `yarn install`.
3. Inicie o servidor de desenvolvimento com `npm run dev` ou `yarn dev`.
4. Abra o navegador e vá para `http://localhost:5173`.

## Scripts do Projeto

```json
"scripts": {
     "dev":"vite",
     "build":"tsc && vite build",
     "lint":"eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
     "preview":"vite preview",
     "prepare":"husky"
},
```

1. **dev** : Este script é utilizado durante o desenvolvimento da aplicação. Ele inicia o servidor de desenvolvimento em `http://localhost:5173` (por padrão) enquanto este script está em execução.
2. **build** : Este script é essencial para preparar a aplicação para implantação em produção. Ele compila todos os arquivos TypeScript em JavaScript, otimiza e agrupa os arquivos necessários, e cria uma versão otimizada da aplicação pronta para ser implantada em um servidor web. O resultado final é armazenado na pasta `dist`.
3. **lint** : Este script executa o ESLint em todos os arquivos TypeScript e TypeScriptX da sua aplicação. O ESLint é uma ferramenta de análise estática de código que ajuda a identificar e corrigir problemas de formatação, erros e más práticas de codificação.
4. **preview** : Este script é usado para visualizar a aplicação de produção antes de implantá-la. Ele inicia um servidor local que serve a versão de produção da sua aplicação, permitindo que você verifique se tudo está funcionando corretamente antes de fazer o deploy.
5. **prepare** : Este script é executado automaticamente pelo npm antes de instalar pacotes. Neste caso, ele está configurado para executar o Husky, que é uma ferramenta que permite integrar ganchos Git ao fluxo de trabalho. Isso é útil para garantir que padrões de commit específicos sejam seguidos por todos os membros da equipe, ajudando a manter um histórico de commits limpo e consistente.

## Sobre as tecnologias utilizadas

### React

O React é uma biblioteca JavaScript para construção de interfaces de usuário, desenvolvida pelo Facebook. Ele permite criar componentes reutilizáveis que gerenciam seu próprio estado e são atualizados de forma eficiente, graças à sua abordagem baseada em virtual DOM.

### Vite

O Vite é um construtor de aplicações web moderno e rápido, desenvolvido pela equipe por trás do Vue.js. Ele oferece um ambiente de desenvolvimento extremamente rápido, com suporte nativo para TypeScript, JSX e outros recursos modernos do JavaScript.

### Tailwind CSS

O Tailwind CSS é uma biblioteca de utilitários CSS altamente configurável, que permite estilizar rapidamente componentes e layouts sem escrever CSS customizado. Ele utiliza uma abordagem de "utility-first", onde classes CSS específicas são aplicadas diretamente nos elementos HTML.

Shadcn/UI

É uma biblioteca que oferece componentes React com suporte a sombreamento (shadowing) integrado. Com o Shadcn/UI, você pode adicionar facilmente sombras aos seus componentes React para criar uma interface mais elegante e visualmente atraente.

### Husky

Husky é uma ferramenta que permite definir ganchos (hooks) do Git para automatizar tarefas antes e depois de certos eventos, como commits e pushes. Isso é útil para garantir a qualidade do código, executando testes automatizados ou linters antes de confirmar as alterações.

Este template proporciona um ambiente de desenvolvimento ágil e produtivo, ideal para a criação de aplicações web modernas com React, TypeScript, Vite e Tailwind CSS.
