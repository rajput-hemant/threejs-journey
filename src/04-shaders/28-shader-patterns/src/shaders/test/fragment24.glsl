varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) /10.0);
  float strength = random(gridUv);

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}