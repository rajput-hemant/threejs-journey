varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 100.0) * 0.1,
    vUv.y + sin(vUv.x * 100.0) * 0.1
  );

  float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}