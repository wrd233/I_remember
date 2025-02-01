import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ClickableParticleProps {
  position: THREE.Vector3;
  isClicked: boolean;
}

const ClickableParticle = forwardRef<Mesh, ClickableParticleProps>(({ position, isClicked }, ref) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useImperativeHandle(ref, () => meshRef.current!);

  // 闪烁动画
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 悬浮动画
      meshRef.current.position.y = position.y + Math.sin(clock.elapsedTime * 2) * 0.3;

      // 点击缩放
      if (isClicked) {
        const scale = 1.0 + Math.sin(clock.elapsedTime * 10) * 0.2;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }

      // 红色闪烁（透明度变化）
      if (materialRef.current) {
        const alpha = 0.7 + Math.sin(clock.elapsedTime * 5) * 0.3;
        materialRef.current.opacity = alpha;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} /> {/* 调整为小球体 */}
      <meshBasicMaterial
        ref={materialRef}
        color="#ff0000" // 纯红色
        transparent
        opacity={0.7}
      />
    </mesh>
  );
});

export default ClickableParticle;