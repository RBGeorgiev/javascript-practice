// Undirected unweighted graph
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
    addEdge(u, v) {
        // if either vertex doesn't exist
        if (!this.adjList.get(u) || !this.adjList.get(v)) return null;
        // if trying to connect a vertex to itself
        if (u === v) return null;
        // if edge already exists
        if (this.adjList.get(u).includes(v)) return null;
        // get the list for vertex u and put the vertex v denoting edge between u and v 
        this.adjList.get(u).push(v);
        // since graph is undirected, also add an edge from v to u 
        this.adjList.get(v).push(u);
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
        // if starting vertex doesn't exist
        if (!this.adjList.get(start)) return null;

        let ans = [start];
        let queue = [start];

        // run until queue is empty
        while (queue.length) {
            // get current vertex from the front of the queue
            let cur = queue.shift();

            // loop through all vertices connected to current vertex
            for (let i of this.adjList.get(cur)) {
                // if vertex i is not already in answer
                if (!ans.includes(i)) {
                    // push to the end of the queue
                    queue.push(i);
                    ans.push(i);
                }
            }
        }
        return ans;
    }

    dfs(start) {
        // if starting vertex doesn't exist
        if (!this.adjList.get(start)) return null;

        let ans = [];
        let stack = [start];

        // run until stack is empty
        while (stack.length) {
            // get current vertex from the end of the stack
            let cur = stack.pop();

            // if current vertex is not already in answer
            if (!ans.includes(cur)) {
                ans.push(cur);
                // loop through all vertices connected to current vertex
                for (let i of this.adjList.get(cur)) stack.push(i);
            }
        }
        return ans;
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

graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(0, 8)
graph.addEdge(1, 0)
graph.addEdge(1, 7)
graph.addEdge(2, 7)
graph.addEdge(2, 5)
graph.addEdge(2, 3)
graph.addEdge(3, 0)
graph.addEdge(3, 2)
graph.addEdge(3, 4)
graph.addEdge(4, 3)
graph.addEdge(4, 8)
graph.addEdge(5, 2)
graph.addEdge(5, 6)
graph.addEdge(6, 5)
graph.addEdge(7, 1)
graph.addEdge(7, 2)
graph.addEdge(8, 0)
graph.addEdge(8, 4)

graph.printGraph();

// graph.bfs(0)

// graph.dfs(0)