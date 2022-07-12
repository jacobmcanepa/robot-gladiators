var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Fagbot", "Jewbot", "Nigbot"];
var enemyHealth = 50;
var enemyAttack = 12;

// Game States
// 'WIN' - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// 'LOSE' - Player robot's health is zero or less

var fight = function(enemyName) {
  // repeat and execute as long as the enemy is alive
  while(enemyHealth > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "fight" || promptFight === "FIGHT") {
      //player attack
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining." 
      );
  
      //check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
      }
      else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
  
      // enemy attack
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
      }
      else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    }
  
    else if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money for skipping
        playerMoney = playerMoney - 2;
      }
  
      //if no (false), ask question again by running fight() again
      else {
        fight();
      }
    }
  
    else {
      window.alert("You need to choose a valid option. Try again!")
    }
  }
};

// goes through enemyNames array one at a time until array ends
for(var i = 0; i < enemyNames.length; i++) {
  var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}