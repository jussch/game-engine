/**
 * Created by Justin on 2020-12-21.
 */
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import './styles/index.scss';
import * as Input from './modules/Input';
import survivorImage from './survivor-idle_knife_0.png';
import { getMousePos } from './modules/Input';

const app = new PIXI.Application({
  // width: window.innerWidth,
  // height: window.innerHeight,
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
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
  bunny.x = 0;
  bunny.y = 0;
  container.addChild(bunny);
}

// Move container to the center
container.x = 200;
container.y = 200;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

const engine = Matter.Engine.create();
// const body = Matter.Bodies.rectangle(container.x, container.y, container.width, container.height);
const body = Matter.Bodies.circle(200, 200, 50, { isStatic: false });

const graphics = new PIXI.Graphics();
graphics.beginFill(0xDE3249);
graphics.drawRect(100, 350, 800, 50);
graphics.endFill();
app.stage.addChild(graphics);

// const staticBody = Matter.Bodies.rectangle(0, app.screen.height - 100, app.screen.width, 100, { isStatic: true });
const staticBody = Matter.Bodies.rectangle(100 + 800 / 2, 350 + 50 / 2, 800, 50, { isStatic: true });

Matter.World.add(engine.world, [body, staticBody]);
engine.world.gravity.y = 0;

Matter.Events.on(engine, 'collisionStart', (event) => {
  var pairs = event.pairs;

  var objA = pairs[0].bodyA.label;
  var objB = pairs[0].bodyB.label;

  console.log({ pairs, 'pairs[0].bodyA': pairs[0].bodyA, 'pairs[0].bodyB': pairs[0].bodyB });
});

// var render = Matter.Render.create({
//   element: document.body,
//   engine: engine,
//   options: {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     wireframes: false,
//   }
// });

Matter.Body.setInertia(body, Infinity);

// Matter.Engine.run(engine);
// Matter.Render.run(render);

// Listen for animate update
app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  Input.cycleKeys();

  let move = { x: 0, y: 0 };
  if (Input.isKeyDown('d')) move.x += 5 * delta;
  if (Input.isKeyDown('a')) move.x -= 5 * delta;
  if (Input.isKeyDown('w')) move.y -= 5 * delta;
  if (Input.isKeyDown('s')) move.y += 5 * delta;

  if (move.x !== 0 || move.y !== 0) Matter.Body.translate(body, move);

  const mouse = getMousePos();
  // const relative = Matter.Vector.sub(mouse, container);
  const relative = Matter.Vector.sub(mouse, body.position);
  container.rotation = Math.atan2(relative.y, relative.x);
  Matter.Body.setAngle(body, Math.atan2(relative.y, relative.x));

  Matter.Engine.update(engine, delta);

  if (Input.isMousePressed()) {
    console.log('press');
    const norm = Matter.Vector.normalise(relative);
    const dist = Matter.Vector.mult(norm, 60);
    const pos = Matter.Vector.add(dist, body.position);
    const bullet = Matter.Bodies.circle(pos.x, pos.y, 10, { isSensor: false, frictionAir: 0, friction: 0 });
    Matter.Body.setVelocity(bullet, Matter.Vector.add(Matter.Vector.mult(norm, 1), move));
    Matter.World.add(engine.world, [bullet]);
  }

  container.x = body.position.x;
  container.y = body.position.y;
});
