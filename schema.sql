DROP TABLE IF EXISTS favAnime;

CREATE TABLE IF NOT EXISTS favAnime(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    episodes VARCHAR(255)  
)