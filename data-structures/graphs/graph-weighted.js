// Undirected weighted graph
class Graph {
    constructor() {
        // Adjacency List
        this.adjList = new Map;
    }

    // add new vertex
    addVertex(v) {
        // if vertex doesn't already exist 
        if (!this.adjList.get(v)) this.adjList.set(v, []);
    }

    // add edge between two vertices
    addEdge(u, v, w = 1) {
        // if either vertex doesn't exist
        if (!this.adjList.get(u) || !this.adjList.get(v)) return null;
        // if trying to connect a vertex to itself
        if (u === v) return null;
        // if edge already exists
        if (this.adjList.get(u).includes(v)) return null;
        // get the list for vertex u and put the vertex v denoting edge between u and v 
        this.adjList.get(u).push([v, w]);
        // since graph is undirected, also add an edge from v to u 
        this.adjList.get(v).push([u, w]);
    }

    printGraph() {
        for (let [key, val] of graph.adjList) {
            // print the vertex, its adjacency list and weights
            console.log(`${key} -> ${val.map(el => `V:${el[0]} w:${el[1]}`).join(' | ')}`)
        }
    }
}

let graph = new Graph;

graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);

graph.addEdge(0, 3, 5)
graph.addEdge(0, 6, 2)
graph.addEdge(1, 4)
graph.addEdge(1, 7)
graph.addEdge(2, 1, 7)
graph.addEdge(2, 5)
graph.addEdge(2, 8, 9)
graph.addEdge(3, 1, 7)
graph.addEdge(3, 4)
graph.addEdge(3, 6, 9)
graph.addEdge(4, 7)
graph.addEdge(4, 2, 3)
graph.addEdge(5, 8, 5)
graph.addEdge(5, 3)
graph.addEdge(6, 1, 6)
graph.addEdge(7, 0)
graph.addEdge(7, 2)
graph.addEdge(8, 0)
graph.addEdge(8, 4)

graph.printGraph();

// graph.bfs(0)

// graph.dfs(0)