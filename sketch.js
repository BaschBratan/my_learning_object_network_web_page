var data;               // Used for loading the json data
var graph;              // Graph definition
var id_lernObjects;     // id of Main Path Elements
var name_lernObjects;   // name/value of Main Path Elements
var ext;                // Extention objects of Main Path Elements
var prev;               // Previous objects of Main Path Elements
var link_lernObjects;   // links of Main Path Elements

// Function preload from P5 Library to load JSON
// Name of the JSON File "lern_objects.json"
function preload() {    
    data = loadJSON("lernobjekt.json"); 
}

// Setup function from P5 Library for window loading
function setup() {   
    // Setting the Graph
    graph = new Graph();  
       
    var lernObjects = data.lernobjekte; 
    var lernObjects_length = lernObjects.length;
    for (var i = 0; i < lernObjects_length; i++) {
        
        id_lernObjects = lernObjects[i].id;
        name_lernObjects = lernObjects[i].name;
        //console.log(name_lernObjects);
        ext = lernObjects[i].ext;
        prev = lernObjects[i].prev;
        link_lernObjects = lernObjects[i].link;
        
        var lernObjects_Node = graph.getNode(name_lernObjects, id_lernObjects, link_lernObjects);
        if (lernObjects_Node == undefined){
            lernObjects_Node = new Node(name_lernObjects, id_lernObjects, link_lernObjects);
        }
        graph.addNode(lernObjects_Node);
        // just like add the add all the actors
        

        var prev_length = prev.length;
        for (var p = 0; p < prev_length; p++) {
            var prev_lern_objects = prev[p].name;
            var id_prev = prev[p].id;
            var link_prev = prev[p].link;

            var prev_lern_objects_Node = graph.getNode(prev_lern_objects, id_prev, link_prev);
            if (prev_lern_objects_Node == undefined){
                prev_lern_objects_Node = new Node(prev_lern_objects, id_prev, link_prev);
            }    
            graph.addNode(prev_lern_objects_Node);
            lernObjects_Node.addEdge(prev_lern_objects_Node);  
        }
        var ext_length = ext.length;     
        for (var j = 0; j < ext_length; j++) {
            var ext_lernObjects = ext[j].name; 
            var id_ext = ext[j].id;
            var link_ext = ext[j].link;

            var ext_lernObjects_Node = graph.getNode(ext_lernObjects, id_ext, link_ext);
            if (ext_lernObjects_Node == undefined){
                ext_lernObjects_Node = new Node(ext_lernObjects, id_ext, link_ext);
            }    
            graph.addNode(ext_lernObjects_Node);
            lernObjects_Node.addEdge(ext_lernObjects_Node);
        }
        // main path elements in nav bar//
        var mainPath = document.createElement('a');
        mainPath.className = 'w3-bar-item w3-mobile w3-border-right';
        mainPath.id = id_lernObjects;
        mainPath.href = link_lernObjects;
        mainPath.title = lernObjects_Node.value;
        mainPath.innerHTML =
        '<span class="glyphicon glyphicon-bookmark"></span>' + lernObjects_Node.value + '</a>';
        document.getElementById('myHeader').appendChild(mainPath);
        //console.log(mainPath);
    }

    //Load visited sites from localStorage
    var path = JSON.parse(localStorage['path']);
    console.log(path);
    for(var i=0; i<path.length; i++){
        var elem = document.createElement('a');
         elem.className = 'w3-bar-item w3-mobile w3-border-right';
         elem.href = path[i]["href"];
         elem.title = path[i]["title"];
         elem.innerHTML =  path[i]["title"] + '</a>';
         
         // For the localStorage
         if(path[i]["position"] == "before"){
            $("a[href='"+path[i]["parent"]+"']").before(elem);
         } else if(path[i]["position"] == "after"){
            $("a[href='"+path[i]["parent"]+"']").after(elem);
         }
    }

    var curpage;
    // Marking the active element in the header with red
    $('a').each(function(){
        if ($(this).prop('href') == window.location.href) {
            $(this).addClass('active');
            curpage = $(this).attr("title");
        }
    });

    $('.previous').one('click', function(){
        window.location = $('.active').prev().attr('href');
    });
    $('.next').one('click', function(){
        window.location = $('.active').next().attr('href');
    });
   
    // Button ID for adding the prev element before the active element from the lecturer Path
    $("#addPrev").one("click", function() {
        // To check if this element is in the path
        for(var i=0; i<path.length; i++){
            // If this element is already available in the path, then delete it.
            if(path[i]["href"] == graph.graph[curpage].edges[0].link){
                path.splice(i, 1);
                break;
            }
        }
        // push the node prev in the path before the active element
        path.push({"href" : graph.graph[curpage].edges[0].link, "position" : "before", "parent" : $(".active").attr("href"), "title" : graph.graph[curpage].edges[0].value});
        // save it as string in the localStorage
        localStorage['path'] = JSON.stringify(path);
        // Go to the link of the page
        window.location = graph.graph[curpage].edges[0].link;
    });

    // Button ID for adding the ext element after the active element from the lecturer Path    
    $("#addExt").one("click", function() {
        // To check if this element is in the path    
        for(var i=0; i<path.length; i++){
            // If this element is already available in the path, then delete it.
            if(path[i]["href"] == graph.graph[curpage].edges[1].link){
                path.splice(i, 1);
                break;
            }
        }
        // push the node ext in the path after the active element
        path.push({"href" : graph.graph[curpage].edges[1].link, "position" : "after", "parent" : $(".active").attr("href"), "title" : graph.graph[curpage].edges[1].value});
        // save it as string in the localStorage
        localStorage['path'] = JSON.stringify(path);
        // Go to the link of the page
        window.location = graph.graph[curpage].edges[1].link;
    });
   console.log(graph);
}
