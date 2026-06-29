from flask import Blueprint, render_template, session
from sqlalchemy import text
from . import db
from .queries import CONSULTA_PRINCIPAL
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
    query_1 = db.session.execute(
        text(CONSULTA_PRINCIPAL)
    )
    result = query_1.mappings().all()
    for name in result:
        print(name["Musica"], name["Artista"])
    #print(result)
    #for musica in Musica.query.all():
        #print(f"Nome: {musica.nome}")
    return "Rota de teste funcionando!"