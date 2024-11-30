-- Insere um representante na tabela representante

INSERT INTO representante VALUES (
    DEFAULT,
    'Ricardo ', 
    'Silva', 
    '11987654321', 
    'ricardo.silva@gmail.com', 
    'senha123'
    ),
    (
    DEFAULT,
    'Ana', 
    'Lima', 
    '11987654322', 
    'ana.lima@gmail.com', 
    'senha123'
    ),
    (
    DEFAULT,
    'Luiz', 
    'Fernandes', 
    '11987654323', 
    'luiz.fernandes@gmail.com', 
    'senha123'
    );

-- Insere uma empresa na tabela empresaMatriz

INSERT INTO empresa VALUES (
    DEFAULT,
    'Bakelita', 
    'Bakelita Ltda', 
    '12345678901234', 
    'contato@bakelita.com', 
    '11987654321', 
    1, 
    NULL
    ),
    (
    DEFAULT,
    'Frigorífico São Paulo', 
    'Frigorífico São Paulo Ltda', 
    '98765432109876', 
    'contato@frigorificosp.com', 
    '11987654322', 
    2, 
    NULL
    ),
    (
    DEFAULT,
    'Cozinha Industrial Paulista', 
    'Cozinha Industrial Paulista Ltda', 
    '76543210987654', 
    'contato@cozinhapaulista.com', 
    '11987654323', 
    3, 
    NULL
    );

-- Insere um sensor na tabela sensores

INSERT INTO sensores VALUES (
    DEFAULT,
    'Ativo',  
    1
    ),
    (
    DEFAULT,
    'Inativo',  
    2
    ),
    (
    DEFAULT,
    'Manutenção',  
    3
    );

-- Insere um email de propaganda na tabela propaganda

INSERT INTO faleConosco VALUES (
    DEFAULT,
    'Ricardo Silva', 
    'Olá, gostaria de saber mais sobre os produtos da LeakGas.', 
    'ricardo.silva@email.com', 
    'FaleConosco'
    ),
    (
    DEFAULT,
    'Ana Lima', 
    'Gostaria de saber mais sobre as oportunidades de trabalho na LeakGas São Paulo.', 
    'ana.lima@email.com', 
    'FaleConosco'
    ),
    (
    DEFAULT,
    NULL, 
    NULL,
    'luiz.fernandes@email.com', 
    'Publicidade'
    );