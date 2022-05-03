from flask_sqlalchemy import SQLAlchemy

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
    velocity_difference = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return '<Sprint {sprintId} {sprintName}>'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def serialize(self):
        return{
            'id': self.id,
            'sprintId': self.sprintId,
            'sprintName': self.sprintName,
            'storypointsCommitted': self.storypointsCommitted,
            'storypointsDelivered': self.storypointsDelivered,
            # 'velocity_difference': self.velocity_difference
        }
