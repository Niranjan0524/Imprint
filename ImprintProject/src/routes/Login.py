from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)  # Enable CORS for React
conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "Niranjan05@",
    database = "Anki"
)

curr = conn.cursor()
@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    name=data.get("Username")
    email = data.get("email")
    pwd = data.get("password")

    x=curr.execute("INSERT INTO Users (name,email,password) values (%s,%s,%s)",(name,email,pwd))
    conn.commit()
    print("Inserted Successfully")
    if x:
        return jsonify({"message": "Login Successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
