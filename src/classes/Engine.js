/**
 * Created by Justin on 2020-12-22.
 */
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import * as Input from '../modules/Input';
import Collection from './Collection';

const WIDTH = 1600;
const HEIGHT = 900;

export default class Engine {
  constructor(props = {}) {
    this.physics = Matter.Engine.create();
    this.physics.world.gravity.y = 0;

    this.canvas = new PIXI.Application({
      // width: window.innerWidth,
      // height: window.innerHeight,
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      // resizeTo: window,
    });

    document.body.appendChild(this.canvas.view);
    this.gameObjects = new Collection();
    this.isRunning = false;

    // Perform initial resizing
    resize(this.canvas)();
    // Add event listener so that our resize function runs every time the
    // browser window is resized.
    window.addEventListener("resize", resize(this.canvas));
  }

  addGameObjects(gameObjects) {
    for (let i = 0; i < gameObjects.length; i += 1) {
      const gameObject = gameObjects[i];
      this.gameObjects.addModel(gameObject);
      this.canvas.stage.addChild(gameObject.container);
      gameObject.initialize(this);
      gameObject.start(this);
    }
  }

  updateAll(delta) {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.update(delta);
    }
  }

  resolveAll() {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.resolve();
    }
  }

  drawAll() {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.draw();
    }
  }

  run() {
    if (this.isRunning) {
      throw new Error('Engine already running.');
    }

    this.isRunning = true;
    this.canvas.ticker.add((delta) => {
      Input.cycleKeys();

      this.updateAll(delta);

      Matter.Engine.update(this.physics, delta);

      this.resolveAll();

      this.drawAll();
    });
  }
}


function resize (app) {
  return function () {
    const vpw = window.innerWidth;  // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

    if (vph / vpw < HEIGHT / WIDTH) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }

    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    app.renderer.resize(nvw, nvh);

    // This command scales the stage to fit the new size of the game.
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}