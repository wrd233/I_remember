import React, { useState } from 'react';
import MemoryPanel from '../components/MemoryPanel';

const MemoryPanelTest: React.FC = () => {
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null);

  return (
    <div style={styles.container}>
      <h1>记忆面板测试</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => setSelectedMemoryId(1)}
        >
          显示记忆 1
        </button>
        <button
          style={styles.button}
          onClick={() => setSelectedMemoryId(2)}
        >
          显示记忆 2
        </button>
      </div>
      {selectedMemoryId !== null && (
        <MemoryPanel
          memoryId={selectedMemoryId}
          onClose={() => setSelectedMemoryId(null)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default MemoryPanelTest;