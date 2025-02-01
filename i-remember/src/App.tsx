import Scene from './components/Scene';

function App() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      background: "#000000" // 确保黑色背景
    }}>
      <Scene />
      {/* 强制显示加载提示 */}
      <div style={{ 
        position: "fixed", 
        top: 20, 
        left: 20, 
        color: "white", 
        zIndex: 1000,
        fontFamily: 'Arial'
      }}>
        🚀 3D Scene Loaded. {import.meta.env.DEV ? '(Development Mode)' : ''}
      </div>
    </div>
  );
}

export default App;