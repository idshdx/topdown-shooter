// import Phaser from 'phaser'

// export default class extends Phaser.Sprite {
//   constructor ({ game, x, y, asset }) {
//     super(game, x, y, asset)
//     this.anchor.setTo(0.5)
//   }

//   update () {
//     if (this.game.input.activePointer.isDown) {
//       this.fire()
//     }
//   }
//   fire () {
//     let fireRate = 100
//     let nextFire = 0
//     if (this.game.time.now > nextFire && this.countDead() > 0) {
//       nextFire = this.game.time.now + fireRate

//       var bullet = this.getFirstDead()

//       bullet.reset(this.x - 8, this.y - 8)

//       this.game.physics.arcade.moveToPointer(bullet, 300)
//     }
//   }
// }
