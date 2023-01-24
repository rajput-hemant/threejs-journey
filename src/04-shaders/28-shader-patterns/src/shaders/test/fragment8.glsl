varying vec2 vUv;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  */ 
  float strength = mod(vUv.y * 10.0, 1.0);

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
  strength = step(0.5, strength);

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}