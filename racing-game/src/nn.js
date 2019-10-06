import Car from './car.js';
import { population } from './trained-pop.js'

let Neat = neataptic.Neat;
let Methods = neataptic.methods;

let POP_SIZE = 150

// GA settings - genetic algorithm
let MUTATION_RATE = 0.3;
let ELITISM = Math.round(0.3 * POP_SIZE);

// Trained population
let USE_TRAINED_POP = false;
// Convert the json to an array of networks
let newPop = [];
for (let i = 0; i < POP_SIZE; i++) {
    let json = population[i % population.length];
    newPop[i] = neataptic.Network.fromJSON(json);
}
let trainedPop = newPop;


let neat;
let highestScore = 0;
let totalHighestScore = 0;
export let prevGenerationJSON = null;
export let prevFittestJSON = null;

export function initNeat() {
    neat = new Neat(
        10,
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

    if (USE_TRAINED_POP) {
        neat.population = trainedPop;
    }
}

//  Start the evaluation of the current generation
export function startEvaluation(game) {
    let cars = [];
    highestScore = 0;

    for (let genome in neat.population) {
        let score = neat.population[genome].score;
        if (score > highestScore) highestScore = score;
        if (score > totalHighestScore) totalHighestScore = score;
        genome = neat.population[genome];
        cars.push(new Car(game, genome));
    }

    return cars;
}

// End the evaluation of the current generation 
export function endEvaluation(game) {
    console.log('Generation:', neat.generation, '| average:', neat.getAverage(), '| fittest:', neat.getFittest().score, '| highest:', highestScore, '| total highest:', totalHighestScore);
    console.log(neat.getFittest());

    prevFittestJSON = neat.getFittest().toJSON();
    prevGenerationJSON = neat.export();

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