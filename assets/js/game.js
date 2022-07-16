
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
  // repeat and execute as long as the enemy is alive
  while(playerInfo.health > 0 && enemy.health > 0) {

    if (fightOrSkip()) {
      // if true, leave fight by breaking loop
      break;
    }

    //player attack
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      
    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining." 
    );
  
    //check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      console.log("player money:", playerInfo.money);
      // leave while loop if enemy is dead
      break;
    }

    else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
  
    // enemy attack
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
      
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
  
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      // leave while loop if enemy is dead
      break;
    }
    else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  } // end of while loop
}; // end of fight function

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

  // if player is still alive, player wins
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
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

  console.log("Your robot's name is ", name);
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
      this.health += 20;
      this.money -= 7;
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
    name: "Fagbot",
    attack: randomNumber(10, 13)
  },
  {
    name: "Jewbot",
    attack: randomNumber(10, 14)
  },
  {
    name: "Nigbot",
    attack: randomNumber(10, 15)
  }
];

// starts game when page loads
startGame();