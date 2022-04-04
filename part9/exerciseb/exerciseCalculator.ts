interface Result{
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface MultiplyValues{
    target: number,
    trains: number[]
}

const calculateExercises = (arr: number[], target: number):Result => {
    let trainingDays = arr.length;
    let success = false;
    let rating = 0;
    let ratingDescription = '';
    let sum = 0;
    arr.forEach(train => {
        sum += train;
        if(train === 0) {
            trainingDays--;
        }
    });
    const average = sum / arr.length;
    if(average < target * 0.8) {
        rating = 1;
        ratingDescription = 'not good';
    }
    else if(average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else if(average >= target) {
        rating = 3;
        ratingDescription = 'good';
        success = true;
    }
    return ({
        periodLength: arr.length,
        trainingDays,
        success,
        rating,
        ratingDescription: ratingDescription,
        target,
        average
    });
};

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [ target, ...arr ] = args.slice(2);

    if (!isNaN(Number(target)) && !arr.some(train => isNaN(Number(train)))) {
      return {
        target: Number(target),
        trains: arr.map(train => Number(train))
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

function main() {
    const args = process.argv;
    const { target, trains } = parseArguments(args);
    console.log(calculateExercises(trains, target));
}
if(process.argv[1] === 'exerciseCalculator.ts') {
    main();
}

export default calculateExercises