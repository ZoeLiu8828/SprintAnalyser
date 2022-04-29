from flask import Flask
import json
from flask import jsonify

app = Flask(__name__)

@app.route("/predict")
def predict():
    velocity = 50 #dummy velocity
    schedule = "late" #dummy schedule status
    response = {"Velocity: ":velocity, "Schedule": schedule}
    return jsonify(response)

@app.route("/feed")
def feed(board_data, issue_data):
    board_data = board_data
    issue_data = issue_data

    # result = get_prediction_result(board_data, issue_data) this method comes from the model
    # velocity = result["velocity"]
    # schedule = result["schedule"]
    # return predict(velocity, schedule)

if __name__ == "__main__":
    app.run(debug = True)

