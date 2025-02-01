import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import ClickableParticle from './ClickableParticle';
import { CameraControls } from '@react-three/drei';
import { Memory } from '../types/memory';

interface ClickableParticlesManagerProps {
  cameraControlsRef: React.RefObject<CameraControls>;
  onMemorySelect: (memory: Memory | null) => void; // ✅ 传递 Memory 对象
}

const CLICKABLE_PARTICLES_MAX = 1000; // ✅ 定义常量

const ClickableParticlesManager = ({ cameraControlsRef, onMemorySelect }: ClickableParticlesManagerProps) => {
  const { scene, camera, raycaster } = useThree();
  const [clickableParticles, setClickableParticles] = useState<THREE.Vector3[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const clickableRefs = useRef<THREE.Mesh[]>([]);
  const clickedIndexRef = useRef<number | null>(null);

  // 从后端获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://i-remember.zeabur.app/data');
        const backendData = await response.json();
        const convertedData = backendData.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          content: item.content,
          imageUrls: item.images || []
        }));
        setMemories(convertedData);
      } catch (error) {
        console.error('数据获取失败:', error);
      }
    };
    fetchData();
  }, []);

  // 生成可点击粒子位置（带权重筛选）
  const filterParticlesWithWeight = (memories: Memory[]) => {
    const total = memories.length;
    if (total <= CLICKABLE_PARTICLES_MAX) return memories;

    // 按 ID 降序排序（新数据在前）
    const sortedMemories = [...memories].sort((a, b) => b.id - a.id);

    // 生成权重数组（ID 越大权重越高）
    const weights = sortedMemories.map((_, index) => (index + 1) / total);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    // 加权随机选择
    const selected: Memory[] = [];
    while (selected.length < CLICKABLE_PARTICLES_MAX) {
      let random = Math.random() * totalWeight;
      for (let i = 0; i < sortedMemories.length; i++) {
        if (random < weights[i]) {
          selected.push(sortedMemories[i]);
          break;
        }
        random -= weights[i];
      }
    }

    return selected.slice(0, CLICKABLE_PARTICLES_MAX);
  };

  // 更新粒子位置
  useEffect(() => {
    if (memories.length === 0) return;

    // 筛选要显示的记忆（带权重）
    const filteredMemories = filterParticlesWithWeight(memories);

    // 生成粒子位置
    const positions = generateParticlePositions(filteredMemories.length).slice(0, filteredMemories.length);
    setClickableParticles(positions);
  }, [memories]);

  // 随机生成粒子位置（原有逻辑）
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

  // 点击检测逻辑（传递 Memory 对象）
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
        console.log('点击的粒子位置:', clickedPosition); // ✅ 恢复打印位置

        // 记录当前点击的粒子索引
        clickedIndexRef.current = clickableRefs.current.indexOf(clickedMesh);

        // 触发相机聚焦动画
        if (cameraControlsRef.current) {
          const targetPosition = new THREE.Vector3(
            clickedPosition.x,
            clickedPosition.y,
            clickedPosition.z
          );

          // 计算相机拉近后的位置（偏移量可调整）
          const offset = new THREE.Vector3(0, 0, 5);
          const cameraPosition = targetPosition.clone().add(offset);

          cameraControlsRef.current.setLookAt(
            cameraPosition.x, cameraPosition.y, cameraPosition.z, // 相机位置
            targetPosition.x, targetPosition.y, targetPosition.z, // 目标位置
            true // 启用动画，持续时间为默认值（可调整）
          );
        }

        // 触发记忆面板显示（传递 Memory 对象）
        const selectedMemory = memories[clickedIndexRef.current] || null;
        console.log('选中的记忆数据:', selectedMemory); // ✅ 调试输出
        onMemorySelect(selectedMemory);
      }
    };

    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, [camera, raycaster, memories, onMemorySelect]);

  return (
    <>
      {clickableParticles.map((pos, index) => (
        <ClickableParticle
          key={index}
          position={pos}
          ref={(ref) => (clickableRefs.current[index] = ref!)}
          isClicked={index === clickedIndexRef.current}
        />
      ))}
    </>
  );
};

export default ClickableParticlesManager;