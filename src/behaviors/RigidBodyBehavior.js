/**
 * Created by Justin on 2020-12-22.
 */
import Matter from 'matter-js';
import Behavior from '../classes/Behavior';

export default class RigidBodyBehavior extends Behavior {
  type = 'rectangle';
  size = { x: 100, y: 100 };
  isStatic = false;
  isSensor = false;
  rotationLocked = false;

  initialize(engine) {
    const scale = this.gameObject.scale;
    const sizeScale = { x: this.size.x * scale.x, y: this.size.y * scale.y };
    this.rigidBody = Matter.Bodies.rectangle(
      this.gameObject.position.x,
      this.gameObject.position.y,
      sizeScale.x,
      sizeScale.y,
      {
        isStatic: this.isStatic,
        isSensor: this.isSensor,
      },
    );

    if (this.rotationLocked) {
      Matter.Body.setInertia(this.rigidBody, Infinity);
    }

    Matter.World.add(engine.physics.world, [this.rigidBody]);
  }

  resolve() {
    this.gameObject.position.x = this.rigidBody.position.x;
    this.gameObject.position.y = this.rigidBody.position.y;
  }
}