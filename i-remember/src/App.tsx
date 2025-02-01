// import Scene from './components/Scene';

// function App() {
//   return (
//     <div style={{ 
//       width: "100vw", 
//       height: "100vh", 
//       background: "#000000" // 确保黑色背景
//     }}>
//       <Scene />
//       {/* 强制显示加载提示 */}
//       <div style={{ 
//         position: "fixed", 
//         top: 20, 
//         left: 20, 
//         color: "white", 
//         zIndex: 1000,
//         fontFamily: 'Arial'
//       }}>
//         🚀 3D Scene Loaded. {import.meta.env.DEV ? '(Development Mode)' : ''}
//       </div>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scene from './components/Scene';
import MemoryPanelTest from './pages/MemoryPanelTest';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/test-memory-panel" element={<MemoryPanelTest />} />
      </Routes>
    </Router>
  );
};

export default App;