import pandas as pd

df = pd.read_csv("../dataset/spotify_tracks.csv")

# remover indice antigo
if "Unnamed: 0" in df.columns:
    df = df.drop(columns=["Unnamed: 0"])

print("Linhas originais:", len(df))

# remover nulos importantes

df = df.dropna(
    subset=[
        'track_id',
        'artists',
        'album_name',
        'track_name'
    ]
)

print("Após remover nulos:", len(df))

# remover músicas duplicadas

df = df.drop_duplicates(
    subset=['track_id']
)

print("Após remover duplicatas:", len(df))

print()

print(df.head())