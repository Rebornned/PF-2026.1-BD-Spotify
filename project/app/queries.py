# campos de busca disponiveis para a consulta principal
SEARCH_FIELDS = {
    "ms_name": "MS.nome",
    "art_name": "ART.nome",
    "alb_name": "ALB.nome",
    "gen_name": "GEN.nome"
}

# campos de ordenacao disponiveis para a consulta principal
ORDER_TYPES = {
    "popularity": "MS.popularidade",
    "duration": "MS.tempo_ms",
    "ms_name": "MS.nome",
    "alb_name": "ALB.nome",
}

# ordenacao para artistas
ART_ORDER_TYPES = {
    "popularity": "AVG(MS.popularidade)",
    "qtd_musicas": "COUNT(MS.id_track)",
    "qtd_album": "COUNT(DISTINCT ALB.id_album)",
    "art_name": "ART.nome",
}

# ordenacao para generos
GEN_ORDER_TYPES = {
    "gen_name": "GEN.nome",
    "qtd_musicas": "COUNT(DISTINCT MS.id_track)",
    "pop_media": "AVG(MS.popularidade)",
    "qtd_artistas": "COUNT(DISTINCT ART.id_artista)",
}

# ordenacao para albuns
ALB_ORDER_TYPES = {
    "qtd_musicas": "COUNT(DISTINCT MS.id_track)",
    "pop_media": "AVG(MS.popularidade)",
    "qtd_artistas": "COUNT(DISTINCT ART.id_artista)",
    "alb_name": "ALB.nome",
}

ORDER_MODES = {"ASC", "DESC"}


# busca musicas com filtro, ordenacao e paginacao
def main_query(order_type, search_type, limit, offset, order_mode="DESC"):
    if search_type not in SEARCH_FIELDS:
        raise ValueError(f"search_type inválido: '{search_type}'. Permitidos: {list(SEARCH_FIELDS.keys())}")
    if order_type not in ORDER_TYPES:
        raise ValueError(f"order_type inválido: '{order_type}'. Permitidos: {list(ORDER_TYPES.keys())}")
    if order_mode not in ORDER_MODES:
        raise ValueError(f"order_mode inválido: '{order_mode}'. Use 'ASC' ou 'DESC'.")

    return f"""
        SELECT MS.nome AS Musica,
            ART.nome AS Artista,
            ALB.nome AS Album,
            GEN.nome AS Genero,
            CONCAT(FLOOR(MS.tempo_ms / 60000), 'm',
                LPAD(FLOOR((MS.tempo_ms % 60000) / 1000), 2, '0'), 's') AS duracao,
            MS.popularidade AS popularidade,
            PT.tipo_participacao AS Atuacao
        FROM musica AS MS
        JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON ART.id_artista = PT.FK_ARTISTA_id_artista
        JOIN genero AS GEN ON GEN.id_genero = MS.FK_GENERO_id_genero
        WHERE {SEARCH_FIELDS[search_type]} LIKE :search_value
        ORDER BY {ORDER_TYPES[order_type]} {order_mode}
        LIMIT {int(offset)}, {int(limit)}
    """


# contagem total de musicas para paginacao
def main_count_query(search_type):
    if search_type not in SEARCH_FIELDS:
        raise ValueError(f"search_type inválido: '{search_type}'.")

    return f"""
        SELECT COUNT(DISTINCT MS.id_track) AS total
        FROM musica AS MS
        JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON ART.id_artista = PT.FK_ARTISTA_id_artista
        JOIN genero AS GEN ON GEN.id_genero = MS.FK_GENERO_id_genero
        WHERE {SEARCH_FIELDS[search_type]} LIKE :search_value
    """


# busca artistas com estatisticas, filtro, ordenacao e paginacao
def art_query(limit, offset, order_type="popularity", order_mode="DESC"):
    if order_type not in ART_ORDER_TYPES:
        raise ValueError(f"order_type inválido: '{order_type}'. Permitidos: {list(ART_ORDER_TYPES.keys())}")
    if order_mode not in ORDER_MODES:
        raise ValueError(f"order_mode inválido: '{order_mode}'. Use 'ASC' ou 'DESC'.")

    return f"""
        SELECT ART.nome AS artista,
            AVG(MS.popularidade) AS popularidade,
            COUNT(MS.id_track) AS qtd_musicas,
            COUNT(DISTINCT ALB.id_album) AS qtd_album
        FROM musica AS MS
        JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY ART.id_artista, ART.nome
        HAVING ART.nome LIKE :search_value
        ORDER BY {ART_ORDER_TYPES[order_type]} {order_mode}
        LIMIT {int(offset)}, {int(limit)}
    """


