from flask import Flask, render_template, request, jsonify
import cohere
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

cohere_key = os.getenv("COHERE_API_KEY")
co = cohere.Client(cohere_key)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    try:
        response = co.chat(
            message=user_input,
            chat_history=[],
            model="command-r"
        )
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Cohere Error:", e)
        return jsonify({"reply": "Something went wrong. Try again."})

if __name__ == "__main__":
    app.run(debug=True)
