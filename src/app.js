/**
 * Created by Justin on 2020-12-21.
 */
import './styles/index.scss';
import Engine from './classes/Engine';
import Player from './entities/player';
import WallEntity from './entities/objects/WallEntity';

const engine = new Engine();

const player = Player({
  position: { x: 100, y: 300 },
});

const wall1 = WallEntity.createWallAt({
  x: 0,
  y: 0,
  width: 1600,
  height: 30,
});
const wall2 = WallEntity.createWallAt({
  x: 0,
  y: 900-30,
  width: 1600,
  height: 30,
});
const wall3 = WallEntity.createWallAt({
  x: 0,
  y: 0,
  width: 30,
  height: 900,
});
const wall4 = WallEntity.createWallAt({
  x: 1600-30,
  y: 0,
  width: 30,
  height: 900,
});

engine.addGameObjects([player, wall1, wall2, wall3, wall4]);

engine.run();
