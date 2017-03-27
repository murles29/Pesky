//Load the music
sounds.load([
  "../sound/music/GameMusic.wav",
  "../sound/music/MenuMusic.wav"
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {

//Create the sounds
var gameMusic = sounds["../sound/music/GameMusic.wav"],
    menuMusic = sounds["../sound/music/MenuMusic.wav"],
    jump = sounds["../sound/music/jump.wav"];

  //Make the music loop
  gameMusic.loop = true;
  menuMusic.loop = true;

  //Set the music volume
  gameMusic.volume = 0.7;
  menuMusic.volume = 0.7;

  //Capture the keyboard events
  var b = keyboard(66),
    c = keyboard(67),
    d = keyboard(68),
    space = keyboard(32);

  //Control the sounds based on which keys are pressed

  //Play the loaded music sound
  b.press = function() {
    if (!gameMusic.playing) {
      gameMusic.play();
    }
    console.log('music playing');
  };

  //Pause the music
  c.press = function() {
    gameMusic.pause();
    console.log('music paused');
  };

  //Restart the music
  d.press = function() {
    gameMusic.restart();
    console.log('music restarted');
  };

  // jump sound
  space.press = function() {
    if (!player.jumping) {
        jump.play();
    }
    console.log("jump");
  }
}
var optionsGroup;
function initOptions() {
  optionsGroup = new PIXI.Container();
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');
  tutorial = new PIXI.Text('just press c to pause music, ignore the button', {font: '50px Arial', fill: 'red'});

  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  optionsGroup.addChild(tutorial);
  optionsGroup.addChild(buttonMute);
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
// add later
}