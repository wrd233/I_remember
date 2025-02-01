import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import Particles from './Particles';

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={1}>
      <Stats /> {/* 性能监控面板 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Particles count={1000} /> {/* 粒子数量可调整 */}
    </Canvas>
  );
};

export default Scene;