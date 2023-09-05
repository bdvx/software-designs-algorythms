interface WeightedGraphI<T> {
    addVertex(key: string): void;
    addEdge(vertex1: T, vertex2: T, weight: number): void;
  }

 export class WeightedGraph<T> implements WeightedGraphI<T> {
    adjacenyList;
    constructor() {
      this.adjacenyList = {};
    }
  
    addVertex(vertex) {
      if (!this.adjacenyList[vertex]) {
        this.adjacenyList[vertex] = [];
      }
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.adjacenyList[vertex1].push({ node: vertex2, weight });
      this.adjacenyList[vertex2].push({ node: vertex1, weight });
    }
  
    removeEdge(vertex1, vertex2) {
      this.adjacenyList[vertex1] = this.adjacenyList[vertex1].filter(
        v => v !== vertex2
      );
      this.adjacenyList[vertex2] = this.adjacenyList[vertex2].filter(
        v => v !== vertex1
      );
    }
  
    removeVertex(vertex) {
      const edges = this.adjacenyList[vertex];
      edges.forEach(e => this.removeEdge(e, vertex));
      delete this.adjacenyList[vertex];
    }
  }