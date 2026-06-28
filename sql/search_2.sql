USE spotify_db;
-- ==================================
-- 			Consulta nº 2
-- ==================================
-- Consulta Secundária, Retorna quantidade de músicas por gênero.
-- **********************************
SELECT GEN.nome AS genero, 
	AVG(MS.popularidade) AS pop_media,
    AVG(MS.tempo_ms) / 60000 AS duracao_media,
	COUNT(MS.id_track) AS qtd_musicas
FROM musica as MS 
JOIN genero as GEN ON MS.FK_GENERO_id_genero = GEN.id_genero
GROUP BY GEN.id_genero
ORDER BY pop_media DESC;
