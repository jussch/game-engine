/**
 * Created by Justin on 2020-12-22.
 */
import GameObject from '../../classes/GameObject';
import SpriteBehavior from '../../behaviors/SpriteBehavior';
import RigidBodyBehavior from '../../behaviors/RigidBodyBehavior';

export default GameObject.schema({
  name: 'Player',
  behaviors: [
    SpriteBehavior.instance({

    }),
    RigidBodyBehavior.instance({

    }),
  ],
});
