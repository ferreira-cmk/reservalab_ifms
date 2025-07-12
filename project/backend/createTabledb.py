import os
from app import app, db
from models import Lab, User
from werkzeug.security import generate_password_hash

instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
if not os.path.exists(instance_path):
    os.makedirs(instance_path)

with app.app_context():
    db.create_all()

    labs_fixos = [
        {
            'id': 'lab-tec-001',
            'name': 'Laboratório de Tecnologia 1',
            'category': 'tecnologia',
            'capacity': 10,
            'description': 'Laboratório padrão de tecnologia',
            'equipment': 'PC,Projetor,Impressora'
        },
        {
            'id': 'lab-ele-001',
            'name': 'Laboratório de Eletrônica 1',
            'category': 'eletronica',
            'capacity': 8,
            'description': 'Laboratório padrão de eletrônica',
            'equipment': 'Osciloscópio,Fonte de alimentação,Multímetro'
        }
    ]

    for lab_data in labs_fixos:
        lab_existente = db.session.get(Lab, lab_data['id'])
        if not lab_existente:
            lab = Lab(**lab_data)
            db.session.add(lab)

    db.session.flush()

    admin_email = 'admin@exemplo.com'
    admin_existente = User.query.filter_by(email=admin_email).first()
    if not admin_existente:
        admin = User(
            id='admin-001',
            name='Administrador',
            email=admin_email,
            role='admin'
        )
        admin.password = generate_password_hash('suaSenhaSegura123')
        db.session.add(admin)

    db.session.commit()

    print("Banco criado/atualizado com labs fixos e usuário admin configurado.")

print("DB URI:", app.config['SQLALCHEMY_DATABASE_URI'])

