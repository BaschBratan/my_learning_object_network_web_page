function Graph() {
    
    this.nodes = [];
    this.graph = {};
 //   this.end = null;
 //   this.start = null;

}
/*
Graph.prototype.reset = function () {
    for (var i = 0; i< this.nodes.length; i++ ){
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;
    }
}

Graph.prototype.setStart = function(knows_person) {
    this.start = this.graph[knows_person];
    return this.start;
}

Graph.prototype.setEnd = function(knows_person) {
    this.end = this.graph[knows_person];
    return this.end;
}
*/
Graph.prototype.addNode = function(n) {
    // Node into array
    this.nodes.push(n);
    var name = n.value;
    // Node into hash
    this.graph[name] = n;
}

Graph.prototype.getNode = function(knows_person){
    var n = this.graph[knows_person];
    return n;
}