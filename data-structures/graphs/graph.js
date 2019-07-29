// Undirected unweighted graph
class Graph {
    constructor() {
        // Adjacency List
        this.adjList = new Map;
    }

    // add new vertex
    addVertex(v) {
        // if vertex value isn't a number or string
        if (typeof 1 !== 'number' || typeof 's' !== 'string') return null;
        // if vertex doesn't already exist 
        if (!this.adjList.get(v)) this.adjList.set(v, []);
    }

    removeVertex(v) {
        // if vertex doesn't exist
        if (!this.adjList.get(v)) return null;

        // visit all vertices connected to v
        this.adjList.get(v).forEach(el => {
            // remove the edge between v and connected vertices
            this.adjList.get(el).splice(this.adjList.get(el).indexOf(v), 1)
        });
        // delete v vertex
        this.adjList.delete(v);

        return this.printGraph();
    }

    // add edge between two vertices
    addEdge(v, u) {
        // if either vertex doesn't exist
        if (!this.adjList.get(v) || !this.adjList.get(u)) return null;
        // if trying to connect a vertex to itself
        if (v === u) return null;
        // if edge already exists
        if (this.adjList.get(v).includes(u)) return null;
        // get the list for vertex v and put the vertex u denoting edge between v and u
        this.adjList.get(v).push(u);
        // since graph is undirected, also add an edge from u to v 
        this.adjList.get(u).push(v);
    }

    // removes edge between vertices u and v
    removeEdge(v, u) {
        // if either vertex doesn't exist
        if (!this.adjList.get(v) || !this.adjList.get(u)) return null;
        // if both u and v point to the same vertex
        if (v === u) return null;
        // if edge doesn't exist
        if (!this.adjList.get(v).includes(u)) return null;

        // since graph is undirected, also remove an edge from v to u 
        graph.adjList.get(v).splice(graph.adjList.get(v).indexOf(u), 1);
        // since graph is undirected, also remove an edge from u to v 
        graph.adjList.get(u).splice(graph.adjList.get(u).indexOf(v), 1);

        return this.printGraph();
    }

    // tests whether there is an edge from vertex v to vertex u
    adjacent(v, u) {
        // if either vertex doesn't exist
        if (!this.adjList.get(v) || !this.adjList.get(u)) return null;
        // if trying to test a vertex with itself
        if (v === u) return null;

        return this.adjList.get(v).includes(u);
    }

    // log all other vertices connected to v
    neighbors(v) {
        // if vertex doesn't exist
        if (!this.adjList.get(v)) return null;
        // log all connections to v
        console.log(`${v} -> ${graph.adjList.get(v).join(' ')}`)
    }

    // log all vertices and their connections
    printGraph() {
        for (let [key, val] of this.adjList) {
            // print the vertex and its adjacency list 
            console.log(`${key} -> ${val.join(' ')}`)
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

    // dfs starting from specific vertex
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

    // dfs for disconnected graph
    dfsAll() {
        let visited = new Array(this.adjList).fill(false);
        let i = 0
        let ans = []

        for (let v of this.adjList) {
            if (!visited[i]) this.dfsUtil(v[0], visited, ans)
            i++
        }
        return ans;
    }

    // dfs all helper method
    dfsUtil(v, visited, ans) {

        let stack = [v];
        let j = 0

        while (stack.length) {
            let cur = stack.pop();

            if (!ans.includes(cur)) {
                ans.push(cur);
                visited[j]
                // loop through all vertices connected to current vertex
                for (let i of this.adjList.get(cur)) {
                    stack.push(i);
                }
            }
            j++
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

graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');

graph.addEdge('a', 'b')
graph.addEdge('b', 'c')
graph.addEdge('c', 'a')

graph.addEdge(0, 1)
graph.addEdge(1, 2)
graph.addEdge(2, 0)

graph.addEdge(3, 4)
graph.addEdge(4, 5)
graph.addEdge(5, 3)

graph.addEdge(6, 7)
graph.addEdge(7, 8)
graph.addEdge(8, 6)

graph.printGraph();

// graph.bfs(0)

// graph.dfs(0)