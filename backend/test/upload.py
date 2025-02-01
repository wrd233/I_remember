# generate_mock_data.py
import json
from datetime import datetime, timedelta
import random

def generate_mock_data(num=100):
    data = []
    for i in range(num):
        entry = {
            "id": i + 1,
            "title": f"记忆标题_{i + 1}",
            "content": f"这是第 {i + 1} 条记忆的详细内容，模拟用户的记忆描述。",
            "date": (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d"),
            "images": [f"/home/vcm/I_remember/backend/static/uploads/image{i % 3}.png"]  # 假设有 10 张模拟图片循环使用
        }
        data.append(entry)
    return data

if __name__ == "__main__":
    mock_data = generate_mock_data(100)
    with open("/home/vcm/I_remember/backend/data.json", "w", encoding="utf-8") as f:
        json.dump(mock_data, f, indent=4, ensure_ascii=False)
    print("模拟数据生成完成！")