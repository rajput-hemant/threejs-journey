/*
:modelMatrix:
  - will apply all transformations relative to the Mesh. If we scale, rotate
or move the Mesh, these transformations will be contained in the modelMatrix
and applied to the position.

:viewMatrix:
  - will apply transformations relative to the camera. If we rotate the camera
to the left, the vertices should be on the right. If we move the camera in
direction of the Mesh, the vertices should get bigger, etc.

:projectionMatrix:
  - will finally transform our coordinates into the final clip space coordinates.
*/
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  /*
  to get the position of the model in the view space, we need to multiply the modelMatrix with vec4 containing position (i.e. x, y, z, coordinates) and perspective. This will give us the position of the vertex in the model space.
  */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  /*
  this will make a wave effect on the vertices.
  */
  // modelPosition.z = sin(modelPosition.x * 10.0) * 0.1;

  /*
  this will make a random effect on the vertices.
  */
  modelPosition.z += aRandom * 0.1;

  /*
  Then we need to multiply this with the viewMatrix to get the position in the view space.
  */
  vec4 viewPosition = viewMatrix * modelPosition;

  /*
  Finally we need to multiply this with the projectionMatrix to get the position in the clip space.
  */
  vec4 clipPosition = projectionMatrix * viewPosition;

  /*
  gl_Position is a special variable that will be used by the GPU to draw the vertex on the screen.
  It contains the position of the vertex to be drawn/rendered in the clip space.
  */
  gl_Position = clipPosition;

  /*
  this will pass the random value to the fragment shader.
  */
  vRandom = aRandom;
}