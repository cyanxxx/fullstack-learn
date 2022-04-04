import express, { Request } from 'express';
import calculateBmi, { MultiplyValues } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json())
app.get('/bmi', (req: Request<MultiplyValues> , res) => {
    try {
      if (req.query.height === undefined || req.query.weight === undefined) throw new Error('malformatted parameters');
      if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) throw new Error('malformatted parameters');
        const height = Number(req.query.height);
        const weight =  Number(req.query.weight);
        return res.json({
          height,
          weight,
          bmi: calculateBmi(height, weight)
        });
      } catch (error: unknown) {
        if(error instanceof Error) {
          return res.status(400).json({
              error: error.message
          });
        }
        return res.status(500)
    }
});
app.post('/exercises', (req , res) => {
    try {
        const body = req.body
        if(body.daily_exercises === undefined || ! body.daily_exercises  === undefined) throw new Error('parameters missing');
        if(isNaN(Number(body.daily_exercises)) || ! body.daily_exercises.some((train: number) => isNaN(Number(train)))) throw new Error('malformatted parameters');
        return res.json(calculateExercises(body.daily_exercises, body.target));
      } catch (error: unknown) {
        if(error instanceof Error) {
          return res.status(400).json({
              error: error.message
          });
        }
        return res.status(500)  
    }
});
app.get('/Hello', (_req, res) => {
  res.send(' Hello Full Stack! ');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});