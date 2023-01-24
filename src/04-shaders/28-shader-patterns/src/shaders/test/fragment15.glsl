varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
  barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

  float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
  barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

  float strength = barX + barY;

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}