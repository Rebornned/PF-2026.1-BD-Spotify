import os
from dotenv import load_dotenv

# ====================================================
#           Configuração da Flask API
# ====================================================
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    
    # 2. Se não existir (Local), ele monta a string do MySQL usando seu código atual
    if not SQLALCHEMY_DATABASE_URI:
        SQLALCHEMY_DATABASE_URI = (
            f"mysql+pymysql://"
            f"{os.getenv('DB_USER')}:"
            f"{os.getenv('DB_PASSWORD')}@"
            f"{os.getenv('DB_HOST')}:"
            f"{os.getenv('DB_PORT')}/"
            f"{os.getenv('DB_NAME')}"
        )
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False