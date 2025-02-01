import { useEffect } from 'react';

const DataFetchTest = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://i-remember.zeabur.app/data');
        const rawText = await response.text(); // 先获取原始文本
        console.log('原始响应:', rawText); // 调试用
        
        const backendData = JSON.parse(rawText); // 手动解析
        console.log('转换后的数据:', backendData);
      } catch (error) {
        console.error('数据获取失败:', error);
      }
    };
    
    fetchData();
  }, []);

  return <div>查看控制台输出</div>;
};

export default DataFetchTest;