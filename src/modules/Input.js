/**
 * Created by Justin on 2020-12-22.
 */
import keycode from 'keycode';

const keyMap = new Map();

const STATE_INIT = 'init';
const STATE_PRESS = 'press';
const STATE_DOWN = 'down';
const STATE_UP = 'up';

window.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  const key = keycode(event);
  console.log('key:', key);
  if ((event.ctrlKey && key === 'r') || (event.ctrlKey && key === 'i')) return;
  event.preventDefault();
  keyMap.set(key, STATE_INIT);
});

window.addEventListener('keyup', (event) => {
  event.preventDefault();
  const key = keycode(event);
  keyMap.set(key, STATE_UP);
});

export function isKeyDown(key) {
  const state = keyMap.get(key);
  return state === STATE_DOWN || state === STATE_PRESS;
}

export function isKeyPressed(key) {
  const state = keyMap.get(key);
  return state === STATE_PRESS;
}

/**
 * Mouse
 */
const mouseStates = [STATE_UP, STATE_UP, STATE_UP];
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

window.addEventListener('mousedown', (event) => {
  event.preventDefault();
  if (event.which === 0) return;
  mouseStates[event.which - 1] = STATE_INIT;
  console.log('mouseStates:', mouseStates);
});

window.addEventListener('mouseup', (event) => {
  event.preventDefault();
  if (event.which === 0) return;
  mouseStates[event.which - 1] = STATE_UP;
});

window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

export function getMousePos() {
  return { x: mouseX, y: mouseY };
}

export function isMouseDown(key = 0) {
  return mouseStates[key] === STATE_DOWN || mouseStates[key] === STATE_PRESS;
}

export function isMousePressed(key = 0) {
  return mouseStates[key] === STATE_PRESS;
}

/**
 * Utilities
 */
export function cycleKeys() {
  keyMap.forEach((value, key) => {
    if (value === STATE_PRESS) keyMap.set(key, STATE_DOWN);
    if (value === STATE_INIT) keyMap.set(key, STATE_PRESS);
  });

  mouseStates.forEach((value, key) => {
    if (value === STATE_PRESS) mouseStates[key] = STATE_DOWN;
    if (value === STATE_INIT) mouseStates[key] = STATE_PRESS;
  });
}
