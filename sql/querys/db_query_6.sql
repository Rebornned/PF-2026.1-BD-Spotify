USE spotify_db;
-- ==================================
-- 			Consulta nº 4
-- ==================================
-- Consulta Secundária, Retorna as musicas acima da média de popularidade
-- **********************************
SELECT
    M.nome,
    M.popularidade,
    G.nome AS genero
FROM musica M
JOIN genero G
    ON M.FK_GENERO_id_genero = G.id_genero
WHERE M.FK_GENERO_id_genero IN
(
    SELECT id_genero
    FROM genero
    WHERE nome = 'Rock'
);
;
