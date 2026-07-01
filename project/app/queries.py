# ===================================================
#           Global variables for queries
# ===================================================
# ---------------------------------------------------
# search_fields: Armazena os campos de pesquisa para as consultas
# ---------------------------------------------------
SEARCH_FIELDS = {
    "ms_name": "MS.nome",
    "art_name": "ART.nome",
    "alb_name": "ALB.nome",
    "gen_name": "GEN.nome"
}

# ---------------------------------------------------
# order_types: Armazena os tipos de ordenação para as consultas
# ---------------------------------------------------
ORDER_TYPES = {
    "ms_popularity": "popularidade",
    "ms_duration": "MS.tempo_ms",
    "ms_name": "MS.nome",
    "alb_name": "ALB.nome",
    "gen_name": "GEN.nome",
    "nbo_musics": "qtd_musicas",
    "avg_popularity": "pop_media",
    "nbo_artists": "qtd_artistas",
    "null": "NULL"
}

# ===================================================
#                   Queries
# ===================================================
def main_query(order_type, search_type, offset, limit, order_mode = "DESC"):
    if SEARCH_FIELDS.get(search_type) is None:
        raise ValueError(f"Invalid search_type: {search_type}. Must be one of {list(SEARCH_FIELDS.keys())}.")
    if ORDER_TYPES.get(order_type) is None:
        raise ValueError(f"Invalid order_type: {order_type}. Must be one of {list(ORDER_TYPES.keys())}.")
    

    return f"""
        SELECT MS.nome AS ms_name, 
        ART.nome AS art_name,
        ALB.nome AS alb_name, 
        GEN.nome AS gen_name, 
        CONCAT(FLOOR(MS.tempo_ms / 60000), 'm',
            LPAD(FLOOR((MS.tempo_ms % 60000) / 1000), 2, '0'), 's') AS duracao,
        MS.popularidade AS popularidade,
        PT.tipo_participacao AS Atuacao
        FROM musica as MS
        JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao as PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista as ART ON ART.id_artista = PT.FK_ARTISTA_id_artista
        JOIN genero as GEN ON GEN.id_genero = MS.FK_GENERO_id_genero
        WHERE {SEARCH_FIELDS[search_type]} LIKE :search_value
        ORDER BY {ORDER_TYPES[order_type]} {order_mode}
        LIMIT {offset}, {limit}
        ;
    """

"""
---------------------------------------------------------------
main_query: Consulta principal para buscar músicas, artistas, 
álbuns e gêneros com base em critérios de pesquisa e ordenação.
---------------------------------------------------------------
""" 
 
# ************************************************************
#                          Query 2
# ************************************************************
def art_query(order_type, offset, limit,  order_mode = "DESC"):
    return f"""
        SELECT ART.nome AS artista,
            AVG(MS.popularidade) AS pop_media,
            COUNT(MS.id_track) AS qtd_musicas,
            COUNT(DISTINCT ALB.id_album) AS qtd_album
        FROM musica as MS
        JOIN album as ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY ART.id_artista
        HAVING ART.nome LIKE :search_value
        ORDER BY {ORDER_TYPES[order_type]} {order_mode}
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
art_query: Consulta que retorna informações sobre artistas, 
incluindo a média de popularidade das músicas, a quantidade de 
músicas e a quantidade de álbuns associados a cada artista. 
A consulta permite filtrar os resultados com base no nome do 
artista e suporta paginação através dos parâmetros limit e offset.
------------------------------------------------------------------
""" 

# ************************************************************
#                          Query 3
# ************************************************************
def pop_msc_art_query(offset, limit):
    return f"""
        SELECT ART.nome AS artista,
            MS.nome AS musica,
            MS.popularidade AS popularidade
        FROM musica AS MS
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        WHERE ART.nome LIKE :search_value
        ORDER BY MS.popularidade DESC
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
pop_msc_art_query: Consulta que retorna as músicas mais populares 
de um artista específico.
------------------------------------------------------------------
""" 

