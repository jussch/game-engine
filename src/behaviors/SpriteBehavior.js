/**
 * Created by Justin on 2020-12-22.
 */
import Behavior from '../classes/Behavior';
import survivor from '../survivor-idle_knife_0.png';
import * as PIXI from 'pixi.js';

export default class SpriteBehavior extends Behavior {
  image = survivor;
  scale = { x: 1, y: 1 };
  position = { x: 0, y: 0 };
  anchor = { x: 0.5, y: 0.5 };

  initialize() {
    const texture = PIXI.Texture.from(this.image);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(this.anchor.x, this.anchor.y);
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.gameObject.container.addChild(this.sprite);
  }
}
