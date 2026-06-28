# RedCore Games

RedCore Games é uma aplicação web desenvolvida por **Renan Costa** para a disciplina de Programação Web. O projeto consome a API pública da RAWG para apresentar jogos, criadores, desenvolvedoras, plataformas e publicadoras em uma interface moderna, responsiva, internacionalizada e visualmente consistente.

## Identidade visual

A versão final possui duas opções de tema:

- **Tema escuro:** vermelho vivo com preto, mantendo a identidade gamer principal do projeto.
- **Tema claro:** branco com azul, pensado para melhor legibilidade e contraste em ambientes claros.

A escolha de tema fica salva no navegador por `localStorage`, então o usuário mantém sua preferência ao retornar ao sistema.

## Idiomas

A interface possui seletor de idioma com suporte a:

- Português do Brasil, como idioma padrão.
- Inglês, como idioma alternativo.

A internacionalização foi implementada com dicionário interno e gestão de estado global no front-end. Dessa forma, o sistema não depende obrigatoriamente de uma API paga de tradução para funcionar. Caso o projeto evolua, há espaço para integrar serviços externos como Google Translate API para traduzir conteúdos dinâmicos retornados por APIs externas.

## Funcionalidades

- Página inicial com apresentação profissional do sistema.
- Listagem de jogos com busca, filtros, intervalo de datas e ordenação.
- Cache local no navegador para acelerar consultas repetidas.
- Pré-carregamento das próximas páginas em segundo plano.
- Página de detalhes para cada jogo.
- Páginas específicas para criadores, desenvolvedoras, plataformas e publicadoras.
- Alternância entre tema escuro e tema claro.
- Alternância entre português brasileiro e inglês.
- Tratamento visual para carregamento, erros e ausência de dados.
- Layout responsivo para desktop, tablet e dispositivos móveis.
- Autoria ajustada para o único desenvolvedor: **Renan Costa**.

## Tecnologias utilizadas

- Next.js 15
- React 19
- Tailwind CSS
- React Icons
- RAWG Video Games Database API
- `localStorage` para cache, histórico de busca, idioma e tema

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env.local` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env.local
```

3. Edite o `.env.local` e coloque sua chave real da RAWG:

```bash
RAWG_API_KEY=sua_chave_real_da_rawg
API_KEY=sua_chave_real_da_rawg
NEXT_PUBLIC_RAWG_API_KEY=sua_chave_real_da_rawg
```

> O arquivo `.env.local` não deve ser enviado ao GitHub. Ele já está protegido pelo `.gitignore`.

4. Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

5. Acesse no navegador:

```bash
http://localhost:3000
```

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura principal

```text
app/
  api/games/                  # Rota interna para busca de jogos
  components/                 # Componentes reutilizáveis de interface
  components/AppProviders.jsx # Estado global de idioma e tema
  games/                      # Lista e detalhes de jogos
  creators/                   # Criadores
  developers/                 # Desenvolvedoras
  platforms/                  # Plataformas
  publishers/                 # Publicadoras
lib/
  rawg.js                     # Cliente de acesso à RAWG API
  gameCache.js                # Cache local e histórico de busca
  useDebouncedValue.js        # Hook de debounce
public/images/                # Logo e favicon
```

## Melhorias profissionais desta versão

### Cache inteligente e pré-carregamento

A página de jogos usa uma estratégia híbrida:

- Carrega a primeira consulta diretamente da RAWG API.
- Salva o resultado no `localStorage` do navegador por até 24 horas.
- Reaproveita consultas já feitas para abrir a tela quase instantaneamente.
- Pré-carrega automaticamente as duas próximas páginas em segundo plano.
- Exibe quantas consultas estão em cache e quando ocorreu a última atualização.
- Permite limpar o cache manualmente pela própria tela de busca.

Essa abordagem evita chamadas repetidas para a API, melhora a sensação de velocidade e demonstra gestão de estado/cache adequada para uma aplicação web moderna.

### Busca avançada

A busca possui:

- Campo principal com debounce.
- Histórico de buscas recentes salvo localmente.
- Filtros por gênero, plataforma, período de lançamento e faixa de Metacritic.
- Ordenação por avaliação, popularidade, lançamento e nome.
- Paginação controlada.
- Seleção de quantidade de itens por página.
- Estados visuais de carregamento, erro, cache e pré-carregamento.

### Internacionalização e temas

O projeto agora possui uma camada global de preferências em `AppProviders.jsx`, responsável por:

- Guardar o idioma selecionado.
- Guardar o tema selecionado.
- Atualizar atributos globais do documento.
- Salvar preferências no navegador.
- Fornecer textos traduzidos para os componentes.

## Desenvolvedor

**Renan Costa**  
GitHub: https://github.com/RenanCost15  
Projeto acadêmico de Programação Web.
