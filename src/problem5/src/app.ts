import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import resourceRoutes from './routes/resourceRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/resources', resourceRoutes);

export default app;
