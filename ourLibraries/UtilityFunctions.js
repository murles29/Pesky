//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump if space is pressed and player isn't moving vertically
  if (player.spacePush && (player.sprite.vy == 0 || !player.jumping) && !disableMovement) {
    player.jumping = true;
    player.sprite.vy = -2.51;
    player.sprite._texture = player.spriteArray[2]._texture;
    player.sprite._textures = player.spriteArray[2]._textures;
    jumpSound.play();
    if (!player.canFly) {
      player.sprite.gotoAndStop(0);
    }
    player.sprite.animationSpeed = 0.1;
    player.sprite.play();
  }
  if (player.jumping && player.spacePush && player.canFly && player.sprite.y > 500) {
    player.sprite.vy = -2.51;
    disableAttacking = true;
  } else if (player.canFly && player.spacePush) {
    player.jumping = true;
    player.sprite.vy = 0;
    disableAttacking = true;
  }
  player.lastVy = player.sprite.vy; // track what the player's vy was last frame
}

//build the inside of a house
function enterHouse() {
  player.inHouse = true;

  gameObjects.removeChild(map);
  g.stage.removeChild(gameObjects);
  gameObjects.addChild(house);
  g.stage.addChild(gameObjects);

  //keep track of world coordinates
  player.holdX = player.sprite.x;
  player.holdY = player.sprite.y;

  player.sprite.x = player.inHouseX;
  player.sprite.y = player.inHouseY;

  door.x = player.sprite.x + 70;
  door.y = player.sprite.y - 60;
  interior1.x = player.sprite.x - 200;
  interior1.y = player.sprite.y - 200;
  house.addChild(interior1);
  //house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
}

//builds the outside game map
function buildOutside() {
  player.inHouse = false;

  gameObjects.removeChild(blackOverlay);
  gameObjects.removeChild(gameOverText);
  gameObjects.removeChild(house);
  g.stage.removeChild(gameObjects);

  player.sprite.x = player.holdX;
  player.sprite.y = 600;

  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);


  gameObjects.addChild(map);
  g.stage.addChild(gameObjects);
  gameObjects.addChild(blackOverlay);
  gameObjects.addChild(gameOverText);
}

function camera() {
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  //scale it
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    if (player.sprite.position.x > 12200 || player.sprite.position.x < -11800) {
      if (player.sprite.position.x > 12000) {
        g.stage.pivot.x = 12200;
      } else {
        g.stage.pivot.x = -11800;
      }
    } else {
      g.stage.pivot.x = player.sprite.position.x;
    }

    //g.stage.pivot.y = player.sprite.position.y + 7; // view should include a bit of ground under player
    g.stage.pivot.y = 607; //This can change but doesnt allow the player to see outside of map
  };
}
