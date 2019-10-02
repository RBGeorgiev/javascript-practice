import Car from './car.js';

let Neat = neataptic.Neat;
let Methods = neataptic.methods;
let Config = neataptic.config;
let Architect = neataptic.architect;

/** Turn off warnings */
// Config.warnings = false;



let POP_SIZE = 150
/** Settings */

let FOOD_DETECTION = 3;
let PLAYER_DETECTION = 3;

// GA settings - genetic algorithm
let ITERATIONS = 1000;
let START_HIDDEN_SIZE = 0;
let MUTATION_RATE = 0.3;
let ELITISM = Math.round(0.1 * POP_SIZE);

// Trained population
let USE_TRAINED_POP = false;
// let USE_TRAINED_POP = true;


// var myNetwork = new neataptic.Neat(8, 12, 6);
let neat

export function initNeat() {
    neat = new Neat(
        8,
        2,
        null,
        {
            mutation: [
                Methods.mutation.ADD_NODE,
                Methods.mutation.SUB_NODE,
                Methods.mutation.ADD_CONN,
                Methods.mutation.SUB_CONN,
                Methods.mutation.MOD_WEIGHT,
                Methods.mutation.MOD_BIAS,
                Methods.mutation.MOD_ACTIVATION,
                Methods.mutation.ADD_GATE,
                Methods.mutation.SUB_GATE,
                Methods.mutation.ADD_SELF_CONN,
                Methods.mutation.SUB_SELF_CONN,
                Methods.mutation.ADD_BACK_CONN,
                Methods.mutation.SUB_BACK_CONN
            ],
            popsize: POP_SIZE,
            mutationRate: MUTATION_RATE,
            elitism: ELITISM
        }
    );
    // console.log(neat)
    // console.log(neat.population)

    if (USE_TRAINED_POP) {
        neat.population = population;
    }
}
// console.log(neat)

//  Start the evaluation of the current generation
export function startEvaluation(game) {
    let cars = [];
    let highestScore = 0;

    for (let genome in neat.population) {
        genome = neat.population[genome];
        cars.push(new Car(game, genome));
    }

    return cars;
}

// End the evaluation of the current generation 
export function endEvaluation(game) {
    // console.log(neat)
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage(), '- fittest score:', neat.getFittest().score);
    console.log(neat.getFittest());

    neat.sort();
    let newPopulation = [];
    // Elitism
    for (let i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    // Breed the next individuals
    for (let i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;
    return startEvaluation(game);
}


