class Graph {
    constructor() {
        // Adjacency List
        this.adjList = new Map;
    }

    addVertex(v) {
        if (!this.adjList.get(v)) this.adjList.set(v, []);
    }

    addEdge(u, v) {
        if (u === v) return null;
        if (this.adjList.get(u).includes(v)) return null;
        this.adjList.get(u).push(v);
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
        if (!this.adjList.get(start)) return null;
        const ans = [start];
        const queue = [start];

        while (queue.length) {
            let cur = queue.shift();

            for (let i of this.adjList.get(cur)) {
                if (!ans.includes(i)) {
                    queue.push(i);
                    ans.push(i);
                }
            }
        }
        return ans;
    }

    dfs(start) {
        if (!this.adjList.get(start)) return null;
        let ans = [];
        let stack = [start];

        while (stack.length) {
            let cur = stack.pop();
            if (!ans.includes(cur)) {
                ans.push(cur);
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