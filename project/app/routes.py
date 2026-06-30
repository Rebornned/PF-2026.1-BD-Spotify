from flask import Blueprint, render_template, session
from sqlalchemy import text
from . import db
from .queries import main_query
from .models import Musica, Album, Genero, Artista, Participacao

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return render_template(
        "index.html",
    )

# Rota secundaria para teste
@main.route("/test")
def test():
    s_value = ""

    query_1 = db.session.execute(
        text(
            main_query(
            order_type="popularity", 
            search_type="ms_name", 
            limit=5, 
            offset=0,
            order_mode="DESC"
            )),
        {
            "search_value": f"%{s_value}%"
        }
    )
    result = query_1.mappings().all()
    for field in result:
        print(field, "\n")
        
    #print(result)
    #for musica in Musica.query.all():
        #print(f"Nome: {musica.nome}")
    return "Rota de teste funcionando!"