from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=False)

@app.after_request
def add_cors_headers(resp):
  origin = request.headers.get("Origin", "*")
  resp.headers["Access-Control-Allow-Origin"] = origin
  resp.headers["Vary"] = "Origin"
  resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
  resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
  return resp


@app.get("/")
def root():
    return "Backend is running. Try /api/health"

@app.get("/api/health")
def health():
    return jsonify(status="ok")

@app.get("/api/projects/<int:projectId>/checkin")
def checkin(projectId):
    qty = request.args.get("qty", default=0, type=int)
    return jsonify(projectId=projectId, qty=qty, message=f"{qty} hardware checked in")

@app.get("/api/projects/<int:projectId>/checkout")
def checkout(projectId):
    qty = request.args.get("qty", default=0, type=int)
    return jsonify(projectId=projectId, qty=qty, message=f"{qty} hardware checked out")

@app.get("/api/projects/<int:projectId>/join")
def join(projectId):
    return jsonify(projectId=projectId, message=f"Joined {projectId}")

@app.get("/api/projects/<int:projectId>/leave")
def leave(projectId):
    return jsonify(projectId=projectId, message=f"Left {projectId}")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
