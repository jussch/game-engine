/**
 * Created by Justin on 2020-12-22.
 */
import Matter from 'matter-js';
import Behavior from '../classes/Behavior';

export default class RigidBodyBehavior extends Behavior {
  type = 'rectangle';
  size = { x: 100, y: 100 };

  initialize() {
    this.rigidBody = Matter.Bodies.rectangle(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.size.x,
      this.size.y,
    );
  }
}