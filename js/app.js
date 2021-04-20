let timer;
let count;

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

  age() {
    this.age++;
  }
  
  increaseAll() {
    this.hunger++;
    this.sleepiness++;
    this.boredom++;
  }
}



class Game {
  constructor(providedPet) {
    this.timer;
    this.count = 0;
    this.pet = providedPet;
  }
  
  increaseCount() {
    this.count++;
  }
  
  renderStats() {
    $('#timer').text(`Timer ${this.count}`);
    $('#hunger').text(`Hunger: ${this.pet.hunger}`);
    $('#sleepiness').text(`Sleepiness: ${this.pet.sleepiness}`);
    $('#boredom').text(`Boredom: ${this.pet.boredom}`);
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

  displayPet() {
    $('#start').remove();
    $('#pet-area').append('<div id="pet" class="pet" />')
  }

  startGame() {
    this.addGameListeners();
    this.displayPet();

    this.timer = setInterval(() => {
      this.pet.increaseAll();
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