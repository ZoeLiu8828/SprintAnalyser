from dataclasses import field
from urllib import response
from flask import Flask, Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from flask_migrate import Migrate
import sqlite3
from flask_cors import CORS

conn = sqlite3.connect("predict.sqlite")

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'SYNZ8vo6_1-MMc8T8nbWi6MLA_mlqK7eeU0nYVerBBE'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


def init_app(app):
    db.app = app
    db.init_app(app)


class Predict(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sprintId = db.Column(db.Integer, unique=True, nullable=False)
    sprintName = db.Column(db.String(255), nullable=False)
    storypointsCommitted = db.Column(db.Float, nullable=False)
    storypointsDelivered = db.Column(db.Float, nullable=False)
    velocityDifference = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return '< Sprint {sprintId} {sprintName} >'

    def serialize(self):
        return{
            'id': self.id,
            'sprintId': self.sprintId,
            'sprintName': self.sprintName,
            'storypointsCommitted': self.storypointsCommitted,
            'storypointsDelivered': self.storypointsDelivered,
            'velocityDifference': self.velocityDifference
        }


@app.route('/')
def index():
    return "This is the dummy backend app for velocity predictor."


@app.route('/predict', methods=['POST', 'GET'])
def predict():
    try:
        predict = Predict()
        predict.sprintId = request.json['sprintId']
        predict.sprintName = request.json['sprintName']
        predict.storypointsCommitted = request.json['storypointsCommitted']
        predict.storypointsDelivered = request.json['storypointsDelivered']
        predict.velocityDifference = predict.storypointsDelivered - \
            predict.storypointsCommitted

        db.session.add(predict)
        db.session.commit()

        response = {'message': 'Velocity calculated',
                    'result': predict.serialize()}
    except Exception as e:
        print(str(e))
        response = {'message': 'Calculation failed'}

    return jsonify(response)


init_app(app)
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run()
