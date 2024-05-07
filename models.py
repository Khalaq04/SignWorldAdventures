from database import db

class users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    usn = db.Column(db.Text)
    pwd = db.Column(db.Text)
    q1 = db.Column(db.Numeric)
    q2 = db.Column(db.Numeric)
    q3 = db.Column(db.Numeric)
    q4 = db.Column(db.Numeric)
    q5 = db.Column(db.Numeric)
    q6 = db.Column(db.Numeric)
    unlk = db.Column(db.Integer)