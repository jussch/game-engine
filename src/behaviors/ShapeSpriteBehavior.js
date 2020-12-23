/**
 * Created by Justin on 2020-12-22.
 */
import Behavior from '../classes/Behavior';
import * as PIXI from 'pixi.js';

export default class ShapeSpriteBehavior extends Behavior {
  type = 'rectangle';
  color = 0xDE3249;
  anchor = { x: 0.5, y: 0.5 }
  size = { x: 100, y: 100 }

  initialize() {
    const scale = this.gameObject.scale;
    const sizeScale = { x: this.size.x * scale.x, y: this.size.y * scale.y };
    const pos = { x: -sizeScale.x * this.anchor.x, y: -sizeScale.y * this.anchor.y };
    this.sprite = new PIXI.Graphics();
    this.sprite.beginFill(this.color);
    this.sprite.drawRect(pos.x, pos.y, sizeScale.x, sizeScale.y);
    this.sprite.endFill();

    this.gameObject.container.addChild(this.sprite);
  }
}
