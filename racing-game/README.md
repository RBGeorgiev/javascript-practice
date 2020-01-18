# Top-down racing game - NEAT Neural Network

See it here: https://cq35q.codesandbox.io/

This is a top-down racing game I created with the goal of having a neural network learn to play it.

For the neural network I used neuroevolution, namely the [NeuroEvolution of Augmenting Topologies(NEAT)](https://en.wikipedia.org/wiki/Neuroevolution_of_augmenting_topologies) algorithm. The library used was [Neataptic.](https://wagenaartje.github.io/neataptic/)

Each individual car is aware of the directional controls, and can knows the distance to the walls of the track through 9 sensors. From each generation the fittest (highest score) individuals, along with a small selections of random individuals and mutations, are chosen to create the next generation. Each individual car aims to maximize it's fitness score.

The AI is rewarded based on it's speed and how many hidden gates it can pass through. The AI is not aware of the position of the gates and is punished for going backwards and spinning in place, which it loves to do. The current trained population is not perfect by any means and it took around 1000 generations to complete 1 lap around the track.

It is possible to try the game out by following the link on top and switching the player option on the right to 'Human'. The controls are challenging by design to see how the AI would deal with difficult controls. It is also possible to experience how each car AI sees the game by disabling the sprite of the car, visuals of the track and enabling the 'sensor collisions' option.