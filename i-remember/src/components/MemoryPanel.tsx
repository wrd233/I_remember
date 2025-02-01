import React, { useEffect, useState } from 'react';
// 使用完整的 Memory 类型
import { Memory } from '../types/memory';

interface MemoryPanelProps {
  memory: Memory | null; // 修改为直接传递 Memory 对象
  onClose: () => void;
}

const MemoryPanel: React.FC<MemoryPanelProps> = ({ memory, onClose }) => {
  if (!memory) return null;

  // 图片轮播状态
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.panel}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>{memory.title}</h1>
        </div>
        <div style={styles.content}>
          <div style={styles.imageCarousel}>
            <button onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}>←</button>
            <img
              src={memory.imageUrls[currentImageIndex]}
              alt={memory.title}
              style={styles.image}
            />
            <button onClick={() => setCurrentImageIndex((prev) => Math.min(memory.imageUrls.length - 1, prev + 1))}>→</button>
          </div>
          <div style={styles.textContainer}>
            <div style={styles.contentText}>{memory.content}</div>
            <div style={styles.date}>{memory.date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

// ======================== 样式定义 ========================
const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 999,
  },
  panel: {
    position: 'fixed' as 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',  // 屏幕宽度的50%
    height: '50vh', // 屏幕高度的50%
    backgroundColor: '#f5e6d3', // 羊皮纸底色
    borderRadius: '8px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    overflow: 'hidden',
  },
  titleContainer: {
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '2px solid #d4a772', // 复古金色边框
    backgroundColor: '#e8d0b0', // 标题区域底色
  },
  title: {
    margin: 0,
    fontSize: '2.2vw',
    color: '#654321', // 深棕色
    fontFamily: '"Zhi Mang Xing", cursive', // 中文手写体
  },
  content: {
    display: 'flex',
    height: '85%',
  },
  imageCarousel: {
    width: '40%',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0e0c9', // 浅黄底色
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as 'contain', // 保持比例填充
    borderRadius: '4px',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    width: '60%',
    padding: '15px',
    position: 'relative' as 'relative',
  },
  paperBackground: {
    backgroundImage: '../assets/paper-texture.jpg', // 羊皮纸纹理图片
    backgroundSize: 'cover',
    height: '100%',
    padding: '20px',
    overflowY: 'auto' as 'auto', // 允许滚动
    fontFamily: '"Ma Shan Zheng", cursive', // 另一种手写体
    lineHeight: 1.8,
    color: '#5a3a2c', // 深褐色文字
    fontSize: '1.1rem',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  contentText: {
    whiteSpace: 'pre-wrap', // 保留换行
    flexGrow: 1, // 正文内容占据剩余空间
  },
  date: {
    textAlign: 'right' as 'right',
    fontSize: '0.9rem',
    color: '#7a5c3c', // 浅褐色
    fontStyle: 'italic',
    marginTop: '20px', // 正文和日期之间的间距
  },
};

export default MemoryPanel;