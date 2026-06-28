USE spotify_db;
-- ==================================
-- 			Consulta nº 4
-- ==================================
-- Consulta Secundária, Retorna as musicas acima da média de popularidade
-- **********************************
SELECT 
    AVG(MS.popularidade)
FROM musica AS MS
GROUP BY MS.popularidade
-- HAVING MS.popularidade > 10
-- WHERE MS.popularidade > AVG(MS.popularidade) -- (
-- 	SELECT AVG(MS.popularidade) FROM musica
-- )
;
