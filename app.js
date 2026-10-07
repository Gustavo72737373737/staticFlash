/* DADOS ESTATICOS: adicione novos objetos seguindo este formato. */
const FLASHCARDS = [
  { word: 'time', translation: 'tempo', theme: 'Substantivos' },
  { word: 'person', translation: 'pessoa', theme: 'Substantivos' },
  { word: 'world', translation: 'mundo', theme: 'Substantivos' },
  { word: 'house', translation: 'casa', theme: 'Substantivos' },
  { word: 'friend', translation: 'amigo', theme: 'Substantivos' },
  { word: 'system', translation: 'sistema', theme: 'Substantivos' },
  { word: 'good', translation: 'bom', theme: 'Adjetivos' },
  { word: 'strong', translation: 'forte', theme: 'Adjetivos' },
  { word: 'clear', translation: 'claro', theme: 'Adjetivos' },
  { word: 'happy', translation: 'feliz', theme: 'Adjetivos' },
  { word: 'be', translation: 'ser, estar', theme: 'Verbos' },
  { word: 'go', translation: 'ir', theme: 'Verbos' },
  { word: 'make', translation: 'fazer', theme: 'Verbos' },
  { word: 'know', translation: 'saber, conhecer', theme: 'Verbos' },
  { word: 'help', translation: 'ajudar', theme: 'Verbos' },
  { word: 'write', translation: 'escrever', theme: 'Verbos' },
  { word: 'I', translation: 'eu', theme: 'Pronomes' },
  { word: 'you', translation: 'você', theme: 'Pronomes' },
  { word: 'they', translation: 'eles, elas', theme: 'Pronomes' },
  { word: 'my', translation: 'meu, minha', theme: 'Pronomes' },
  { word: 'very', translation: 'muito', theme: 'Advérbios' },
  { word: 'really', translation: 'realmente', theme: 'Advérbios' },
  { word: 'and', translation: 'e', theme: 'Conjunções' },
  { word: 'but', translation: 'mas', theme: 'Conjunções' }
];

const state = { theme: 'all', search: '', index: 0, flipped: false, known: 0, again: 0 };
const $ = (selector) => document.querySelector(selector);
const filteredCards = () => FLASHCARDS.filter((card) => (state.theme === 'all' || card.theme === state.theme) && `${card.word} ${card.translation}`.toLowerCase().includes(state.search.toLowerCase()));

function renderThemes() {
  const themes = [...new Set(FLASHCARDS.map((card) => card.theme))];
  $('#themeList').innerHTML = themes.map((theme) => `<button class="theme-item" data-theme="${theme}" type="button">└ ${theme} <span>${FLASHCARDS.filter((card) => card.theme === theme).length}</span></button>`).join('');
  $('#filterRow').innerHTML = ['all', ...themes].map((theme) => `<button class="filter-button ${theme === 'all' ? 'active' : ''}" data-theme="${theme}" type="button">${theme === 'all' ? 'TODOS OS TEMAS' : theme}</button>`).join('');
  document.querySelectorAll('[data-theme]').forEach((button) => button.addEventListener('click', () => { state.theme = button.dataset.theme; state.index = 0; update(); }));
}

function update() {
  const cards = filteredCards();
  if (!cards.length) { $('#cardWord').textContent = 'VAZIO'; $('#cardHint').textContent = 'NENHUM REGISTRO ENCONTRADO'; $('#resultCount').textContent = '00'; return; }
  state.index = Math.min(state.index, cards.length - 1);
  const card = cards[state.index];
  $('#cardWord').textContent = state.flipped ? card.translation.toUpperCase() : card.word.toUpperCase();
  $('#faceLabel').textContent = state.flipped ? 'VERSO // PORTUGUÊS' : 'FRENTE // INGLÊS';
  $('#cardHint').innerHTML = state.flipped ? 'CLIQUE PARA VOLTAR À FRENTE <b>↗</b>' : 'CLIQUE PARA REVELAR A TRADUÇÃO <b>↗</b>';
  $('#cardTag').textContent = card.theme;
  $('#cardPosition').textContent = `${String(state.index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  $('#resultCount').textContent = String(cards.length).padStart(2, '0');
  $('#allCount').textContent = String(FLASHCARDS.length).padStart(2, '0');
  $('#progressBar').style.width = `${((state.index + 1) / cards.length) * 100}%`;
  document.querySelectorAll('[data-theme]').forEach((button) => button.classList.toggle('active', button.dataset.theme === state.theme));
  $('#knownCount').textContent = String(state.known).padStart(2, '0');
  $('#againCount').textContent = String(state.again).padStart(2, '0');
  const total = state.known + state.again;
  $('#accuracy').textContent = total ? `${Math.round((state.known / total) * 100)}%` : '--%';
}

function nextCard(result) { if (result === 'known') state.known += 1; if (result === 'again') state.again += 1; state.index = (state.index + 1) % Math.max(filteredCards().length, 1); state.flipped = false; update(); }
$('#flashcard').addEventListener('click', () => { state.flipped = !state.flipped; update(); });
$('#knownButton').addEventListener('click', () => nextCard('known'));
$('#againButton').addEventListener('click', () => nextCard('again'));
$('#searchInput').addEventListener('input', (event) => { state.search = event.target.value; state.index = 0; state.flipped = false; update(); });
$('#resetButton').addEventListener('click', () => { state.index = 0; state.flipped = false; state.known = 0; state.again = 0; state.search = ''; $('#searchInput').value = ''; update(); });
document.addEventListener('keydown', (event) => { if (event.code === 'Space') { event.preventDefault(); $('#flashcard').click(); } if (event.key === 'ArrowRight') nextCard(); });
function tick() { $('#clock').textContent = new Date().toLocaleTimeString('pt-BR', { hour12: false }); }
renderThemes(); update(); tick(); setInterval(tick, 1000);
