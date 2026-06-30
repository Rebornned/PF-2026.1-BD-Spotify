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
    "popularity": "MS.popularidade",
    "duration": "MS.tempo_ms",
    "ms_name": "MS.nome",
    "alb_name": "ALB.nome",
}

# ===================================================
#                   Queries
# ===================================================
def main_query(order_type, search_type, limit, offset, order_mode = "DESC"):
    if SEARCH_FIELDS.get(search_type) is None:
        raise ValueError(f"Invalid search_type: {search_type}. Must be one of {list(SEARCH_FIELDS.keys())}.")
    if ORDER_TYPES.get(order_type) is None:
        raise ValueError(f"Invalid order_type: {order_type}. Must be one of {list(ORDER_TYPES.keys())}.")
    

    return f"""
        SELECT MS.nome AS Musica, 
        ART.nome AS Artista,
        ALB.nome AS Album, 
        GEN.nome AS Genero, 
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
# ************************************************************
def art_query(limit, offset):
    return f"""
        SELECT ART.nome AS artista,
            AVG(MS.popularidade) AS popularidade,
            COUNT(MS.id_track) AS qtd_musicas,
            COUNT(DISTINCT ALB.id_album) AS qtd_album
        FROM musica as MS
        JOIN album as ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY ART.id_artista
        HAVING ART.nome LIKE :search_value
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
# ************************************************************
