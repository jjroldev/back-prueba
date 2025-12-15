import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./config/data.source";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import PacienteRoutes from './routes/paciente.routes';

const app =express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

app.use('/autenticacion', authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/pacientes", PacienteRoutes);


app.get('/',(req,res)=>{
    console.log("Hola mundo")
    res.send('Hola mundo');
});

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a Oracle");

    app.listen(6505, () => {
      console.log("Server running on port 6505");
    });
  })
  .catch((error) => {
    console.error("Error Oracle:", error);
  });