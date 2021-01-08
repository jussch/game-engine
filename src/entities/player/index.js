/**
 * Created by Justin on 2020-12-22.
 */
import GameObject from '../../classes/GameObject';
import SpriteBehavior from '../../behaviors/SpriteBehavior';
import RigidBodyBehavior from '../../behaviors/RigidBodyBehavior';
import PlayerBehavior from './PlayerBehavior';

export default GameObject.schema({
  name: 'Player',
  behaviors: [
    SpriteBehavior.instance({
      scale: { x: 0.67, y: 0.67 },
    }),
    RigidBodyBehavior.instance({

    }),
    PlayerBehavior.instance({

    }),
  ],
});
