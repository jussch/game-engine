/**
 * Created by Justin on 2020-12-21.
 */
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import './styles/index.scss';
import * as Input from './modules/Input';
import survivorImage from './survivor-idle_knife_0.png';
import {getMousePos} from "./modules/Input";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from(survivorImage);

// Create a 5x5 grid of bunnies
for (let i = 0; i < 1; i++) {
  const bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = (i % 5) * 40;
  bunny.y = Math.floor(i / 5) * 40;
  container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  Input.cycleKeys();
  if (Input.isKeyDown('d')) container.x += 5 * delta;
  if (Input.isKeyDown('a')) container.x -= 5 * delta;
  if (Input.isKeyDown('w')) container.y -= 5 * delta;
  if (Input.isKeyDown('s')) container.y += 5 * delta;

  const mouse = getMousePos();
  const relative = Matter.Vector.sub(mouse, container);
  container.rotation = Math.atan2(relative.y, relative.x);
});
