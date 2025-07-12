from flask import Blueprint, request, jsonify
from models import db, User
import uuid
from flask_cors import cross_origin

users_bp = Blueprint('users', __name__)

@users_bp.route('', methods=['GET'])
@cross_origin() 
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@users_bp.route('', methods=['POST'])
@cross_origin()
def create_user():
    admin_key = request.headers.get('X-Admin-Key')
    if admin_key != 'seu_segredo_admin':  
        return jsonify({'error': 'Acesso negado'}), 403

    data = request.json
    if not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email já cadastrado'}), 400

    user = User(
        id=data.get('id', str(uuid.uuid4())),
        name=data['name'],
        email=data['email'],
        role=data.get('role', 'user')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Usuário criado com sucesso'}), 201

@users_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()  
def login():
    if request.method == 'OPTIONS':
    
        return jsonify({}), 200

    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email e senha são obrigatórios'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify(user.to_dict()), 200
    return jsonify({'error': 'Credenciais inválidas'}), 401
