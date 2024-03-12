import Sequelize from 'sequelize';
import tls from 'tls';

// Configurações do banco de dados
const dbname = ''; // Nome do banco de dados
const username = 'postgres'; // Nome de usuário
const password = '12345678'; // Senha do usuário

// Certificado da autoridade de certificação (CA) do RDS
const rdsCa = `-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----`;

const sequelize = new Sequelize(dbname, username, password, {
    host: 'database-1.c18cukuqyzii.us-east-1.rds.amazonaws.com', // Endereço do seu banco de dados RDS
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: [rdsCa],
            checkServerIdentity: (host, cert) => {
                const error = tls.checkServerIdentity(host, cert);
                if (error && !cert.subject.CN.endsWith('.rds.amazonaws.com')) {
                    return error;
                }
            }
        }
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

export default sequelize;
