'use strict';

class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    this.lives = 3;
    //this.background = this.add.image(0, 0, 'background');
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      'background'
    );
    this.background.setOrigin(0, 0);
    // this.add.text(20, 20, 'Playing game', {
    //   font: '25px Arial',
    //   fill: 'yellow'
    // });
    // this.ship1 = this.add.image(
    //   config.width / 2 - 50,
    //   config.height / 2,
    //   'ship'
    // );
    // this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
    // this.ship3 = this.add.image(
    //   config.width / 2 + 50,
    //   config.height / 2,
    //   'ship3'
    // );
    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      'ship'
    );
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.height / 2,
      'ship3'
    );

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.powerUps = this.physics.add.group();

    const maxObjects = 4;
    for (let i = 0; i <= maxObjects; ++i) {
      const powerUp = this.physics.add.sprite(16, 16, 'power-up');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
      if (Math.random() > 0.5) {
        powerUp.play('red');
      } else {
        powerUp.play('gray');
      }
      powerUp.setVelocity(Math.random() * 100, Math.random() * 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      'player'
    );
    this.player.play('thrust');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(
      projectile,
      powerUp
    ) {
      projectile.destroy();
    });
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );

    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE ', 16);
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.lives += 1;
  }

  hurtPlayer(player, enemy) {
    this.resetShipPos(enemy);
    if (this.player.alpha < 1) {
      return;
    }
    this.lives -= 1;
    const explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);
    // this.resetPlayer();
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });
  }

  resetPlayer() {
    if (this.lives > 0) {
      const x = config.width / 2 - 8;
      const y = config.height;
      this.player.enableBody(true, x, y, true, true);
      this.player.alpha = 0.5;
      this.startTween();
    } else {
      this.scene.start('endGame');
    }
  }

  startTween() {
    const tween = this.tweens.add({
      targets: this.player,
      y: config.height - 100,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: this.resetTween,
      callbackScope: this
    });
  }

  resetTween() {
    const tween2 = this.tweens.add({
      targets: this.player,
      y: config.height - 32,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function() {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }

  hitEnemy(projectile, enemy) {
    const explosion = new Explosion(this, enemy.x, enemy.y);
    projectile.destroy();
    this.resetShipPos(enemy);
    this.score += 15;
    const scoreFormatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = `SCORE ${scoreFormatted}`;
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    const randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam();
      }
    }
    for (let i = 0; i < this.projectiles.getChildren().length; ++i) {
      const beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  shootBeam() {
    const beam = new Beam(this);
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = '0' + stringNumber;
    }
    return stringNumber;
  }
}
