import Car from '../game/car.js';
import { population } from './trained-pop.js'

const Neat = neataptic.Neat,
    Methods = neataptic.methods,
    POP_SIZE = 150,
    MUTATION_RATE = 0.3,
    ELITISM = Math.round(0.3 * POP_SIZE);

// Trained population
let USE_TRAINED_POP = false;

function getTrainedPopulation() {
    let newPop = [];
    for (let i = 0; i < POP_SIZE; i++) {
        let json = population[i % population.length];
        newPop[i] = neataptic.Network.fromJSON(json);
    }
    return newPop;
}

// Scores
let highestScore = 0,
    totalHighestScore = 0;

// Get previous generations
export let prevGenerationJSON = null,
    prevFittestJSON = [];

// Gen number tracker
export let genNumber = 0;

function updateGenNumber() {
    genNumber++;
    document.getElementById("genNumber").innerHTML = "Current generation: " + genNumber;
}

// NEAT init
let neat;
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
        neat.population = getTrainedPopulation();
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

    updateGenNumber();
    prevFittestJSON.push(neat.getFittest().toJSON());
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