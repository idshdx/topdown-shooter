import Phaser from 'phaser'
import * as _ from 'lodash'
import {Keymap, ACTIONS, defaultKeymap} from '../models/Keymap'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(1, 'bullet') // Find another way
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('outOfBoundsKill', true)
    this.bullets.setAll('scale.x', 0.01)
    this.bullets.setAll('scale.y', 0.01)

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.myMap = new Keymap(this.game.input.keyboard, defaultKeymap)

    this.walk = game.add.audio('grassWalk')
    this.bulletShot = game.add.audio('bulletShot')
  }
  update () {
    this.rotation = this.game.physics.arcade.angleToPointer(this)
    if (this.myMap.isDown(ACTIONS.UP)) {
      this.y -= 5
      this.walk.play('',0,1,false, false)
    } else if (this.myMap.isDown(ACTIONS.DOWN)) {
      this.y += 5
      this.walk.play('',0,1,false, false)
    } else if (this.myMap.isDown(ACTIONS.LEFT)) {
      this.x -= 5
      this.walk.play('',0,1,false, false)
    } else if (this.myMap.isDown(ACTIONS.RIGHT)) {
      this.x += 5
      this.walk.play('',0,1,false, false)
    }
    if (this.game.input.activePointer.isDown) {
      this.fire()
    }
  }
  fire () {
    // Find another way
    let fireRate = 100
    let nextFire = 0
    if (this.game.time.now > nextFire && this.bullets.countDead() > 0) {
      nextFire = this.game.time.now + fireRate

      var bullet = this.bullets.getFirstDead()

      bullet.reset(this.x, this.y)
      this.game.physics.arcade.moveToPointer(bullet, 700)
      this.bulletShot.play()
    }
  }
}
