import { useMemo, useRef } from 'react';
import { Points, BufferAttribute } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/particle.vert.glsl?raw';
import fragmentShader from '../shaders/particle.frag.glsl?raw';

const Particles = ({ count = 1000 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // 粒子初始位置
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return new BufferAttribute(pos, 3);
  }, [count]);

  // 每帧更新着色器时间
  useFrame(({ clock }) => {
    if (pointsRef.current?.material) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;