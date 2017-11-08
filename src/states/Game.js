/* globals __DEV__ */
import Phaser from 'phaser'
import Character from '../sprites/Character'
import Enemy from '../sprites/Enemy'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // Create the title
    const bannerText = 'BEST SHOOTER 2017'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
    
    // Sounds
    this.scream = game.add.audio('scream');
    this.woodHit = game.add.audio('woodHit')
    this.stopShoting = this.game.add.audio('stopShoting')
    this.bravo = this.game.add.audio('bravo')
    // When the game is paused, so its all its sound and physics so we must use vanilla Javascript to play sounds
    this.music = new Audio('./assets/audio/intro-awful.wav')
    this.wasd = new Audio('./assets/audio/wasd.m4a')
    this.wasd.play()

    // Build world
    this.game.world.setBounds(0, 0, 600, 600)
    let map = this.game.add.tilemap('MyTilemap')
    map.addTilesetImage('tiles', 'tiles')

    let layer = map.createLayer('MyTerrain')
    layer.resizeWorld()
    layer.wrap = true
    layer.debug = true

    // Add a tree: TODO make this impassible as the following does not work
    this.tree = this.game.add.sprite(200, 150, 'tree')
    this.game.physics.arcade.enable(this.tree)
    this.tree.body.collideWorldBounds = true
    this.tree.immovable = true
    this.tree.body.moves = false
    this.tree.allowGravity = false
    this.tree.body.gravity.x = 0
    this.tree.body.gravity.y = 0
    this.tree.body.velocity.x = 0
    this.tree.body.velocity.y = 0

    // Add player and enemy
    this.character = new Character({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'character'
    })
    this.enemy = new Enemy({
      game: this.game,
      x: 300,
      y: 100,
      asset: 'enemy'
    })
    this.game.physics.arcade.enable(this.character)
    this.game.physics.arcade.enable(this.enemy)

    this.character.body.collideWorldBounds = true;

    this.game.add.existing(this.character)
    this.game.add.existing(this.enemy)

    // Camera settings
    this.game.camera.follow(this.character)

    // Start the game paused
    this.game.paused = true
    this.game.input.onDown.add(this.unPause, this) // unpause on any action
    this.wasd = this.game.add.sprite(this.world.centerX, this.world.centerY, 'wasd')

    // Game options
    this.hitOnce = false;
    this.win = false;
    this.movementFactor = 1; // used for controlling Ai movement(patrolling)
  }
  unPause () {
    this.game.paused = false
    this.wasd.destroy()
  }
  gofull () {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen()
    } else {
      this.game.scale.startFullScreen(false)
    }
  }
  hitEnemy () {
    this.character.bullets.getFirstAlive().kill()
    if (!this.hitOnce && this.win) {
      this.bravo.play()
      this.bravo.onStop.add(function(){
        this.game.add.sprite(this.world.x, this.world.y, 'os')
      }, this)
      // this.game.destroy()
    } else if (!this.hitOnce) {
      this.scream.play()
      this.movementFactor = 0
      this.enemy.angle = -(this.character.angle)
      this.hitOnce = true
    } else {
      this.stopShoting.play()
      this.hitOnce = false
      this.win = true
    }
  }
  treeOverlapHandler () {
    this.character.bullets.getFirstAlive().kill()
    this.woodHit.play('', 0, 0.1)
  }
  win () {
    this.bravo.play()
    //this.game.destroy()
  }
  update () {
    if (this.game.paused) {
      this.music.loop = true
      this.music.volume = 0.1
      this.music.play()
    } else {
      this.music.pause()
    }
    //  Check collisions
    this.game.physics.arcade.collide(this.character, this.tree)
    this.game.physics.arcade.overlap(this.character.bullets, this.enemy, this.hitEnemy, null, this)
    this.game.physics.arcade.overlap(this.character.bullets, this.tree, this.treeOverlapHandler, null, this)
    // AI movement
    this.enemy.body.velocity.x = this.movementFactor * 80 // left and right movement
    if (this.enemy.x >= 300) {
      this.movementFactor = -1
    }
    if (this.enemy.x <= 200) { //or any other X coordonate
      this.movementFactor = 1
    }

  }
  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.character, 32, 32)
    }
  }
}
