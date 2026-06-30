# ===================================================
#                   Imports
# ===================================================
from flask import Blueprint, render_template, session
from sqlalchemy import text
from . import db
from .queries import *
from .models import Musica, Album, Genero, Artista, Participacao

# ===================================================
#           Global variables for routes
# ===================================================
main = Blueprint("main", __name__)

# ===================================================
#                       Routes
# ===================================================
# ***************************************************
#                     Main route
# ***************************************************
@main.route("/")
def index():
    return render_template(
        "index.html",
    )

@main.route("/old_index")
def old_index():
    return render_template(
        "old_index.html",
    )
# ***************************************************
#                     Music route
# ***************************************************
@main.route("/pages/musicas")
def pagina_musicas():
    return render_template("pages/musicas.html")

# ***************************************************
#                     Gender route
# ***************************************************
@main.route("/pages/generos")
def pagina_generos():
    return render_template("pages/generos.html")

# ***************************************************
#                   Artists route
# ***************************************************
@main.route("/pages/artistas")
def pagina_artistas():
    return render_template("pages/artistas.html")

# ***************************************************
#                   Statistics route
# ***************************************************
@main.route("/pages/estatisticas")
def pagina_estatisticas():
    return render_template("pages/estatisticas.html")

# ***************************************************
#                  Route 2 - base
# ***************************************************
@main.route("/base")
def base():
    s_value = ""
    query = db.session.execute(
    text(
        main_query(
        order_type="ms_popularity", 
        search_type="ms_name", 
        offset=0,
        limit=20,
        order_mode="DESC"
        )),
        {
        "search_value": f"%{s_value}%"
        }
    )
    
    result = query.mappings().all()
    #print(result)
    # --------------------------------------
    #               Render
    # --------------------------------------
    return render_template(
        "base.html",

        musicas=result
        
    )


# ***************************************************
#                  Test Routes
# ***************************************************
# Rota secundarias para teste
@main.route("/test/query_1")
def test_q1():
    s_value = ""
    query = db.session.execute(
        text(
            main_query(
            order_type="ms_popularity", 
            search_type="ms_name", 
            offset=0,
            limit=5,
            order_mode="DESC"
            )),
        {
            "search_value": f"%{s_value}%"
        }
    )
    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    #print(result)
    #for musica in Musica.query.all():
        #print(f"Nome: {musica.nome}")
    return "Rota de teste 1 funcionando!"

@main.route("/test/query_2")
def test_q2():
    s_value = ""
    query = db.session.execute(
        text(
            art_query(
                order_type="avg_popularity", 
                offset=0,
                limit=5,
                order_mode="DESC"
            )
        ),
        {
            "search_value": f"%{s_value}%"
        }
    )    
    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 2 funcionando!"

@main.route("/test/query_3")
def test_q3():
    s_value = "Rihanna"
    query = db.session.execute(
        text(
            pop_msc_art_query(
                offset=0,
                limit=5,
            )
        ),
        {
            "search_value": f"%{s_value}%"
        }
    )    
    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 3 funcionando!"

@main.route("/test/query_4")
def test_q4():
    s_value = ""
    query = db.session.execute(
        text(
            gen_query( 
                order_type="gen_name", 
                offset=0,
                limit=5,
                order_mode="ASC"
            )
        ),
        {
            "search_value": f"%{s_value}%"
        }
    )    
    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 4 funcionando!"

@main.route("/test/query_5")
def test_q5():
    s_value = ""
    query = db.session.execute(
        text(
            album_query( 
                offset=0,
                limit=5,
                order_mode="DESC"
            )
        ),
        {
            "search_value": f"%{s_value}%"
        }
    )    
    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 5 funcionando!"

@main.route("/test/query_6")
def test_q6():
    query = db.session.execute(
        text(
            art_avg_msc_query( 
                offset=0,
                limit=5,
            )
        ),
    )    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 6 funcionando!"

@main.route("/test/query_7")
def test_q7():
    query = db.session.execute(
        text(
            top_gen_msc_query( 
                offset=0,
                limit=5,
            )
        ),
    )    
    result = query.mappings().all()
    for field in result:
        print(field, "\n")
        
    return "Rota de teste 7 funcionando!"
