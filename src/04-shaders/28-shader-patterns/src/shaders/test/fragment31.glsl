varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  float lightX = 0.015 / distance(lightUvX, vec2(0.5));

  vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
  float lightY = 0.015 / distance(lightUvY, vec2(0.5));

  float strength = lightX * lightY;

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}