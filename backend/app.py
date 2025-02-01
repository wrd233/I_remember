from flask import Flask, request, jsonify
import os
import json
from datetime import datetime
from flask_cors import CORS  # 添加 CORS 支持

app = Flask(__name__)
CORS(app)  # 启用 CORS

# 存储图片的目录
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 存储 JSON 数据的文件
DATA_FILE = "data.json"

# 读取 JSON 数据
def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# 写入 JSON 数据
def write_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

@app.route("/submit", methods=["POST"])
def submit():
    """ 接收表单数据并存储到 JSON """
    title = request.form.get("title")
    date = request.form.get("date", datetime.now().strftime("%Y-%m-%d"))
    content = request.form.get("content")
    
    if not title or not content:
        return jsonify({"error": "Title and Content are required"}), 400

    # 处理图片上传
    images = []
    for i in range(3):
        file = request.files.get(f"image{i}")
        if file:
            filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            images.append(f"/{filepath}")  # 访问路径

    # 读取现有数据
    data = read_data()

    # 添加新数据
    entry = {"title": title, "date": date, "content": content, "images": images}
    data.append(entry)

    # 写入 JSON 文件
    write_data(data)

    return jsonify({"message": "Submission successful", "data": entry})

@app.route("/data", methods=["GET"])
def get_data():
    """ 返回所有 JSON 数据 """
    data = read_data()
    return jsonify(data)

import shutil

@app.route("/clear", methods=["POST"])
def clear_data():
    """清除所有上传的数据，包括图片和 data.json"""
    
    # 删除所有上传的图片
    if os.path.exists(UPLOAD_FOLDER):
        shutil.rmtree(UPLOAD_FOLDER)  # 删除整个 uploads 文件夹
        os.makedirs(UPLOAD_FOLDER)  # 重新创建空的 uploads 文件夹

    # 清空 data.json
    write_data([])

    return jsonify({"message": "All uploaded data has been cleared!"})

if __name__ == "__main__":
    app.run(debug=True)