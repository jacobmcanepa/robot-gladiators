
// Game States
// 'WIN' - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// 'LOSE' - Player robot's health is zero or less

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip()
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

  // conditional recursive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      return true;
    }
  }
  else {
    return false;
  }
}

var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// function to start the game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // goes through array one at a time until array ends
  for(var i = 0; i < enemyInfo.length; i++) {

    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // picked new enemy to fight based on the index of the   array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over; visit the store before next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      } 
    }

    else {
      window.alert("You have lost your robot in battle! Game over!");
      break;
    }
  }

  endGame();

};

var endGame = function() {
  window.alert("The game has ended. Let's see how you did!")

  // if player is still alive, compare high score
  if (playerInfo.health > 0) {
    var highScore = localStorage.getItem("highscore");
    var topPlayer = localStorage.getItem("top-player");

    if (highScore === null) {
      highScore = 0;
    }

    if (topPlayer === null) {
      topPlayer = "N/A";
    }

    if (playerInfo.money > highScore) {
      sessionStorage.setItem("lastscore", highScore);
      sessionStorage.setItem("lastplayer", topPlayer);

      var lastScore = sessionStorage.getItem("lastscore");
      var lastPlayer = sessionStorage.getItem("lastplayer");

      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("top-player", playerInfo.name);

      alert(playerInfo.name + " has beaten " + lastPlayer + "'s score of " + lastScore + "! " + playerInfo.name + " now has the high score of " + playerInfo.money);
    }

    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
  }
  else {
    window.alert("You've lost your robot in battle. Game over!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart game
    startGame();
  }

  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // ask the player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action 
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    
    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");

      // do nothing so the function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() to force player to pick valid option
      shop();
      break;
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to set name 
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  return name;
};

var playerInfo = {

  name: getPlayerName(),

  health: 100,
  attack: 10,
  money: 10,

  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },

  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 credits.");
      this.health += 25;
      this.money -= 5;
    }

    else {
      window.alert("You don't have enough money!");
    }
  },

  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 credits.");
      this.attack += 6;
      this.money -= 7;
    }

    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Lobot",
    attack: randomNumber(8, 11)
  },
  {
    name: "Rosie",
    attack: randomNumber(10, 14)
  },
  {
    name: "Droideka",
    attack: randomNumber(11, 16)
  }
];

// starts game when page loads
startGame();