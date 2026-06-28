USE spotify_db;
-- ==================================
-- 			Consulta nº 1
-- ==================================
-- Consulta Principal, Retorna todas as informações.
-- **********************************
SELECT ART.nome AS Artista, 
	MS.nome AS Musica, 
	ALB.nome AS Album, 
	GEN.nome AS Genero, 
	PT.tipo_participacao AS Atuacao 
FROM musica as MS
JOIN album AS ALB ON MS.FK_ALBUM_id_album = ALB.id_album
JOIN participacao as PT ON MS.id_track = PT.FK_MUSICA_id_track
JOIN artista as ART ON ART.id_artista = PT.FK_ARTISTA_id_artista
JOIN genero as GEN ON GEN.id_genero = MS.FK_GENERO_id_genero
WHERE MS.nome LIKE "This Is What You Came For"
;
