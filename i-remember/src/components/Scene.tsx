import { Canvas } from '@react-three/fiber';
import { Stats, CameraControls } from '@react-three/drei';
import Particles from './Particles';
import ClickableParticlesManager from './ClickableParticlesManager';
import { useRef } from 'react';

const Scene = () => {
  const cameraControlsRef = useRef<CameraControls>(null);

  return (
    <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={1}>
      <Stats />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Particles count={1000} />
      <ClickableParticlesManager cameraControlsRef={cameraControlsRef} />
      <CameraControls ref={cameraControlsRef} makeDefault />
    </Canvas>
  );
};

export default Scene;