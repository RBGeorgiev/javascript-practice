class Graph {
    constructor() {
        // Adjacency List
        this.adjList = new Map;
    }

    addVertex(v) {
        if (!this.adjList.get(v)) this.adjList.set(v, []);
    }

    addEdge(v, w) {
        if (v === w) return null;
        if (this.adjList.get(v).includes(w)) return null;
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

    bfs(start) {
        const ans = [];
        const queue = [start];
        const visited = [start];

        while (queue.length) {
            let cur = queue.shift();

            if (!ans.includes(cur)) {
                ans.push(cur)

                for (let i = 0; i < this.adjList.get(cur).length; i++) {
                    if (!visited.includes(this.adjList.get(cur)[i])) {
                        queue.push(this.adjList.get(cur)[i])
                        visited.push(this.adjList.get(cur)[i])
                    }
                }
            }
        }
        return ans;
    }
}

let graph = new Graph;

graph.addVertex(2)
graph.addVertex(21)
graph.addVertex(534)
graph.addVertex(85)
graph.addVertex(5)

graph.addEdge(2, 21)
graph.addEdge(2, 534)
graph.addEdge(2, 85)
graph.addEdge(2, 5)

graph.addEdge(21, 2)
graph.addEdge(21, 534)
graph.addEdge(21, 85)
graph.addEdge(21, 5)

graph.addEdge(534, 2)
graph.addEdge(534, 21)
graph.addEdge(534, 85)
graph.addEdge(534, 5)

graph.addEdge(85, 2)
graph.addEdge(85, 21)
graph.addEdge(85, 534)
graph.addEdge(85, 5)

graph.addEdge(5, 2)
graph.addEdge(5, 21)
graph.addEdge(5, 534)
graph.addEdge(5, 85)




// graph.addEdge(5, 2)
// graph.addEdge(2, 21)
// graph.addEdge(534, 85)
// graph.addEdge(5, 85)
// graph.addEdge(85, 2)

graph.printGraph()

graph.bfs(5)