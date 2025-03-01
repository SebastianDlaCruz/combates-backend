import cors from 'cors';
import express from 'express';
import { routerBoxer } from './routers/boxer-route';
import { categoryRouter } from './routers/category-route';
import { clashesRouter } from './routers/clashes.route';
import { coachRouter } from './routers/coach-route';
import { schoolRouter } from './routers/school-route';
import { stateRouter } from './routers/state.route';

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/boxer', routerBoxer);
app.use('/api/v1/coach', coachRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/state', stateRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/clashes', clashesRouter);



const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Run server  http://localhost::${port}`)
})  