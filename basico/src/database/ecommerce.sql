-- Active: 1684260125157@@127.0.0.1@3306

CREATE TABLE usuarios (
    id TEXT PRIMARY KEY UNIQUE ,
    nome TEXT ,
    email TEXT UNIQUE ,
    senha TEXT ,
    tipo_usuario ENUM TEXT ,
    criado_em TEXT DEFAULT(DATETIME())  
);

INSERT INTO usuarios (id, nome, email, senha, tipo_usuario)
VALUES ("001", "Bruno", "bruno@email.com", "123456", "admin");

SELECT * FROM usuarios;

DROP TABLE usuarios;


CREATE TABLE produtos (
    id TEXT UNIQUE NOT NULL,
    tipo TEXT NOT NULL,
    criado_em TEXT DEFAULT (DATETIME()),
    editado_em TEXT DEFAULT (DATETIME())
);

SELECT * FROM produtos;

DROP TABLE produtos;


CREATE TABLE lista (
    id TEXT UNIQUE NOT NULL,
    usuario_id TEXT NOT NULL,
    produto_id TEXT NOT NULL,
    status ENUM TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

SELECT * FROM lista;

DROP TABLE lista;