-- Inserção de Tipos de Ocorrência
INSERT INTO type_report (description) VALUES
    ('Acidente de Trânsito'),
    ('Congestionamento'),
    ('Veículo Quebrado'),
    ('Obra na Via'),
    ('Condição Climática Adversa'),
    ('Evento Público'),
    ('Fiscalização de Trânsito'),
    ('Semáforo Quebrado'),
    ('Manifestação');

-- Inserção de Ruas
INSERT INTO streets (name) VALUES
    ('Rua Jon Snow'),
    ('Avenida Daenerys Targaryen'),
    ('Rua Tyrion Lannister'),
    ('Avenida Arya Stark'),
    ('Rua Sansa Start'),
    ('Avenida Cersei Lannister'),
    ('Rua Jaime Lannister'),
    ('Avenida Bran Stark'),
    ('Rua Samell Tarly'),
    ('Avenida Brienne de Tarth'),
    ('Rua Theon Greyjoy'),
    ('Avebuda Sandor Clegane'),
    ('Avenida Melisandre'),
    ('Rua Davos Seaworth');

INSERT INTO users (email, name, password) VALUES ('leonardovbdo@gmail.com', 'Leonardo', '$2a$10$9aNzDYb9PD56P4QQBEWcMuxn1gLKdygghCdwk.6Tb2.ScjBJX2FWO');