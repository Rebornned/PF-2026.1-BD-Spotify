USE spotify_db;

/*
LOAD DATA LOCAL INFILE 'C:/Users/Amage/Desktop/Programming/Trabalho_Banco_de_Dados/scripts_output/genero.csv'
INTO TABLE GENERO
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id_genero, nome);


LOAD DATA LOCAL INFILE 'C:/Users/Amage/Desktop/Programming/Trabalho_Banco_de_Dados/scripts_output/album.csv'
INTO TABLE ALBUM
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id_album, nome);
*/

/*
LOAD DATA LOCAL INFILE 'C:/Users/Amage/Desktop/Programming/Trabalho_Banco_de_Dados/scripts_output/artista.csv'
INTO TABLE ARTISTA
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id_artista, nome);
*/
/*
LOAD DATA LOCAL INFILE 'C:/Users/Amage/Desktop/Programming/Trabalho_Banco_de_Dados/scripts_output/musica.csv'
INTO TABLE MUSICA
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id_track, nome, popularidade, tempo_ms,
FK_GENERO_id_genero,
FK_ALBUM_id_album);
*/

LOAD DATA LOCAL INFILE 'C:/Users/Amage/Desktop/Programming/Trabalho_Banco_de_Dados/scripts_output/participacao.csv'
INTO TABLE PARTICIPACAO
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(FK_MUSICA_id_track,
FK_ARTISTA_id_artista,
tipo_participacao);
