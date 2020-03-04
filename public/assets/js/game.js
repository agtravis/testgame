'use strict';

//an object that 'global' variables can be stored in. Not really global, just accessible anywhere
const gameSettings = {
  playerSpeed: 200
};

const config = {
  //dimensions of canvas
  width: 256,
  height: 272,
  //containing element in the HTML will have this name exactly
  parent: 'GameCanvas',
  backgroundColor: 0x000000,
  //The scenes are the classes created
  scene: [Scene1, Scene2, Scene3],
  pixelArt: true,
  //a physics engine is applied. The Mario Platform game uses 'arcade' also
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

//creates a new instance of the Phaser.Game, feeding the config object
const game = new Phaser.Game(config);
