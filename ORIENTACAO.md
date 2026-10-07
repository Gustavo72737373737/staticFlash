# Orientacao Do Projeto

## Visao Geral

O FLASH//VAULT e uma aplicacao estatica de flashcards de ingles. Funciona abrindo `index.html` diretamente no navegador, sem servidor, banco de dados, login ou processo de build.

A manutencao e simples para um projeto estatico pequeno ou medio. Os dados ficam no `app.js`, a estrutura fica no `index.html` e o visual fica no `styles.css`.

## Como Adicionar Flashcards

Abra `app.js` e localize o array `FLASHCARDS`, no inicio do arquivo. Acrescente um novo objeto antes do fechamento do array:

```js
{
  word: 'learn',
  translation: 'aprender',
  theme: 'Verbos'
},
```

Ou em uma linha:

```js
{ word: 'book', translation: 'livro', theme: 'Substantivos' },
```

Depois de salvar e atualizar a pagina:

- O novo card aparece automaticamente.
- Os contadores sao atualizados.
- O tema aparece nos filtros.
- O card entra na ordem aleatoria.

Nao e necessario alterar o HTML para adicionar cada flashcard.

## Temas Disponiveis

Use exatamente os nomes existentes para evitar temas duplicados:

```text
Substantivos
Adjetivos
Verbos
Pronomes
Adverbios
Preposicoes
Conjuncoes
Determinantes
Numerais
Prefixos
Sufixos
Expressoes Conversacionais
```

Tambem e possivel criar um novo tema. A interface cria os filtros e contadores automaticamente com base nos valores usados nos cards.

## Estrutura Dos Arquivos

### `index.html`

Define a estrutura da tela:

- Cabecalho e status.
- Busca e filtros.
- Flashcard principal.
- Botoes `RANDOM`, `RESET`, `REVISAR` e `DOMINEI`.
- Estatisticas da sessao.

Os flashcards nao ficam escritos individualmente no HTML. O JavaScript preenche a interface.

### `app.js`

Contem os dados e o comportamento da aplicacao.

Principais elementos:

- `FLASHCARDS`: fonte dos cards.
- `state`: estado atual da sessao.
- `filteredCards()`: filtra por tema e busca.
- `shuffled(cards)`: embaralha os cards.
- `studyCards()`: cria e conserva a fila de estudo.
- `update()`: atualiza o conteudo da tela.
- `nextCard()`: avanca para o proximo card.

### `styles.css`

Controla cores, fontes, bordas, sombras, layout e responsividade. O arquivo esta compactado em poucas linhas, portanto pode ser formatado antes de grandes alteracoes visuais.

### `README.md`

Contem a documentacao basica para uso e adicao de cards.

### `README`

Contem a fonte original dos cards em formato SQL. A aplicacao usa os objetos JavaScript do `app.js` como fonte efetiva.

## Fluxo Da Aplicacao

```text
FLASHCARDS
    |
    v
filteredCards()
    |
    v
shuffled()
    |
    v
studyCards()
    |
    v
update()
    |
    v
HTML exibido no navegador
```

- A busca recria a fila de estudo.
- A troca de tema recria a fila.
- `RANDOM` embaralha novamente a fila atual.
- `RESET` zera a sessao e embaralha novamente.
- Clicar no card revela a traducao.
- `DOMINEI` e `REVISAR` avancam para o proximo card.

## Procedimento De Manutencao

1. Abra `index.html` no navegador.
2. Teste busca, filtros, `RANDOM` e `RESET`.
3. Adicione ou altere um card no `app.js`.
4. Atualize a pagina e confirme o resultado.
5. Valide a sintaxe:

```powershell
node --check .\app.js
```

6. Revise as alteracoes:

```powershell
git diff
```

7. Crie um commit descrevendo a mudanca.

## Como Alterar O CSS

As regras visuais ficam no arquivo `styles.css`. O arquivo usa variaveis no bloco `:root`, o que permite alterar a identidade visual em um unico lugar:

```css
:root {
    --void: #100b1c;
    --panel: #171024;
    --purple: #9c5bff;
    --yellow: #f4d35e;
    --cyan: #64e4e8;
    --green: #78e08f;
    --red: #ff7183;
    --text: #f3effa;
}
```

Para trocar as cores principais, altere os valores dessas variaveis. Por exemplo:

```css
--yellow: #ffd166;
--cyan: #06d6a0;
```

Principais seletores:

- `.topbar`: cabecalho.
- `.brand`: logo.
- `.panel`: paineis escuros e bordas.
- `.flashcard`: cartao principal.
- `.action-button`: botoes `REVISAR` e `DOMINEI`.
- `.filter-button`: filtros de tema.
- `.icon-button`: botoes `RANDOM` e `RESET`.
- `.study-panel`: area de estudo.
- `footer`: rodape.

Para alterar o tamanho do cartao, procure por `.flashcard`. Para alterar a fonte, procure pelas propriedades `font-family` ou pelas fontes importadas no inicio do arquivo.

### Responsividade

As regras iniciadas por `@media` controlam telas menores:

```css
@media (max-width: 760px) {
    /* ajustes para tablets e celulares */
}

@media (max-width: 460px) {
    /* ajustes para celulares pequenos */
}
```

Depois de alterar o CSS:

1. Salve o arquivo.
2. Atualize o `index.html` no navegador.
3. Teste uma tela grande e uma tela estreita.
4. Confira se textos, botoes e cards nao ficaram sobrepostos.
5. Revise a alteracao com `git diff`.

## Limites Atuais

- Os dados e a logica estao concentrados no `app.js`.
- O `styles.css` esta compactado e e menos confortavel para editar.
- Nao existem testes automatizados.
- O progresso da sessao nao e salvo depois que a pagina e fechada.
- As fontes visuais sao carregadas do Google Fonts quando existe internet.

## Melhorias Futuras

- Separar os dados em um arquivo proprio, como `flashcards.js`.
- Formatar o `styles.css`.
- Criar testes automatizados.
- Usar `localStorage` para preservar o progresso.
- Separar melhor dados, estado e interface conforme o projeto crescer.

## Conclusao

O projeto e facil de manter em formato estatico. Adicionar novos flashcards exige apenas incluir um objeto no array `FLASHCARDS`. Para uma equipe maior ou uma quantidade muito maior de dados, a primeira melhoria recomendada e separar os cards da logica da aplicacao.
