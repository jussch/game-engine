/**
 * Created by Justin on 2020-12-22.
 */
import GameObject from '../../classes/GameObject';
import RigidBodyBehavior from '../../behaviors/RigidBodyBehavior';
import ShapeSpriteBehavior from '../../behaviors/ShapeSpriteBehavior';

export default GameObject.schema({
  name: 'Wall',
  behaviors: [
    RigidBodyBehavior.instance({
      isStatic: true,
      size: { x: 100, y: 100 },
    }),
    ShapeSpriteBehavior.instance({
      size: { x: 100, y: 100 },
    }),
  ],
});