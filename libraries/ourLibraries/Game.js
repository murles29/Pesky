//Aliases
// add the aliases for different pixi objects
// var Container = PIXI.Container,
//   autoDetectRenderer = PIXI.autoDetectRenderer,
//   loader = PIXI.loader,
//   resources = PIXI.loader.resources,
//   TextureCache = PIXI.utils.TextureCache,
//   Texture = PIXI.Texture,
//   Sprite = PIXI.Sprite,
//   MovieClip = PIXI.extras.MovieClip;
//
//
// //create the stage container
// var stage,
//   renderer = autoDetectRenderer(1000, 1000);
// document.body.appendChild(renderer.view);

//instantiate variables for the different scenes
// Liable to change depening on how many houses there are
var map = new Container(),
  house = new Container(),
  sewer = new Container();



//scale the stage to the size of the browser window
var scale = scaleToWindow(renderer.view);


//instantiate the loader
loader
  .add('images/AnimalPlaceHolder.png')
  .add('images/BackGround.png')
  .add('images/HouseBackground.png')
  .add('images/HouseOutside.png')
  .add('images/ACPH.png')
  .load(setup);

//set the game state to use the play function
// state can be used to assign many different things such as pause,
// main menu, and game loss for example
var state = play;


//instantiate global variables that will be used in setup function and in
// other locations
var animalObject, wTexture, tinkPoint, b, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door;

function setup() {
  b = new Bump(PIXI);
  //add the ability to add mouse/input events
  tinkPoint = new Tink(PIXI, renderer.view, scale);

  //create the background texture from the cache
  wTexture = TextureCache['images/BackGround.png'];
  houseBackgroundTexture1 = TextureCache['images/HouseBackground.png'];
  houseOutsideTexture1 = TextureCache['images/HouseOutside.png'];
  doorText = TextureCache['images/AnimalPlaceHolder.png'];


  //create the background sprite out of the texture
  whiteFloor = new Sprite(wTexture);
  houseBackground1 = new Sprite(houseBackgroundTexture1);
  houseOutside1 = new Sprite(houseOutsideTexture1);
  door = new Sprite(doorText);
  animalAnimated = new SpriteUtilities(PIXI);


  //TODO shift from basic Sprite Object TO an animated sprite Object
  // Maybe extend a class or look at API for pixi and Animations

  //create the animal object and its texture from the cache
  animalObjectTexture = TextureCache['images/AnimalPlaceHolder.png'];
  animalObject = new Sprite(animalObjectTexture);

  //call the function to build the outside map
  buildOutside();

  //calls function that designates what each key does when it is pressed
  Keys();

  //calls the game loop that runs the game logic
  gameLoop();
}

function jump() {
  //start the player jump
  if (!player.jumping && player.spacePush) {
    player.jumping = true;
    animalObject.vy = -10;

  }

  //make sure there is no double jump
  if (player.sprite.y >= player.lowestHeight) {
    player.jumping = false;
    player.spacePush = false;
  }

  //stop from falling too far
  if (player.sprite.y >= player.lowestHeight) {
    player.sprite.y = player.lowestHeight;
  }
}

//build the inside of a house
function enterHouse() {
  door.x = 800;
  door.y = 700;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
  stage = house;
}

//builds the outside game map
function buildOutside() {

  //TODO create function that generates unlimited background
  // with different background objects, or use tiling software
  // whichever is the easier of the two

  //create the object that represents the player
  player = {
    sprite : animalObject,
    jumping : false,
    jumpHeight : 350,
    spacePush : false,
    lowestHeight : 700
  };

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 700;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  spawnAnimalControl();
  map.addChild(player.sprite);
  //map.addChild(houseOutside1);

  stage = map;
}

//variables for animal control
// TODO these will be likely to change, Just are placeholders
var aCTexture, aCObject;

function spawnAnimalControl() {
  aCTexture = TextureCache['images/ACPH.png'];
  aCObject = new Sprite(aCTexture);

  aCObject.x = 500;
  aCObject.y = 700;

  aCObject.vx = 0;
  aCObject.vy = 0;

  map.addChild(aCObject);
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}


function play() {
  //add x velocity to player's x location
  animalObject.x += animalObject.vx;

  //checks when to apply gravity to the player object
  if (!(player.sprite.y > player.lowestHeight)) {
    player.sprite.vy += 0.3;
  }

  //checkes when to add the y velocity to the player object
  // TODO change this when we add floors/platforms to jump on
  if (!(player.sprite.y > player.lowestHeight) && !player.jumping) {
    animalObject.y += animalObject.vy;
  }

  //add x and y velocities to the animal control object
  aCObject.x += aCObject.vx;
  aCObject.y += aCObject.vy;

  //call functions for player and ai logic
  jump();
  aiMovemnt();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  tinkPoint.update();
  renderer.render(stage);
}