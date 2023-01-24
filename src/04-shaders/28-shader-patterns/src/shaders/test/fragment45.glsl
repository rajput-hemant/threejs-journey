#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */
  float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  angle /= PI * 2.0;
  angle += 0.5;
  float sinosoid = sin(angle * 100.0);

  float radius = 0.25 + sinosoid * 0.02;
  float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}