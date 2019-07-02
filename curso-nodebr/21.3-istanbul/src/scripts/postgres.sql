CREATE TABLE tb_herois (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
);

-- create
INSERT INTO tb_herois (NOME, PODER)
VALUES 
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os peixes'),
    ('Batman', 'Dinheiro');

-- read
SELECT * FROM tb_herois;
SELECT * FROM tb_herois WHERE NOME = 'Flash';

-- update
UPDATE tb_herois
SET NOME = 'Superman', PODER='All'
WHERE ID = 1;

-- delete
DELETE FROM tb_herois
WHERE ID = 2;

