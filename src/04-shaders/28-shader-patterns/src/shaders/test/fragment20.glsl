varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  float strength = square1 * square2;

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}