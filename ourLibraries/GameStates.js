// All game loop functions/states go here to help declutter Main.js
function menuState() {
  g.stage.position.x = 0;
  g.stage.position.y = 0;
  g.stage.scale.x = 1;
  g.stage.scale.y = 1;
  g.stage.pivot.x = 0.5;
  g.stage.pivot.y = 0;
  hideAll();
  backgroundGroup.visible = true;
  title.position.x = 20;
  updateFps();
  mainMenuGroup.visible = true;
}
function optionsState() {
  updateFps();
}
function creditsState() {
  updateFps();
  credits.y -= 3 * 60 / fps;
}
function tutorialState() {
  updateFps();
}
function switchCharacterState() {
  updateFps();
}
function moveIntoHedgeState() { // freeze the game and move player into hedge
  updateFps();
  updateAI();
  if (player.sprite.y > hedgeLocY + 150) {
    player.sprite.y += -1 * 60 / fps;
  } else {
    initCharacterSwitch();
    hideAll();
    switchCharacterGroup.visible = true;
    g.state = switchCharacterState;
  }
}
function moveFromHedgeState() {
  updateFps();
  updateAI();
  if (player.sprite.y < 600) {
    player.sprite.y += 60 / fps;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
    g.state = play;
  }
}
function caughtState() {
  updateFps();
  updateAI();
  if (animalCont1.aCObject.x >= player.holdX + 250) {
    animalCont1.aCObject._texture = animalControlSprite._texture;
    animalCont1.aCObject._textures = animalControlSprite._textures;
    if (skunkAlive || raccoonAlive || gooseAlive) {
      initCharacterSwitch();
      hideAll();
      switchCharacterGroup.visible = true;
      g.state = switchCharacterState;
    } else { // all animals are captured
      blackOverlay.x = player.sprite.x - 200;
      blackOverlay.y = 0;
      if (blackOverlay.alpha < 1) {
        blackOverlay.alpha += 0.01 * 60 / fps;
      } else {
        gameOverText.x = player.sprite.x - 100;
        gameOverText.y = 470;
        g.state = gameOverState;
      }
    }
  } else {
    animalCont1.aCObject.x += 60 / fps;
  }
}
function gameOverState() {
  if (gameOverText.alpha < 1) {
    gameOverText.alpha += 0.005 * 60 / fps;
  }
}
function play() {
  //call functions for player and ai logic
  updateAI();
  player.update();
  jump();
  if (!player.inHouse) { // prevent being captured by invisible animal control
    animalCont1.aiMovement();
  }
  updateFps();
}
