// src/components/ClickableParticlesManager.tsx
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import ClickableParticle from './ClickableParticle';
import { CameraControls } from '@react-three/drei';

interface ClickableParticlesManagerProps {
  cameraControlsRef: React.RefObject<CameraControls>;
}

const ClickableParticlesManager = ({ cameraControlsRef }: ClickableParticlesManagerProps) => {
  const { scene, camera, raycaster } = useThree();
  const [clickableParticles, setClickableParticles] = useState<THREE.Vector3[]>([]);
  const clickableRefs = useRef<THREE.Mesh[]>([]);
  const clickedIndexRef = useRef<number | null>(null); // 记录当前点击的粒子索引

  // 生成初始粒子位置
  const generateParticlePositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions.push(new THREE.Vector3(x, y, z));
    }
    return positions;
  };

  // 筛选可点击粒子（随机筛选）
  useEffect(() => {
    const allParticles = generateParticlePositions(1000);
    const filtered = allParticles.filter((_, index) => Math.random() > 0.95).slice(0, 200);
    setClickableParticles(filtered);
  }, []);

  // 点击检测逻辑
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableRefs.current);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const clickedPosition = clickedMesh.position;
        console.log('点击的粒子位置:', clickedPosition);

        // 记录当前点击的粒子索引
        clickedIndexRef.current = clickableRefs.current.indexOf(clickedMesh);

        // 触发相机聚焦动画
        if (cameraControlsRef.current) {
          const targetPosition = new THREE.Vector3(
            clickedPosition.x,
            clickedPosition.y,
            clickedPosition.z
          );

          // 计算相机拉近后的位置
          const offset = new THREE.Vector3(0, 0, 5); // 相机与目标的偏移距离
          const cameraPosition = targetPosition.clone().add(offset);

          cameraControlsRef.current.setLookAt(
            cameraPosition.x, cameraPosition.y, cameraPosition.z, // 相机位置
            targetPosition.x, targetPosition.y, targetPosition.z, // 目标位置
            true // 启用动画
          );
        }
      }
    };

    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, [camera, raycaster, cameraControlsRef]);

  return (
    <>
      {clickableParticles.map((pos, index) => (
        <ClickableParticle
          key={index}
          position={pos}
          ref={(ref) => (clickableRefs.current[index] = ref!)}
          isClicked={index === clickedIndexRef.current} // 传递点击状态
        />
      ))}
    </>
  );
};

export default ClickableParticlesManager;