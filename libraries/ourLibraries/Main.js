var g = hexi(1280, 720, setupGame);
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  MovieClip = PIXI.extras.MovieClip;
const WIDTH = 1280, HEIGHT = 720;
var renderer = new PIXI.autoDetectRenderer(1280, 720);
var b = new Bump(PIXI);
//add the ability to add mouse/input events
var tinkPoint = new Tink(PIXI, renderer.view);
g.start();

function setupGame() {
  g.scaleToWindow();
  g.state = menuState;
  animalAnimated = new SpriteUtilities(PIXI);
  var animalObject = new spriteCreator('../../images/CarlosWalkCycle.png', 55, 45);

  //
  loader
    .add('../../images/AnimalPlaceHolder.png')
    .add('../../images/BackGround.png')
    .add('../../images/HouseBackground.png')
    .add('../../images/HouseOutside.png')
    .add('../../images/ACPH.png')
    .add('../../images/CarlosWalkCycle.png')
    .add('../../images/animal_control.png');
  $(document).ready(function() {
    //loader.load(setup);
  });

  //calls function that designates what each key does when it is pressed
  Keys();
}
// Game loops dependent on state
function menuState() {
  g.scaleToWindow();
  hideAll();
  mainMenuGroup.visible = true;
}
function gameState() {
  g.scaleToWindow();
  hideAll();
  gameGroup.visible = true;
}
function optionsState() {
  g.scaleToWindow();
  hideAll();
  optionsGroup.visible = true;
}
function creditsState() {
  g.scaleToWindow();
  hideAll();
  creditsGroup.visible = true;
  credits.y -= 2;
}
function tutorialState() {
  g.scaleToWindow();
  hideAll();
  tutorialGroup.visible = true;
}

function switchCharacterState() {
  g.scaleToWindow();
  hideAll();
  switchCharacterGroup.visible = true;
}
function play() {
  g.scaleToWindow();
  hideAll();
  gameObjects.visible = true;

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
  animalCont1.aiMovement();
  tinkPoint.update();
}

// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}
