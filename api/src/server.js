import express from "express";
import routes from './routes.js';
import cors from "cors";
import './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333; // Utilizando variável de ambiente para a porta
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