# contagem total de artistas para paginacao
def art_count_query():
    return """
        SELECT COUNT(DISTINCT ART.id_artista) AS total
        FROM artista AS ART
        JOIN participacao AS PT ON ART.id_artista = PT.FK_ARTISTA_id_artista
        JOIN musica AS MS ON PT.FK_MUSICA_id_track = MS.id_track
        JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
        WHERE ART.nome LIKE :search_value
    """


# top musicas de um artista ordenadas por popularidade
def top_musicas_artista_query(limit=5):
    return f"""
        SELECT ART.nome AS artista,
            MS.nome AS musica,
            MS.popularidade AS popularidade
        FROM musica AS MS
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        WHERE ART.nome LIKE :artista_nome
        ORDER BY MS.popularidade DESC
        LIMIT {int(limit)}
    """


# estatisticas por genero com filtro, ordenacao e paginacao
def genero_query(order_type="gen_name", order_mode="ASC", limit=None, offset=0):
    if order_type not in GEN_ORDER_TYPES:
        raise ValueError(f"order_type inválido: '{order_type}'. Permitidos: {list(GEN_ORDER_TYPES.keys())}")
    if order_mode not in ORDER_MODES:
        raise ValueError(f"order_mode inválido: '{order_mode}'. Use 'ASC' ou 'DESC'.")

    limit_clause = f"LIMIT {int(offset)}, {int(limit)}" if limit is not None else ""

    return f"""
        SELECT GEN.nome AS genero,
            COUNT(DISTINCT MS.id_track) AS qtd_musicas,
            AVG(MS.popularidade) AS pop_media,
            COUNT(DISTINCT ART.id_artista) AS qtd_artistas
        FROM musica AS MS
        JOIN genero AS GEN ON MS.FK_GENERO_id_genero = GEN.id_genero
        JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY GEN.id_genero, GEN.nome
        HAVING GEN.nome LIKE :search_value
        ORDER BY {GEN_ORDER_TYPES[order_type]} {order_mode}
        {limit_clause}
    """


# estatisticas por album com filtro, ordenacao e paginacao
def album_query(order_type="qtd_musicas", order_mode="DESC", limit=20, offset=0):
    if order_type not in ALB_ORDER_TYPES:
        raise ValueError(f"order_type inválido: '{order_type}'. Permitidos: {list(ALB_ORDER_TYPES.keys())}")
    if order_mode not in ORDER_MODES:
        raise ValueError(f"order_mode inválido: '{order_mode}'. Use 'ASC' ou 'DESC'.")

    return f"""
        SELECT ALB.nome AS album,
            COUNT(DISTINCT MS.id_track) AS qtd_musicas,
            AVG(MS.popularidade) AS popularidade_media,
            COUNT(DISTINCT ART.id_artista) AS qtd_artistas
        FROM album AS ALB
        LEFT JOIN musica AS MS ON ALB.id_album = MS.FK_ALBUM_id_album
        LEFT JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
        LEFT JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
        GROUP BY ALB.id_album, ALB.nome
        HAVING ALB.nome LIKE :search_value
        ORDER BY {ALB_ORDER_TYPES[order_type]} {order_mode}
        LIMIT {int(offset)}, {int(limit)}
    """


# artistas com numero de musicas acima da media geral
def artistas_acima_media_query(limit=10):
    return """
        SELECT ART.nome, COUNT(*) AS total_musicas
        FROM artista ART
        JOIN participacao PT ON ART.id_artista = PT.FK_ARTISTA_id_artista
        GROUP BY ART.id_artista, ART.nome
        HAVING COUNT(*) > (
            SELECT AVG(qtd)
            FROM (
                SELECT COUNT(*) AS qtd
                FROM participacao
                GROUP BY FK_ARTISTA_id_artista
            ) AS media_artistas
        )
        ORDER BY total_musicas DESC
        LIMIT :limit
    """


# musica mais popular de cada genero
def musica_mais_popular_por_genero_query(limit=113):
    return """
        SELECT
            GEN.nome AS genero,
            MS.nome AS musica,
            MS.popularidade
        FROM musica MS
        JOIN genero GEN ON GEN.id_genero = MS.FK_GENERO_id_genero
        JOIN (
            SELECT FK_GENERO_id_genero, MAX(popularidade) AS max_pop
            FROM musica
            GROUP BY FK_GENERO_id_genero
        ) ranking
            ON ranking.FK_GENERO_id_genero = MS.FK_GENERO_id_genero
            AND ranking.max_pop = MS.popularidade
        ORDER BY GEN.nome
        LIMIT :limit
    """
