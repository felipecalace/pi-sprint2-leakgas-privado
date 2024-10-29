// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorMQ2
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'leakgas',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorMQ2 = parseInt(valores[0]);
       
        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorMQ2.push(sensorMQ2);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO dadosSensores (fkSensores, vazamento) VALUES (1, ?)',
                [sensorMQ2]
            );
            console.log("valores inseridos no banco: ", sensorMQ2);

        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorMQ2,
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorMQ2);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorMQ2 = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorMQ2,
    );

    // inicia o servidor web
    servidor(
        valoresSensorMQ2,
    );
})();




 // PARA NAVEGAR ENTRE A DASHBOARD

 function cozinhaB(){
    todas_dash.style.display = 'none';
    dash_cozinhas.style.display = 'flex';
    cozinha_selecionada.innerHTML = ` B`
    inicio_vazamento.innerHTML = `10:00`
    termino_vazamento.innerHTML = `ATIVO`
    
    dashboardB.style.display = 'flex';
    dashboard_safe.style.display = 'none';
  }

  function cozinhaA(){
    todas_dash.style.display = 'none';
    dash_cozinhas.style.display = 'flex';
    dashboardB.style.display = 'none';
    dashboard_safe.style.display = 'flex';
    
    cozinha_selecionada.innerHTML = ` A`
    inicio_vazamento.innerHTML = `Sem vazamentos recentes`
    termino_vazamento.innerHTML = `Sem vazamentos recentes`
  }
  function cozinhaC(){
    todas_dash.style.display = 'none';
    dash_cozinhas.style.display = 'flex';
    dashboardB.style.display = 'none';
    dashboard_safe.style.display = 'flex';
    
    cozinha_selecionada.innerHTML = ` C`
    inicio_vazamento.innerHTML = `Sem vazamentos recentes`
    termino_vazamento.innerHTML = `Sem vazamentos recentes`
  }
  function cozinhaD(){
    todas_dash.style.display = 'none';
    dash_cozinhas.style.display = 'flex';
    dashboardB.style.display = 'none';
    dashboard_safe.style.display = 'flex';
    
    cozinha_selecionada.innerHTML = ` D`
    inicio_vazamento.innerHTML = `Sem vazamentos recentes`
    termino_vazamento.innerHTML = `Sem vazamentos recentes`
  }
  function cozinhaE(){
    todas_dash.style.display = 'none';
    dash_cozinhas.style.display = 'flex';
    dashboardB.style.display = 'none';
    dashboard_safe.style.display = 'flex';
    
    cozinha_selecionada.innerHTML = ` E`
    inicio_vazamento.innerHTML = `Sem vazamentos recentes`
    termino_vazamento.innerHTML = `Sem vazamentos recentes`
  }

  const linha_safe = document.getElementById('chart_linha_safe');

new Chart(linha_safe, {
    type: 'line',
    data: {
      labels: ['06:00','07:00','08:00', '09:00', '10:00', '11:00', '12:00'],
      datasets: [{
        
        label: 'Presença de Gás',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  

  