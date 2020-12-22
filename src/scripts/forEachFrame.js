/**
 * Created by Justin on 2020-12-22.
 */

export default function forEachFrame(cb) {
  let start;
  window.requestAnimationFrame((timestamp) => {
    const delta = timestamp - start;
    start = timestamp;

    console.log('delta:', delta);
    cb(delta);
  });
}
