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

  // Pattern 1
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // Pattern 2
  // gl_FragColor = vec4(vUv, 0.0, 1.0);

  // Pattern 2 (a)
  // gl_FragColor = vec4(vUv, 0.5, 1.0);

  // Pattern 3 
  // gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

  // Pattern 4
  // float strength = vUv.y;

  // Pattern 5
  // float strength = 1.0 - vUv.y;

  // Pattern 6
  // float strength = vUv.y * 10.0;

  // Pattern 7
  // float strength = mod(vUv.y * 10.0, 1.0);

  // Pattern 8
  // float strength = mod(vUv.y * 10.0, 1.0);

  /* 
  Don't use conditionals in the fragment shader.
  It's bad for performance because they are slow.
  */
  // if(strength < 0.5)
  //   strength = 0.0;
  // else
  //   strength = 1.0;

  /*
  Use the step function instead.
  It's same as the if statement above.
  And it's faster and more efficient.
  */
  // strength = step(0.5, strength);

  // Pattern 9
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.8, strength);

  // Pattern 10
  // float strength = mod(vUv.x * 10.0, 1.0);
  // strength = step(0.8, strength);

  // Pattern 11
  // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

  // Pattern 12
  // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // Pattern 13
  // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // Pattern 14
  // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
  // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

  // float strength = barX + barY;

  // Pattern 15
  // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

  // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
  // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

  // float strength = barX + barY;

  // Pattern 16
  // float strength = abs(vUv.x - 0.5);

  // Pattern 17
  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // Pattern 18
  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // Pattern 19
  // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // Pattern 20
  // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // float strength = square1 * square2;

  // Pattern 21
  // float strength = floor(vUv.x * 10.0) / 10.0;

  // Pattern 22
  // float strength = floor(vUv.x * 10.0) / 10.0;
  // strength *= floor(vUv.y * 10.0) / 10.0;

  // Pattern 23
  // float strength = random(vUv);

  // Pattern 24
  // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) /10.0);
  // float strength = random(gridUv);

  // Pattern 25
  // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0 + vUv * 5.0) /10.0);
  // float strength = random(gridUv);

  // Pattern 26
  // float strength = length(vUv);

  // Pattern 27
  // float strength = distance(vUv, vec2(0.5));

  // Pattern 28
  // float strength = 1.0 - distance(vUv, vec2(0.5));

  // Pattern 29
  // float strength = 0.015 / distance(vUv, vec2(0.5));

  // Pattern 30
  // vec2 lightUv = vec2(
  //   vUv.x * 0.1 + 0.45,
  //   vUv.y * 0.5 + 0.25
  // );
  // float strength = 0.015 / distance(lightUv, vec2(0.5));

  // Pattern 31
  // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  // float lightX = 0.015 / distance(lightUvX, vec2(0.5));

  // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
  // float lightY = 0.015 / distance(lightUvY, vec2(0.5));

  // float strength = lightX * lightY;

  // Pattern 32
  vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  float lightX = 0.015 / distance(lightUvX, vec2(0.5));

  vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
  float lightY = 0.015 / distance(lightUvY, vec2(0.5));

  float strength = lightX * lightY;

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}