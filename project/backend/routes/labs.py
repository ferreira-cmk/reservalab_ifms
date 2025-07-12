from flask import Blueprint, request, jsonify
from models import db, Lab
import uuid

labs_bp = Blueprint('labs', __name__)

@labs_bp.route('', methods=['GET'])
@labs_bp.route('/', methods=['GET'])
def get_labs():
    labs = Lab.query.all()
    return jsonify([lab.to_dict() for lab in labs])

@labs_bp.route('', methods=['POST'])
@labs_bp.route('/', methods=['POST'])  
def create_lab():
    data = request.json
    lab = Lab(
        id=str(uuid.uuid4()), 
        name=data['name'],
        category=data['category'],
        capacity=data['capacity'],
        description=data.get('description', ''),
        equipment=','.join(data.get('equipment', []))
    )
    db.session.add(lab)
    db.session.commit()
    return jsonify({'id': lab.id, 'message': 'Laboratório criado com sucesso'})

@labs_bp.route('/<lab_id>', methods=['PUT'])
def update_lab(lab_id):
    lab = Lab.query.get(lab_id)
    data = request.json
    if not lab:
        return jsonify({'message': 'Laboratório não encontrado'}), 404
    lab.name = data.get('name', lab.name)
    lab.category = data.get('category', lab.category)
    lab.capacity = data.get('capacity', lab.capacity)
    lab.description = data.get('description', lab.description)
    lab.equipment = ','.join(data.get('equipment', lab.equipment.split(',')))
    db.session.commit()
    return jsonify({'message': 'Laboratório atualizado com sucesso'})
