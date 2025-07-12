Sistema de Agendamento de Laboratórios IF


-> Funcionalidades

Cadastro de Laboratórios 

Agendamento de Laboratórios

Agendamento para todo o dia ou por faixa de horário

Prevenção de conflito de horários

Exibição de disponibilidade no calendário (cores para ocupado, parcialmente ocupado e disponível)

Visualização dos próprios agendamentos

Painel de Administração

Proteção de rotas conforme o tipo de usuário

-> Tecnologias Utilizadas
Frontend
React

TypeScript

TailwindCSS (opcional)

React Router DOM

Backend
Flask

Flask SQLAlchemy

Flask CORS

Werkzeug Security (hash de senha)

SQLite

-> Instalação e Execução
1. Clone o repositório
bash
Copiar
Editar
2. Backend (Flask + SQLite)
bash
Copiar
Editar
cd backend
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate no Windows
pip install -r requirements.txt
python app.py
O backend rodará por padrão em http://localhost:5000

3. Frontend (React)
bash
Copiar
Editar
cd project
npm install
npm run dev
O frontend rodará por padrão em http://localhost:3000

-> Estrutura das Pastas
project/
│
├── backend/
│   ├── __pycache__/
│   ├── instance/    #arquivo do banco de de dados
│   │   └── app      # arquivo de banco SQLite
│   ├── routes/
│   │   ├── __pycache__/
│   │   ├── bookings
│   │   ├── labs
│   │   └── users
│   ├── venv/                  # ambiente virtual Python
│   ├── app                    # arquivo Python
│   ├── app.db                 # (caso exista fora da pasta instance, pode remover se duplicado)
│   ├── config                 # arquivo Python
│   ├── create_admin           # arquivo Python
│   ├── createTabledb          # arquivo Python
│   ├── models                 # arquivo Python
│   ├── requirements           # arquivo TXT
│
├── src/
│   ├── assets/                # Imagens
│   ├── components/
│   │   ├── AdminPanel
│   │   ├── BookingModal
│   │   ├── Calendar
│   │   ├── Confirmation
│   │   ├── Dashboard
│   │   ├── LabEdit
│   │   ├── LabForm
│   │   ├── LabRegister
│   │   ├── Login
│   │   ├── MyBookings
│   │   ├── PrivateRoute
│   │   ├── StudentForm
│   │   ├── StudentRegister
│   │   ├── UserForm
│   │   └── UserRegister
│   ├── context/
│   │   └── AppContext
│   ├── data/
│   │   └── mockData.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── types.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
│
└── (demais arquivos da raiz caso existam)

-> Permissões e Fluxo
Somente administradores podem cadastrar novos laboratórios e usuários. #só um adendo esta era a ideia até o fim, porém acabou que de ultima hora o codigo bugou quando implementamos outra funcionalidade e a funcionalidade do Login teve que ser retirada, com isso as permissões de administradores também, porque se nao o usuario ficaria travado na tela de login que nao funciona

Usuários comuns podem apenas agendar e visualizar seus agendamentos.

Validação de conflito de horário é feita tanto no frontend quanto no backend.

O calendário mostra visualmente os dias ocupados, parcialmente ocupados e disponíveis.

-> Endpoints principais do backend
POST /login — Login de usuário

GET /users — Listar usuários (admin)

POST /users — Criar usuário (admin)

GET /labs — Listar laboratórios

POST /labs — Criar laboratório (admin)

PUT /labs/<lab_id> — Editar laboratório (admin)

GET /bookings — Listar agendamentos por laboratório/ano/mês

POST /bookings — Criar agendamento

