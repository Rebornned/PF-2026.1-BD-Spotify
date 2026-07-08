import os 
import time
import logging
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.engine import Engine

db = SQLAlchemy()

logging.basicConfig()
logger = logging.getLogger("sql_perf")
logger.setLevel(logging.INFO)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object("app.config.Config")
    
    # Inicializa o banco no app
    db.init_app(app)

    # ====================================================================
    # OUVINTES DE EVENTO (MONITOR DE PERFORMANCE DE QUERIES EM MS)
    # ====================================================================
    
    @event.listens_for(Engine, "before_cursor_execute")
    def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
        context._query_start_time = time.time()

    @event.listens_for(Engine, "after_cursor_execute")
    def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
        tempo_execucao = (time.time() - context._query_start_time) * 1000
        
        sql_limpo = " ".join(statement.split())
        sql_resumido = sql_limpo[:100] + "..." if len(sql_limpo) > 100 else sql_limpo

        logger.info(f"\033[93m⏱️  [MySQL] {tempo_execucao:.2f}ms\033[0m | {sql_resumido}")

    # ====================================================================

    from .routes import main
    app.register_blueprint(main)

    return app