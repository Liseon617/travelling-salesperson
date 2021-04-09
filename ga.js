function calculateFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i < population.length; i++) {
        const d = calcDistance(cities, population[i]);
        if (d < recordDistance) {
            recordDistance = d;
            bestEver = population[i];
        }
        if (d < currentRecord) {
            currentRecord = d;
            currentBest = population[i];
        }
        fitness[i] = 1 / (pow(d, 8) + 1);
    }
}

function normalizeFitness() {
    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; i ++) {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration() {
    var mRate = genCounter > 120 ? 0.02 : 0.90;
    var newPopulation = [];
    for (let i = 0; i < population.length; i++) {
        const orderA = pickOne(population, fitness);
        const orderB = pickOne(population, fitness);
        const order = crossOver(orderA, orderB);
        mutate(order, mRate);
        newPopulation[i] = order;
    }
    population = newPopulation;
    genCounter++;
}

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++ 
    }
    index--;
    return list[index].slice();
}

//order crossover (OX1) to create one child with two parents
function crossOver(orderA, orderB) {
    //step 1: Choose an arbitrary part from the first parents
    const start = floor(random(orderA.length));
    const end = floor(random(start + 1, orderA.length));
    let finalorder = [];
    //step 2: copy this part of the child
    let neworder = orderA.slice(start, end);
    //step 3: copy the numbers that are not in the child, from the second parent to the child
    // - starting right from the cut point of the copied part
    // - using the order of the second parent
    // - and wrapping around at the end
    orderB = orderB.filter( ( el ) => !neworder.includes( el ) );
    for (let j =0,i = 0; i < orderB.length; i++) {
        if(i + end < orderA.length) {
            finalorder[i + end] = orderB[i];
        } else if (i + end >= orderA.length) {
            finalorder[j] = orderB[i];
            j++;
        }
    }
    finalorder.splice.apply(finalorder, [start, 0].concat(neworder));
    finalorder = finalorder.filter(el => { return el != null; });
    return finalorder;
}

//displacement mutation (DM)
function mutate(order, mutationRate) {
    for (let i = 0; i < totalCities; i++) {
        if (random(1) < mutationRate) {
            const indexA = floor(random(order.length));
            const indexB = floor(random(order.length));
            swap (order, indexA, indexB);
        }
    }
}