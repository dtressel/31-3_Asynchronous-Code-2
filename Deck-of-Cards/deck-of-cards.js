const newDeckButton = document.getElementById('new-deck-button');
const drawCardButton = document.getElementById('draw-card-button');
const cardPile = document.getElementById('card-pile');

newDeckButton.addEventListener('click', startNewDeck);
drawCardButton.addEventListener('click', drawCard);

let deckId;

async function startNewDeck() {
  try {
    const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    cardPile.textContent = '';
    deckId = res.data.deck_id;
    drawCardButton.classList.remove('visibility-hidden');
  } catch(err) {
    alert(err);
  }
}

async function drawCard() {
  try {
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    if (res.data.remaining == 0) {
      drawCardButton.classList.add('visibility-hidden');
    }
    const newCard = document.createElement('img');
    newCard.setAttribute('src', res.data.cards[0].image);
    newCard.style.zIndex = `${52 - res.data.remaining}`;
    newCard.style.transform = `rotate(${Math.floor((Math.random() * 50) - 25)}deg)`;
    newCard.style.top = `${Math.floor(Math.random() * 40)}px`;
    newCard.style.left = `${Math.floor(Math.random() * 40) - 20}px`;
    cardPile.append(newCard);
  } catch(err) {
    alert(err);
  }
}