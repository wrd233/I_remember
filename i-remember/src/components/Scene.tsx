import { Canvas } from '@react-three/fiber';
import { Stats, CameraControls } from '@react-three/drei';
import Particles from './Particles';
import ClickableParticlesManager from './ClickableParticlesManager';
import MemoryPanel from './MemoryPanel'; // 导入 MemoryPanel
import { useRef, useState } from 'react';

const Scene = () => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null); // 管理选中的记忆 ID

  // 处理记忆选择
  const handleMemorySelect = (memoryId: number | null) => {
    setSelectedMemoryId(memoryId);
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
          onMemorySelect={handleMemorySelect} // 传递 onMemorySelect 函数
        />
        <CameraControls ref={cameraControlsRef} makeDefault />
      </Canvas>

      {/* 显示记忆面板 */}
      {selectedMemoryId !== null && (
        <MemoryPanel
          memoryId={selectedMemoryId}
          onClose={() => setSelectedMemoryId(null)} // 关闭面板时清空 selectedMemoryId
        />
      )}
    </>
  );
};

export default Scene;