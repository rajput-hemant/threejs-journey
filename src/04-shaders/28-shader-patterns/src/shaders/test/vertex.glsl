varying vec2 vUv;

void main() {
  /*
    The position of the vertex is transformed by the model, view, and projection
    matrices. The model matrix is applied first, then the view matrix, and finally
    the projection matrix. The projection matrix is applied last because it is
    applied to the vertex in clip space. The model and view matrices are applied
    to the vertex in world space.
  */
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  /*
    we need to pass the uv coordinates to the fragment shader so that we can use them
  */
  vUv = uv;
}