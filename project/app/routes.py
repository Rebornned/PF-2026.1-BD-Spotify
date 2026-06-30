from flask import Blueprint, render_template, request, jsonify
from sqlalchemy import text
from . import db
from .queries import (
    main_query,
    main_count_query,
    art_query,
    art_count_query,
    top_musicas_artista_query,
    genero_query,
    album_query,
    artistas_acima_media_query,
    musica_mais_popular_por_genero_query,
)

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return render_template("index.html")


# --- musicas ---
@main.route("/api/musicas")
def get_musicas():
    try:
        search_type  = request.args.get("search_type",  "ms_name")
        search_value = request.args.get("search_value", "")
        order_type   = request.args.get("order_type",   "popularity")
        order_mode   = request.args.get("order_mode",   "DESC").upper()
        limit        = int(request.args.get("limit", 20))
        page         = int(request.args.get("page",  1))
        offset       = (page - 1) * limit

        params = {"search_value": f"%{search_value}%"}

        rows = db.session.execute(
            text(main_query(order_type, search_type, limit, offset, order_mode)),
            params
        ).mappings().all()

        total = db.session.execute(
            text(main_count_query(search_type)),
            params
        ).scalar()

        return jsonify({
            "data":        [dict(r) for r in rows],
            "total":       total,
            "page":        page,
            "limit":       limit,
            "total_pages": -(-total // limit)  # divisão com teto
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- artistas ---
@main.route("/api/artistas")
def get_artistas():
    try:
        search_value = request.args.get("search_value", "")
        order_type   = request.args.get("order_type",   "popularity")
        order_mode   = request.args.get("order_mode",   "DESC").upper()
        limit        = int(request.args.get("limit", 20))
        page         = int(request.args.get("page",  1))
        offset       = (page - 1) * limit

        params = {"search_value": f"%{search_value}%"}

        rows = db.session.execute(
            text(art_query(limit, offset, order_type, order_mode)),
            params
        ).mappings().all()

        total = db.session.execute(
            text(art_count_query()),
            params
        ).scalar()

        return jsonify({
            "data":        [dict(r) for r in rows],
            "total":       total,
            "page":        page,
            "limit":       limit,
            "total_pages": -(-total // limit)
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# top musicas de um artista - nome passado como query param (?nome=...)
@main.route("/api/artistas/top-musicas")
def get_top_musicas_artista():
    try:
        nome  = request.args.get("nome", "")
        limit = int(request.args.get("limit", 5))

        rows = db.session.execute(
            text(top_musicas_artista_query(limit)),
            {"artista_nome": f"%{nome}%"}
        ).mappings().all()

        return jsonify([dict(r) for r in rows])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- generos ---
@main.route("/api/generos")
def get_generos():
    try:
        search_value = request.args.get("search_value", "")
        order_type   = request.args.get("order_type",   "gen_name")
        order_mode   = request.args.get("order_mode",   "ASC").upper()
        limit        = int(request.args.get("limit", 20))
        page         = int(request.args.get("page",  1))
        offset       = (page - 1) * limit

        rows = db.session.execute(
            text(genero_query(order_type, order_mode, limit, offset)),
            {"search_value": f"%{search_value}%"}
        ).mappings().all()

        return jsonify([dict(r) for r in rows])

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- albuns ---
@main.route("/api/albuns")
def get_albuns():
    try:
        search_value = request.args.get("search_value", "")
        order_type   = request.args.get("order_type",   "qtd_musicas")
        order_mode   = request.args.get("order_mode",   "DESC").upper()
        limit        = int(request.args.get("limit", 20))
        page         = int(request.args.get("page",  1))
        offset       = (page - 1) * limit

        rows = db.session.execute(
            text(album_query(order_type, order_mode, limit, offset)),
            {"search_value": f"%{search_value}%"}
        ).mappings().all()

        return jsonify([dict(r) for r in rows])

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- estatisticas fixas ---
@main.route("/api/estatisticas/artistas-destaque")
def get_artistas_destaque():
    try:
        limit = int(request.args.get("limit", 10))

        rows = db.session.execute(
            text(artistas_acima_media_query(limit)),
            {"limit": limit}
        ).mappings().all()

        return jsonify([dict(r) for r in rows])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main.route("/api/estatisticas/generos-destaque")
def get_generos_destaque():
    try:
        limit = int(request.args.get("limit", 113))  # 113 = total de generos no banco

        rows = db.session.execute(
            text(musica_mais_popular_por_genero_query(limit)),
            {"limit": limit}
        ).mappings().all()

        return jsonify([dict(r) for r in rows])

    except Exception as e:
        return jsonify({"error": str(e)}), 500
