import * as _ from 'lodash'
import Phaser from 'phaser'

// Define your actions
export const ACTIONS = {
  LEFT: 1,
  UP: 2,
  RIGHT: 3,
  DOWN: 4,
  ATTACK: 5,
  BASIC_ATTACK: 6
}
  // Define your keymap, as many keys per action as we want
export const defaultKeymap = {
  [ACTIONS.LEFT]:  [Phaser.KeyCode.A, Phaser.KeyCode.LEFT],
  [ACTIONS.UP]:    [Phaser.KeyCode.W, Phaser.KeyCode.UP],
  [ACTIONS.RIGHT]: [Phaser.KeyCode.D, Phaser.KeyCode.RIGHT],
  [ACTIONS.DOWN]:  [Phaser.KeyCode.S, Phaser.KeyCode.DOWN],
  [ACTIONS.BASIC_ATTACK]: Phaser.KeyCode.CONTROL
  }
// Create Keymap class
export var Keymap = function(keyboard) {
  this.map = {}
  var self = this
  _.forEach(defaultKeymap, function(KeyCode, action) {
      self.map[action] = [];
      if(_.isArray(KeyCode)) {
        _.forEach(KeyCode, (code) => {
            self.map[action].push(keyboard.addKey(code));
        })
      } else {
       self.map[action].push(keyboard.addKey(KeyCode));
      }
    })
}

Keymap.prototype.isDown = function(action) {
  for(let i = 0, length = this.map[action].length; i < length; i++ ) {
    if(this.map[action][i].isDown) {
      return true
    }
  }
  return false
}
