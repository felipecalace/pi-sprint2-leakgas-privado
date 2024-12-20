var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idRepresentante, nome, sobrenome, email FROM representante WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(body) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",body.pessoalNome, body.pessoalSobrenome, body.pessoalTelefone, body.email, body.pessoalSenha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `INSERT INTO representante (nome, sobrenome, telefone, email, senha) VALUES ('${body.pessoalNome}', '${body.pessoalSobrenome}', '${body.pessoalTelefone}', '${body.email}', '${body.pessoalSenha}');`
    
    console.log("Executando Cadastro");
    return database.executar(instrucaoSql).then((res) => {
        var idRepresentante = res.insertId;

        var instrucaoSql2 = `INSERT INTO empresa (nomeFantasia, nomeSocial, CNPJ, emailCorporativo, telefoneCorporativo, fkRepresentante) VALUES ('${body.nomeFantasia}', '${body.nomeSocial}', '${body.cnpj}', '${body.emailEmpresa}', '${body.telefoneCorp}', ${idRepresentante});`;

        database.executar(instrucaoSql2).then((res) => {
            var idEmpresa = res.insertId;
    
            var instrucaoSql3 = `INSERT INTO endereco (logradouro, numero, cep, complemento, cidade, estado, fkEmpresa) VALUES ('${body.logradouro}', ${body.numero}, ${body.cep}, '${body.complemento}', '${body.cidade}',  '${body.estado}', ${idEmpresa});`;
    
            database.executar(instrucaoSql3);
        })
    })
}

function cadastrarAgendamento(idUsuario, nome, email, cpf, telefone, cidade, cep, logradouro, numero, data, horariode, horarioate, telefone, idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAgendamento():", idUsuario, nome, email, cpf, telefone, cidade, cep, logradouro, numero, data, horariode, horarioate, telefone, idUsuario);

    var instrucaoSql = `
        insert into chamadoInstalacao(fkRepresentante, nome, cpf, email, telefone, cidade, cep, logradouro, numero, dia, horarioDe, horarioAte) values ('${idUsuario}',' ${nome}', '${cpf}', '${email}', '${telefone}', '${cidade}', '${cep}', '${logradouro}', ${numero}, '${data}', '${horariode}', '${horarioate}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}



module.exports = {
    autenticar,
    cadastrar,
    cadastrarAgendamento
};