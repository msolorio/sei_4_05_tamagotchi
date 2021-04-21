class Tamagotchi {
  constructor(providedPetName) {
    this.petName = providedPetName;
    this.hunger = 0;
    this.sleepiness = 0;
    this.boredom = 0;
    this.age = 0;
  }

  eat() {
    this.hunger && this.hunger--;
  }

  sleep() {
    this.sleepiness && this.sleepiness--;
  }

  play() {
    this.boredom && this.boredom--;
  }

  increaseAge() {
    this.age++;
  }

  checkForAge(time) {
    if (time % 15 === 0 && time > 0) {
      this.increaseAge();
    }
  }
  
  increaseAll() {
    this.hunger++;
    this.sleepiness++;
    this.boredom++;
  }

  display() {
    $('#start').remove();
    // $('#pet-area').append('<div id="pet" class="pet" />')
    $('#pet-area').append('<img src="./images/dog.png" id="pet" class="pet" />')
  }

  animate() {
    console.log('animate pet');
    $('#pet').addClass('animating');
  }
}



class Game {
  constructor(providedPet) {
    this.timer;
    this.count = 0;
    this.pet = providedPet;
    this.gameOver = false;
  }
  
  increaseCount() {
    this.count++;
  }
  
  renderStats() {
    $('#timer').text(`Timer ${this.count}`);
    $('#hunger').text(`Hunger: ${this.pet.hunger}`);
    $('#sleepiness').text(`Sleepiness: ${this.pet.sleepiness}`);
    $('#boredom').text(`Boredom: ${this.pet.boredom}`);
    $('#age').text(`Age: ${this.pet.age}`)
  }

  addFeedListeners() {
    $('#feed').on('click', () => {
      this.pet.eat();
      this.renderStats();
    });
  }

  addLightListeners() {
    $('#lights').on('click', () => {
      this.pet.sleep();
      this.renderStats();
    });
  }

  addPlayListeners() {
    $('#play').on('click', () => {
      this.pet.play();
      this.renderStats();
    });
  }

  addGameListeners() {
    this.addFeedListeners();
    this.addLightListeners();
    this.addPlayListeners();
  }

  checkForGameOver() {
    if (
      this.pet.hunger >= 10
      || this.pet.sleepiness >= 10
      || this.pet.boredom >= 10
    ) {
      this.gameOver = true;
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.timer);
    $('#feed').off();
    $('#lights').off();
    $('#play').off();

    $('#pet-area').text('Game Over');
  }

  startGame() {
    this.addGameListeners();
    this.pet.display();
    this.pet.animate();

    this.timer = setInterval(() => {
      this.pet.increaseAll();
      this.pet.checkForAge(this.count);
      // this.checkForGameOver();
      this.increaseCount();
      this.renderStats();
    }, 1000);
  }
}

// WHEN START BUTTON IS CLICKED
// - CREATE A NEW PET
// - DISPLAY STATS FOR PET
// - DISPLAY PET
// - START TIMER

$('#start').on('click', function() {
  const fido = new Tamagotchi('Fido');
  const game = new Game(fido);

  game.startGame();
});