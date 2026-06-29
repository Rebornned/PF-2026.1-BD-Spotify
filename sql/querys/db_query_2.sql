USE spotify_db;
-- ==================================
-- 			Consulta nº 2
-- ==================================
-- Consulta Secundária, Retorna as estatistícas dos artistas
-- **********************************
SELECT ART.nome AS artista,
	AVG(MS.popularidade) AS popularidade,
    COUNT(MS.id_track) AS qtd_musicas,
    COUNT(DISTINCT ALB.id_album) AS qtd_album
FROM musica as MS
JOIN album as ALB ON MS.FK_ALBUM_id_album = ALB.id_album
JOIN participacao AS PT ON MS.id_track = PT.FK_MUSICA_id_track
JOIN artista AS ART ON PT.FK_ARTISTA_id_artista = ART.id_artista
GROUP BY ART.id_artista
HAVING ART.nome LIKE "%%"
LIMIT 5 OFFSET 0
;
