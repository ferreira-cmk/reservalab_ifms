from flask import Blueprint, request, jsonify
from models import db, Booking
import uuid

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/user/<user_id>', methods=['GET'])
def get_bookings_by_user(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    return jsonify([b.to_dict() for b in bookings]), 200

@bookings_bp.route('', methods=['GET'])
@bookings_bp.route('/', methods=['GET'])
def get_bookings():
    lab_id = request.args.get('lab_id')
    year = request.args.get('year')
    month = request.args.get('month')

    query = Booking.query
    if lab_id:
        query = query.filter_by(lab_id=lab_id)
    if year and month:
        query = query.filter(Booking.date.like(f'{year}-{month.zfill(2)}-%'))

    bookings = query.all()
    return jsonify([b.to_dict() for b in bookings]), 200

@bookings_bp.route('', methods=['POST'])
@bookings_bp.route('/', methods=['POST'])
def create_booking():
    data = request.json

    def get_from_data(keys, default=None):
        for k in keys:
            if k in data:
                return data[k]
        return default

    booking = Booking(
        id=get_from_data(['id'], str(uuid.uuid4())),
        lab_id=get_from_data(['lab_id', 'labId']),
        user_id=get_from_data(['user_id', 'userId']),
        date=get_from_data(['date']),
        start_time=get_from_data(['start_time', 'startTime']),
        end_time=get_from_data(['end_time', 'endTime']),
        all_day=get_from_data(['all_day', 'allDay'], True),
        purpose=get_from_data(['purpose'], ''),
        students=get_from_data(['students'], 0),
        status=get_from_data(['status'], 'pending'),
        recurring=get_from_data(['recurring'], False),
        recurring_count=get_from_data(['recurring_count', 'recurringCount'])
    )



    if not (booking.lab_id and booking.user_id and booking.date and booking.start_time and booking.end_time):
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    db.session.add(booking)
    db.session.commit()
    return jsonify({'id': booking.id, 'message': 'Reserva criada com sucesso'}), 201

@bookings_bp.route('/<booking_id>', methods=['PUT'])
def update_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'message': 'Reserva não encontrada'}), 404
    data = request.json

    for key in ['lab_id', 'user_id', 'date', 'start_time', 'end_time', 'all_day', 'purpose', 'students', 'status', 'recurring', 'recurring_count']:
        val = data.get(key)
        if val is not None:
            setattr(booking, key, val)

    db.session.commit()
    return jsonify({'message': 'Reserva atualizada com sucesso'}), 200

@bookings_bp.route('/<booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'message': 'Reserva não encontrada'}), 404

    db.session.delete(booking)
    db.session.commit()
    return jsonify({'message': 'Reserva cancelada com sucesso'}), 200