# ************************************************************
#                          Query 4
# ************************************************************
def gen_query(order_type, offset, limit, order_mode = "DESC"):
    return f"""
        SELECT GEN.nome AS genero, 
            COUNT(DISTINCT MS.id_track) AS qtd_musicas,
            AVG(MS.popularidade) AS pop_media,
            COUNT(DISTINCT ART.id_artista) AS qtd_artistas
        FROM musica AS MS 
        JOIN genero AS GEN ON MS.FK_GENERO_id_genero = GEN.id_genero
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY GEN.id_genero
        HAVING GEN.nome LIKE :search_value
        ORDER BY {ORDER_TYPES[order_type]} {order_mode}
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
gen_query: Consulta que retorna informações sobre gêneros musicais,
incluindo a quantidade de músicas, a popularidade média e a 
quantidade de artistas associados a cada gênero.
------------------------------------------------------------------
""" 

# ************************************************************
#                          Query 5
# ************************************************************
def album_query(order_type, offset, limit, order_mode = "DESC"):
    return f"""
       SELECT ALB.nome AS album,
            COUNT(DISTINCT MS.id_track) AS qtd_musicas,
            AVG(MS.popularidade) AS pop_media,
            COUNT(DISTINCT ART.id_artista) AS qtd_artistas
        FROM album AS ALB
        LEFT JOIN musica AS MS ON ALB.id_album = MS.FK_ALBUM_id_album
        LEFT JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        LEFT JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY ALB.id_album, ART.nome
        HAVING ART.nome LIKE :search_value
        ORDER BY {ORDER_TYPES[order_type]} {order_mode}
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
album_query: Consulta que retorna informações sobre álbuns, 
incluindo a quantidade de músicas, a popularidade média e a 
quantidade de artistas associados a cada álbum. 
A consulta permite filtrar os resultados com base no nome do álbum
e suporta paginação através dos parâmetros limit e offset.
------------------------------------------------------------------
""" 

# ************************************************************
#                          Query 6
# ************************************************************
def art_avg_msc_query(offset, limit):
    return f"""
        SELECT ART.nome, 
            COUNT(*) AS total_musicas
        FROM artista ART
        JOIN participacao PT
            ON ART.id_artista = PT.FK_ARTISTA_id_artista
        GROUP BY ART.id_artista, ART.nome
        HAVING COUNT(*) >
        (
            SELECT AVG(qtd)
            FROM (
                SELECT COUNT(*) AS qtd
                FROM participacao
                GROUP BY FK_ARTISTA_id_artista
            ) AS media_artistas
        )
        ORDER BY total_musicas DESC
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
art_avg_msc_query: Consulta que retorna informações sobre artistas 
cuja quantidade de músicas é maior que a média de músicas por artista. 
A consulta inclui o nome do artista e a quantidade total de músicas associadas a ele.
A consulta suporta paginação através dos parâmetros limit e offset.
------------------------------------------------------------------
""" 

# ************************************************************
#                          Query 7
# ************************************************************
def top_gen_msc_query(offset, limit):
    return f"""
        SELECT
            GEN.nome AS genero,
            MS.nome AS musica,
            MS.popularidade
        FROM musica MS
        JOIN genero GEN
        ON GEN.id_genero = MS.FK_GENERO_id_genero
        JOIN (
            SELECT
                FK_GENERO_id_genero,
                MAX(popularidade) AS max_pop
            FROM musica
            GROUP BY FK_GENERO_id_genero
        ) ranking
            ON ranking.FK_GENERO_id_genero = MS.FK_GENERO_id_genero
        AND ranking.max_pop = MS.popularidade
        ORDER BY GEN.nome
        LIMIT {offset}, {limit}
        ;
    """

"""
------------------------------------------------------------------
top_gen_msc_query: Consulta que retorna as músicas mais populares de cada gênero.
A consulta inclui o nome do gênero, o nome da música e sua popularidade.
A consulta suporta paginação através dos parâmetros limit e offset.
------------------------------------------------------------------
""" 