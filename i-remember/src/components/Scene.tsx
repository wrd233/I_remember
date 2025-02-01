import { Canvas } from '@react-three/fiber';
import { Stats, CameraControls } from '@react-three/drei';
import Particles from './Particles';
import ClickableParticlesManager from './ClickableParticlesManager';
import MemoryPanel from './MemoryPanel';
import { useRef, useState } from 'react';
import { Memory } from '../types/memory'; // 导入 Memory 类型

const Scene = () => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null); // ✅ 改为存储 Memory 对象

  // 处理记忆选择（参数改为 Memory 对象）
  const handleMemorySelect = (memory: Memory | null) => {
    console.log('接收到的记忆数据:', memory); // ✅ 调试输出
    setSelectedMemory(memory);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={1}>
        <Stats />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles count={1000} />
        <ClickableParticlesManager
          cameraControlsRef={cameraControlsRef}
          onMemorySelect={handleMemorySelect} // ✅ 传递 Memory 对象
        />
        <CameraControls ref={cameraControlsRef} makeDefault />
      </Canvas>

      {/* 显示记忆面板（传递 memory 对象） */}
      {selectedMemory !== null && (
        <MemoryPanel
          memory={selectedMemory} // ✅ 使用 memory 属性
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </>
  );
};

export default Scene;