/*
removing because it is already defined in the ShaderMaterial class in three.js
*/
// precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
  /*
  texture2D is a function that takes two arguments: a texture and a
  coordinate. It returns the color of the texture at the given
  coordinate. The coordinate is a vec2 with two components: x and y.

  gl_PointCoord is a special variable that holds the coordinates (just like uv coordinates in three.js) of
  the current fragment. It is a vec2 with two components: x and y.
  */
  vec4 textureColor = texture2D(uTexture, vUv);

  textureColor.rgb *= vElevation * 2.0 + 0.8;

  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  
  We set the color of the fragment to the color of the texture at the
  current coordinate.
  */
  gl_FragColor = textureColor;
}