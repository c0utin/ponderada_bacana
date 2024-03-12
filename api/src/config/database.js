import Sequelize from 'sequelize';
import { Book } from '../models/Book.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

Book.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });
    await Book.create({name: "The art of computer programming", release: "1968-01-01", pages:"12"});
    await Book.create({name: "The art of computer programming", release: "1968-01-01", pages:"1231312312"});
})();

export default sequelize;
