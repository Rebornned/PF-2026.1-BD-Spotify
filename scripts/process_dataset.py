import pandas as pd

df = pd.read_csv("../dataset/spotify_tracks.csv")

# remover coluna inútil
if 'Unnamed: 0' in df.columns:
    df = df.drop(columns=['Unnamed: 0'])

print("Quantidade linhas:", len(df))

print("\nColunas:")

print(df.columns.tolist())

print("\nValores nulos:")

print(df.isnull().sum())

print("\nExemplos artistas:")

print(df['artists'].head(10))

print("\nGeneros únicos:")

print(df['track_genre'].nunique())

print("\nAlbuns únicos:")

print(df['album_name'].nunique())

print("\nTracks únicas:")

print(df['track_id'].nunique())