import { Model, DataTypes } from 'sequelize';

class Book extends Model {

  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nome do Livro deve ser preenchido!" },
          len: { args: [2, 50], msg: "Nome do Livro deve ter entre 2 e 50 letras!" }
        }
      },
      release: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: "Precisa de data de lançamento" },
          is: {args: ["[0-9]{4}\-[0-9]{2}\-[0-9]{2}"], msg: "Release needs to follow yyyy-MM-dd!" }
        }
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: "Número de páginas deve ser preenchido"}
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      modelName: 'book',
      tableName: 'books',
      timestamps: false // Removido para desativar automaticamente os campos de timestamp
    });
  }

}

export { Book };
