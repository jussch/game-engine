/**
 * Created by Justin on 2020-12-22.
 */
import Behavior from '../../classes/Behavior';
import * as Input from '../../modules/Input';
import Matter from 'matter-js';
import { getMousePos } from '../../modules/Input';

export default class PlayerBehavior extends Behavior {
  start() {
    this.body = this.gameObject.getBehavior('RigidBodyBehavior').rigidBody;
  }

  update(delta) {
    let move = { x: 0, y: 0 };
    if (Input.isKeyDown('d')) move.x += 5 * delta;
    if (Input.isKeyDown('a')) move.x -= 5 * delta;
    if (Input.isKeyDown('w')) move.y -= 5 * delta;
    if (Input.isKeyDown('s')) move.y += 5 * delta;

    if (move.x !== 0 || move.y !== 0) Matter.Body.translate(this.body, move);

    const mouse = getMousePos();
    // const relative = Matter.Vector.sub(mouse, container);
    const relative = Matter.Vector.sub(mouse, this.body.position);
    this.gameObject.container.rotation = Math.atan2(relative.y, relative.x);
    Matter.Body.setAngle(this.body, Math.atan2(relative.y, relative.x));
  }
}