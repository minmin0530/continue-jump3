precision mediump float;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vLightPosition;
varying vec3 vPosition;

void main() {
  vec3 lightColor = vec3(0.5, 0.5, 0.75); 
  float directional = max(dot(normalize(vLightPosition), normalize(vNormal)), 0.0);
//  directional = directional / 10.0;
  // float highLight = 1.0 - cos(directional - 0.3);
  vec3 halfway = normalize(vLightPosition + vPosition);
  float specular = pow(max(dot(normalize(vNormal), halfway), 0.0), 5.0);
  vec3 vLighting = vColor.rgb + (lightColor * (directional + specular));

  gl_FragColor = vec4(vLighting, vColor.a);
}