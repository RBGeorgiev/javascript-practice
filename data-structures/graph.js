class Graph {
    constructor() {
        // Adjacency List
        this.adjList = new Map;
    }

    addVertex(v) {
        this.adjList.set(v, [])
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    printGraph() {
        let getKeys = this.adjList.keys();

        for (let i of getKeys) {
            let get_values = this.adjList.get(i);
            let str = "";

            for (let j of get_values)
                str += j + " ";

            // print the vertex and its adjacency list 
            console.log(i + " -> " + str);
        }
    }
}

let graph = new Graph;

graph.addVertex(2)
graph.addVertex(21)
graph.addVertex(534)
graph.addVertex(85)
graph.addVertex(5)

graph.addEdge(5, 2)
graph.addEdge(2, 21)
graph.addEdge(534, 85)

graph.printGraph()