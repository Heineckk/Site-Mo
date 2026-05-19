# Presente de Amor (template)

Site romântico 3D com quiz, galeria e carta — um link por casal.

## Links públicos

| URL | Descrição |
|-----|-----------|
| `/` | Redireciona para o **formulário de pedido** |
| `/formulario` | Clientes preenchem o pedido |
| `/formulario/namoro` | Formulário modelo casal |
| `/formulario/cartinha` | Formulário modelo carta |

## Presentes (link privado)

Cada presente fica em `https://seu-dominio.com/nome-do-casal` (ex.: `/ana-livia`).

Quem acessa só a raiz do site **não vê** a lista de presentes — só quem recebe o link abre o presente.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) → vai para `/formulario`.

## Personalizar / vender

Edite ou copie arquivos em [`sites/`](sites/README.md). Cada `.json` = um presente com link próprio.

## Publicar

1. [GitHub CLI](https://cli.github.com/) + `git push` ou `.\push-github.ps1`
2. [Vercel](https://vercel.com) → importar o repositório → Deploy

Envie ao cliente o link do **formulário** para pedir dados e o link do **presente** (`/slug`) quando estiver pronto.
