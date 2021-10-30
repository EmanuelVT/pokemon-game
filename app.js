
//Pokemon Database

var pokemons = [
    {
      id:1,
      name: 'Charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      health:'',
      sprite: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      id:2,
      name: 'Bulbasaur',
      type: 'grass',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      health:'',
      sprite: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    },
    {
      id:3,
      name: 'Squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      health:'',
      sprite: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    }
    
  ]
  
  var attacks = [
    {
      id: 1,
      attack: 'rock'
    },
    {
      id:2,
      attack: 'scissors'
    },
    {
      id:3,
      attack: 'paper'
    }
  ]
  
  // State
  
  var gameState = {
    userPokemon: '',
    rivalPokemon: ''
  }
  
  // Select Screen
  var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character');
  
  
  
  var i = 0;
  while( i < pokemonsEl.length){
      pokemonsEl[i].onclick = function() {
        var pokemonId = this.dataset.pokemon;
  
  
        // Generate User Pokemon
        for (const pokemon of pokemons){
          if (pokemon.id == pokemonId){
            gameState.userPokemon = pokemon;
          }
        }
  
        //Generate Rival Pokemon
  
        function cpuPick(){
          var ranNum
          do{
            ranNum = randomNumber(0,3);
            console.log(ranNum)
          } while (ranNum+1 == gameState.userPokemon.id)
          return pokemonsEl[ranNum].dataset.pokemon;}
       
        var rivalPokemonId = cpuPick();
  
        for (const pokemon of pokemons){
          if (pokemon.id == rivalPokemonId){
            gameState.rivalPokemon = pokemon;
          }
        }
      
      // Load characters to the Battle Screen
  
        document.getElementById("battle-screen").classList.add("active");
        document.querySelector(".player .player1 .stats .name").innerHTML = gameState.userPokemon.name + " Lv" + gameState.userPokemon.level;
        document.querySelector(".player .player1 img").src = gameState.userPokemon.sprite;
  
        document.querySelector(".cpu .player2 .stats .name").innerHTML = gameState.rivalPokemon.name + " Lv" + gameState.rivalPokemon.level;
        document.querySelector(".cpu .player2 img").src = gameState.rivalPokemon.sprite;
  
  
  
        //Calculating health for both pokemons
  
        var calculateHealth = function(user){
          return ((0.20 * Math.sqrt(user.level)) * user.defense) * user.hp
        }
  
  
        gameState.userPokemon.health = calculateHealth(gameState.userPokemon);
        const totalHealthUser = gameState.userPokemon.health;
        gameState.rivalPokemon.health = calculateHealth(gameState.rivalPokemon);
        const totalHealthRival = gameState.rivalPokemon.health;
      
  
  
  
        // user choose attack
  
        var attackBtnsEl =  document.getElementById('battle-screen').querySelectorAll('.attack');
  
        var cpuAttack = function(){
          var attackId = randomNumber(0,4);
          for(const attack of attacks){
            if(attack.id == attackId){
                return attack.attack;
            }
          }
        }
  
        
  
  for (const attackBtn of attackBtnsEl){
    attackBtn.onclick = function(){
      var attackName = this.dataset.attack;
      gameState.currentUserAttack = attackName;
      var rivalAttack = cpuAttack();
      play(attackName, rivalAttack)
    }
  }
  
  
  var gameOver = function(){
    for (const attackBtn of attackBtnsEl){
      attackBtn.onclick = '';
      }
    }
  
  
  
  var attackDamage = function(attack, level, stack, critical, enemy, attacker){
    console.log( enemy.name + " health before" + enemy.health)
    var attackAmount =  ((attack * level) * (stack * critical))
    enemy.health -= attackAmount;
    console.log(enemy.name + " health after" + enemy.health)
    checkWinner(enemy.health, attacker)
  }
  
  var userPokemon = gameState.userPokemon;
  var rivalPokemon = gameState.rivalPokemon;
  
  var checkWinner = function(enemyhealth, attacker){
    if(enemyhealth <= 0){
      console.log(attacker.name + " wins.");
    }
    
  }
  
  var healthDecreases = function(totalHealth, healthRemaining){
        var damageNum = (healthRemaining * 100) / totalHealth;
        var damageStr = damageNum.toString();
        damageStr = damageStr+"%"
        console.log(damageStr)
        return damageStr;
  }
  
  
  
    
    var play = function(userAttack, rivalAttack){
      switch(userAttack){
        case 'rock':
          if(rivalAttack == 'paper'){
            attackDamage(rivalPokemon.attack, rivalPokemon.level, .8, 3, userPokemon, rivalPokemon )
            document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthUser, userPokemon.health);
  
            if(userPokemon.health <= 0){
              console.log("You lost")
              document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You lose"
              gameOver();
            } else{
              console.log(rivalAttack)
              console.log("You were attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". Rival attacks"
            }
            
          }else if(rivalAttack == 'scissors'){
            attackDamage(userPokemon.attack, userPokemon.level, .8, 3, rivalPokemon, userPokemon )
            document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthRival, rivalPokemon.health);
            if(rivalPokemon.health <= 0){
              console.log("You won")
              document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You win"
              gameOver();
            } else{
              console.log(userAttack)
              console.log("You attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". You attack"
            }
          }else {
            console.log("It's a draw")
            console.log(rivalAttack);
            document.querySelector(".fightStats").innerText = "Draw"
          }
          break;
        case 'paper':
          if(rivalAttack == 'rock'){
            attackDamage(userPokemon.attack, userPokemon.level, .8, 3, rivalPokemon, userPokemon )
            document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthRival, rivalPokemon.health);
            if(rivalPokemon.health <= 0){
              console.log("You won")
              document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You win"
              gameOver();
            } else{
              console.log(userAttack)
              console.log("You attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". You attack"
            }
          }else if(rivalAttack == 'scissors'){
            attackDamage(rivalPokemon.attack, rivalPokemon.level, .8, 3, userPokemon, rivalPokemon )
            document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthUser, userPokemon.health);
            if(userPokemon.health <= 0){
              console.log("You lost")
              document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You lose"
              gameOver();
            } else{
              console.log(rivalAttack)
              console.log("You were attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". Rival attacks"
            }
          }else {
            console.log("It's a draw")
            console.log(rivalAttack);
            document.querySelector(".fightStats").innerText = "Draw"
          }
          break;
        case 'scissors':
          if(rivalAttack == 'rock'){
            attackDamage(rivalPokemon.attack, rivalPokemon.level, .8, 3, userPokemon, rivalPokemon )
            document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthUser, userPokemon.health);
            if(userPokemon.health <= 0){
              console.log("You lost")
              document.querySelector(".player .player1 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You lose"
              gameOver();
            } else{
              console.log(rivalAttack)
              console.log("You were attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". Rival attacks"
            }
          }else if(rivalAttack == 'paper'){
            attackDamage(userPokemon.attack, userPokemon.level, .8, 3, rivalPokemon, userPokemon )
            document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = healthDecreases(totalHealthRival, rivalPokemon.health);
            if(rivalPokemon.health <= 0){
              console.log("You won")
              document.querySelector(".cpu .player2 .stats .health .health-bar .inside").style.width = "0%"
              document.querySelector(".finalStats").innerText = "You win"
              gameOver();
            } else{
              console.log(userAttack)
              console.log("You attacked");
              document.querySelector(".fightStats").innerText = "You chose "+userAttack + ". Rival chose " + rivalAttack +  ". You attack"
            }
          }else {
            console.log("It's a draw")
            console.log(rivalAttack);
            document.querySelector(".fightStats").innerText = "Draw"
          }
          break;
      }
  
    }
      
  }
  i++
  }
  
  
  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }
  