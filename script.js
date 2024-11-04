const balere = "balere.png";
const cardValues = [balere, balere, "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
    const grid = document.getElementById('grid');
    const restartButton = document.createElement('button');
    restartButton.textContent = "Recomeçar";

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
      const shuffledCards = shuffle(cardValues);
      shuffledCards.forEach((value) => {
        const card = document.createElement('img');
        card.classList.add('card');
        card.src = `./images/${card.value}`;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      });
    }

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flipped');

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      checkMatch();
    }

    function checkMatch() {
      const isMatch = firstCard.textContent === secondCard.textContent;

      if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
        resetCards();
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 1000);
      }
    }

    function resetCards() {
      if (!firstCard && !secondCard) {
        restartButton.addEventListener('click', resetGame);
        grid.appendChild(restartButton);
      }
    }

    function resetGame() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
      grid.innerHTML = '';
      createBoard();
    }

    createBoard();
