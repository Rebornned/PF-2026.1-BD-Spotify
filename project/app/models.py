from . import db

# ====================================================
# Tabelas do banco de dados -> Classes do SQLAlchemy
# ====================================================
class Musica(db.Model):
    __tablename__ = "musica"

    popularidade = db.Column(db.Integer)
    id_track = db.Column(db.String(50), primary_key=True)
    nome = db.Column(db.String(1000))
    tempo_ms = db.Column(db.Integer)
    FK_GENERO_id_genero = db.Column(db.Integer, db.ForeignKey("genero.id_genero"))
    FK_ALBUM_id_album = db.Column(db.Integer, db.ForeignKey("album.id_album"))

# -----------------------------------------------------
class Album(db.Model):
    __tablename__ = "album"

    id_album = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(500))

# -----------------------------------------------------
class Genero(db.Model):
    __tablename__ = "genero"

    id_genero = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
# -----------------------------------------------------
class Artista(db.Model):
    __tablename__ = "artista"

    id_artista = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(500))
    
# -----------------------------------------------------
class Participacao(db.Model):
    __tablename__ = "participacao"

    FK_MUSICA_id_track = db.Column(db.String(50), db.ForeignKey("musica.id_track"), primary_key=True)
    FK_ARTISTA_id_artista = db.Column(db.Integer, db.ForeignKey("artista.id_artista"), primary_key=True)
    tipo_participacao = db.Column(db.String(50))
