/**
 * Created by Justin on 2020-12-21.
 */
import './styles/index.scss';
import Engine from './classes/Engine';
import Player from './entities/player';

const engine = new Engine();

const player = Player({
  position: { x: 100, y: 100 },
});

engine.addGameObjects([player]);

console.log('player:', player);
console.log('engine:', engine);

engine.run();
