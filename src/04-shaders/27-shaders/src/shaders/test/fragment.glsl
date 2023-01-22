precision mediump float;

/*
The following line declares a variable called vRandom. It is a
floating point number, and it is varying. This means that the value
of vRandom will be different for each fragment. The value of vRandom
will be the same for all the vertices that make up a single
triangle.

Here it is being imported from the vertex shader. The vertex shader
will set the value of vRandom for each vertex, and the fragment
shader will use that value for each fragment. 
*/
varying float vRandom;

void main() {
  /*
  gl_FragColor is a special variable that holds the color of the
  fragment. It is a vec4, which means it has four components: red,
  green, blue, and alpha. Each component is a floating point number
  between 0.0 and 1.0. The default value is (0.0, 0.0, 0.0, 0.0).
  
  The following line sets the color of the fragment to red.
  */
  gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}