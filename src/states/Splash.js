import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    // load your assets
    this.load.image('tree', './assets/images/topdown-shooter/PNG/Tiles/tile_130.png')
    this.load.image('enemy', './assets/images/topdown-shooter/PNG/Survivor/survivor1_stand.png')
    this.load.image('character', './assets/images/topdown-shooter/PNG/Survivor/survivor1_machine.png')
    this.load.image('bullet', 'assets/images/bullets/bullet4.png')
    this.load.image('wasd', 'assets/images/wasd.png')
    this.load.image('os', 'assets/images/penisCartoon.jpg')

    this.game.load.tilemap('MyTilemap', './assets/images/topdown-shooter/maptest.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('tiles', './assets/images/topdown-shooter/Tilesheet/tilesheet_complete_2X.png')

    game.load.audio('bulletShot', './assets/audio/bulletShot.wav')
    game.load.audio('grassWalk', './assets/audio/grassWalk.wav')
    game.load.audio('intro', './assets/audio/intro-awful.wav')
    game.load.audio('scream', './assets/audio/scream.wav')
    game.load.audio('woodHit', './assets/audio/woodHit.wav')
    game.load.audio('wasd', './assets/audio/wasd.m4a')
    game.load.audio('bravo', './assets/audio/bravo.wav')
    game.load.audio('stopShoting', './assets/audio/stopShoting.wav')
  }

  create () {
    this.state.start('Game')
  }
}
