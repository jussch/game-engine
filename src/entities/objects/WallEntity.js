/**
 * Created by Justin on 2020-12-22.
 */
import GameObject from '../../classes/GameObject';
import RigidBodyBehavior from '../../behaviors/RigidBodyBehavior';
import ShapeSpriteBehavior from '../../behaviors/ShapeSpriteBehavior';

const WallEntity = GameObject.schema({
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

WallEntity.createWallAt = function ({ x, y, width, height }, props) {
  const center = { x: x + width / 2, y: y + height / 2 };
  return WallEntity({
    ...props,
    position: center,
    scale: { x: width / 100, y: height / 100 },
  });
};

export default WallEntity;
