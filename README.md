# RedCore Games

RedCore Games é uma aplicação web desenvolvida por **Renan Costa** para a disciplina de Programação Web. O projeto consome a [RAWG Video Games Database API](https://rawg.io/apidocs) para apresentar jogos, criadores, desenvolvedoras, plataformas e publicadoras em uma interface moderna, responsiva e internacionalizada.

## Funcionalidades

- Página inicial de apresentação do sistema.
- Catálogo de jogos com busca, filtros, intervalo de datas, ordenação e paginação.
- Cache local no navegador para consultas repetidas e pré-carregamento das próximas páginas.
- Tela de detalhes de jogos.
- Seções para criadores, desenvolvedoras, plataformas e publicadoras.
- Tema claro/escuro e suporte a português do Brasil e inglês.
- Estados visuais de carregamento, erro e ausência de dados.
- Layout responsivo para desktop, tablet e celular.

## Tecnologias

- Next.js 15
- React 19
- Tailwind CSS
- React Icons
- RAWG Video Games Database API
- `localStorage` para cache, histórico, idioma e tema

## Executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie `.env.local` a partir de `.env.example` e informe a chave da RAWG:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_RAWG_API_KEY=sua_chave_real_da_rawg
```

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Publicação no GitHub Pages

O projeto está configurado para exportação estática e para deploy automático via GitHub Actions.

1. No GitHub, abra **Settings → Pages** e selecione **Source: GitHub Actions**.
2. Mantenha o arquivo `.env.local` versionado no repositório, pois o workflow lê esse arquivo durante o build estático.
3. Envie as alterações para a branch `main`.
4. Acompanhe a publicação na aba **Actions**.

> Observação importante: como o GitHub Pages é hospedagem estática, a chave `NEXT_PUBLIC_RAWG_API_KEY` fica pública no JavaScript gerado. Use apenas uma chave apropriada para esse cenário.

A URL prevista para este repositório é:

```text
https://renancost15.github.io/GammingProject/
```

## Créditos da API

Os dados e imagens de jogos são fornecidos pela [RAWG Video Games Database API](https://rawg.io/apidocs). O rodapé mantém um backlink ativo para a RAWG em todas as páginas que exibem dados da plataforma.

## Desenvolvedor

**Renan Costa**  
GitHub: [RenanCost15](https://github.com/RenanCost15)
