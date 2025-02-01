import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ClickableParticleProps {
  position: THREE.Vector3;
  isClicked: boolean;
}

const ClickableParticle = forwardRef<Mesh, ClickableParticleProps>(({ position, isClicked }, ref) => {
  const meshRef = useRef<Mesh>(null);

  // 将 meshRef 暴露给父组件
  useImperativeHandle(ref, () => meshRef.current!);

  // 简单悬浮动画
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position.y + Math.sin(clock.elapsedTime * 2) * 0.3;

      // 点击反馈：短暂缩放
      if (isClicked) {
        const scale = 1.0 + Math.sin(clock.elapsedTime * 10) * 0.2;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(1, 1, 1); // 恢复原始大小
      }
    }
  });

  // 点击反馈：变色
  const color = isClicked ? 'yellow' : 'red';

  return (
    <mesh
      ref={meshRef}
      position={position}
      visible={true} // 临时可见，用于调试
    >
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
});

export default ClickableParticle;