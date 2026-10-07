# FLASH//VAULT

Flashcards estaticos de ingles em uma interface TUI/RPG futurista. Funciona abrindo `index.html` diretamente no navegador: nao existe servidor, login ou banco de dados.

## Como adicionar cards

Abra `app.js` e acrescente objetos no array `FLASHCARDS`:

```js
{ word: 'learn', translation: 'aprender', theme: 'Verbos' },
```

Use os temas existentes (`Substantivos`, `Adjetivos`, `Verbos`, `Pronomes`, `Adverbios`, `Conjuncoes`) ou crie um novo. A interface cria os filtros e contadores automaticamente.

O README original com os registros em formato SQL foi preservado no historico do projeto. O formato JavaScript acima e a fonte usada pela pagina estatica.

## Controles

- Clique no cartao ou pressione `SPACE` para revelar a resposta.
- Use `DOMINEI` ou `REVISAR` para avancar e atualizar a telemetria da sessao.
- Use a busca e os filtros por tema para montar uma fila de estudo.
- `RESET` reinicia apenas a sessao atual.
