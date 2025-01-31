// 顶点着色器
uniform float uTime;

void main() {
  vec3 pos = position; // 使用内置 position 变量
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 8.0; // 在顶点着色器中设置点大小
}

// 片段着色器
void main() {
  // 强制显示为红色大粒子（调试用）
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}