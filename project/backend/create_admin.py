from app import app, db
from models import User

with app.app_context():
    admin_email = 'admin@exemplo.com'

    admin_antigo = User.query.filter_by(email=admin_email).first()
    if admin_antigo:
        db.session.delete(admin_antigo)
        db.session.commit()
        print("Admin antigo apagado.")

    admin = User(
        id='admin-001',
        name='Administrador',
        email=admin_email,
        role='admin'
    )
    admin.set_password('suaSenhaSegura123')  
    db.session.add(admin)
    db.session.commit()

    print("Admin criado com email:", admin_email)
    print("Senha:", "suaSenhaSegura123")
