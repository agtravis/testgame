'use strict';

class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    this.add.text(20, 20, 'Playing Game (yellow)', {
      font: '25px Arial',
      fill: 'yellow'
    });
  }
}
