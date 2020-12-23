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

const wall = WallEntity({
  position: { x: 500, y: 50 },
  scale: { x: 10, y: 1 },
});

engine.addGameObjects([player, wall]);

console.log('player:', player);
console.log('engine:', engine);

engine.run();
