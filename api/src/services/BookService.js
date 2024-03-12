import { Book } from "../models/Book.js";

class BookService {
  
  static async findAll(req, res) {
    const objs = await Book.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Book.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { name, release, pages, status } = req.body;

    const obj = await Book.create({ name, release, pages, status });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, release, pages, status } = req.body;
    var obj = await Book.findOne({ where: { id: id } });
    Object.assign(obj, { name,release,pages,status });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Book.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { BookService };
