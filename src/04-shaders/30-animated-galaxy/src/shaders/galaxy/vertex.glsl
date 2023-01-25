uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
  /*
    Position

    The position of the vertex is transformed by the model, view, and projection
    matrices. The model matrix is applied first, then the view matrix, and finally
    the projection matrix. The projection matrix is applied last because it is
    applied to the vertex in clip space. The model and view matrices are applied
    to the vertex in world space.
  */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Spin
  float angle = atan(modelPosition.x, modelPosition.z);
  float distToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distToCenter) * uTime * 0.2;
  angle += angleOffset;
  modelPosition.x = sin(angle) * distToCenter;
  modelPosition.z = cos(angle) * distToCenter;

  // Randomness
  // modelPosition.x += aRandomness.x;
  // modelPosition.y += aRandomness.y;
  // modelPosition.z += aRandomness.z;
  modelPosition.xyz += aRandomness;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  /*
  gl_Position is a special variable that will be used by the GPU to draw the vertex on the screen.
  It contains the position of the vertex to be drawn/rendered in the clip space.
  */
  gl_Position = projectionPosition;

  /*
    Size

    This is size of fragment in pixels. The default value is 1.0. The size of the
  */
  gl_PointSize = uSize * aScale;

  /*
    Size Attenuation
  */
  gl_PointSize *= ( 1.0 / - viewPosition.z );

  /* we need to pass the color to the fragment shader */
  vColor = color;
}