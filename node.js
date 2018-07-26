
// constructor function for a node object
function Node(value, id, link){
    this.value = value;
    this.id = id;
    this.link = link;
    this.edges = [];
 //   this.searched = false;
 //   this.parent = null; 
}


Node.prototype.addEdge = function(neighbor){
    this.edges.push(neighbor);
    // Both directions
   
}
