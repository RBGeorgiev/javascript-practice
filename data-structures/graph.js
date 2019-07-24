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

        let ans = []
        let counter = 0
        let visited = []

        let search = (next) => {
            for (let i of this.adjList.get(next)) {
                counter++
                if (counter > 100) break;

                if (!ans.includes(next)) ans.push(next);

                if (!visited.includes(i)) {
                    visited.push(i);
                    search(i)
                }
            }
        }
        search(start);
        console.log(counter)
        return ans
    }

    // dfs(start) {
    //     let visited = [];
    //     let ans = [];
    //     let stack = [start];

    //     let loop = 0

    //     while (stack.length && loop < 111) {
    //         start = stack.shift();
    //         if (!visited.includes(start)) {

    //             ans.push(start);

    //             visited.push(start);

    //             for (let i of this.adjList.get(start)) {
    //                 stack.push(i);

    //             }

    //             loop++
    //         }
    //     }
    //     console.log(loop)
    //     return ans;
    // }
}

let graph = new Graph;

// graph.addVertex(2);
// graph.addVertex(21);
// graph.addVertex(534);
// graph.addVertex(85);
// graph.addVertex(5);

// graph.addEdge(2, 21);
// graph.addEdge(2, 534);
// graph.addEdge(2, 85);
// graph.addEdge(2, 5);

// graph.addEdge(21, 2);
// graph.addEdge(21, 534);
// graph.addEdge(21, 85);
// graph.addEdge(21, 5);

// graph.addEdge(534, 2);
// graph.addEdge(534, 21);
// graph.addEdge(534, 85);
// graph.addEdge(534, 5);

// graph.addEdge(85, 2);
// graph.addEdge(85, 21);
// graph.addEdge(85, 534);
// graph.addEdge(85, 5);

// graph.addEdge(5, 2);
// graph.addEdge(5, 21);
// graph.addEdge(5, 534);
// graph.addEdge(5, 85);

// graph.printGraph();

// graph.bfs(5);



// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5);
// graph.addVertex(6);
// graph.addVertex(7);
// graph.addVertex(8);
// graph.addVertex(9);

// graph.addEdge(1, 3)
// graph.addEdge(1, 9)
// graph.addEdge(2, 1)
// graph.addEdge(3, 7)
// graph.addEdge(3, 8)
// graph.addEdge(4, 2)
// graph.addEdge(4, 3)
// graph.addEdge(4, 8)
// graph.addEdge(5, 2)
// graph.addEdge(5, 6)
// graph.addEdge(6, 1)
// graph.addEdge(6, 8)
// graph.addEdge(6, 9)
// graph.addEdge(7, 2)
// graph.addEdge(7, 6)
// graph.addEdge(8, 3)
// graph.addEdge(8, 5)
// graph.addEdge(9, 1)
// graph.addEdge(9, 7)

// graph.printGraph()
// graph.bfs(5);

var g = new Graph();
var vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

// adding vertices 
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

// adding edges 
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

// prints all vertex and 
// its adjacency list 
// A -> B D E 
// B -> A C 
// C -> B E F 
// D -> A E 
// E -> A D F C 
// F -> E C 
g.printGraph();

// A B C E D F 