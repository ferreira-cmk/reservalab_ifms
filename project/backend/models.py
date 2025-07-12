from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import uuid

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  

    def set_password(self, raw_password):
        self.password = bcrypt.generate_password_hash(raw_password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }

class Lab(db.Model):
    __tablename__ = 'lab'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    equipment = db.Column(db.String)  

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "capacity": self.capacity,
            "description": self.description,
            "equipment": self.equipment.split(',') if self.equipment else []
        }

class Booking(db.Model):
    __tablename__ = 'booking'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    lab_id = db.Column(db.String, db.ForeignKey('lab.id'), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.String, nullable=False) 
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    all_day = db.Column(db.Boolean, default=True)
    purpose = db.Column(db.String)
    students = db.Column(db.Integer, default=0)
    status = db.Column(db.String, default='pending')
    recurring = db.Column(db.Boolean, default=False)
    recurring_count = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "labId": self.lab_id,
            "userId": self.user_id,
            "date": self.date,
            "startTime": self.start_time,
            "endTime": self.end_time,
            "allDay": self.all_day,
            "purpose": self.purpose,
            "students": self.students,
            "status": self.status,
            "recurring": self.recurring,
            "recurringCount": self.recurring_count
        }
