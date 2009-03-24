UmlCanvas.Dependency = Class.create( Canvas2D.Connector, {
    getType: function() { return "dependency"; },

    myProperties: function($super) {
	return $super().concat([ "client", "supplier" ]);
    },

    getClient  : function() { return this.client;   },
    getSupplier: function() { return this.supplier; },

    preprocess: function(props) {
	props.end = UmlCanvas.ConnectorHeads.Arrow;
	props.lineStyle = "dashed";
	props['routing'] = props['routing'] || "horizontal";
	return props;
    },

    asConstruct: function($super) {
	var construct = $super();
	// TODO
	return construct;
    }
});

UmlCanvas.Dependency.getNames = function() {
    return ["dependency"];
}

UmlCanvas.Dependency.from = function(construct, diagram) {
    var client, supplier, props;
    if( construct.children[0].type == "client" ) {
	client   = construct.children[0];
	supplier = construct.children[1];
    } else {
	client   = construct.children[1];
	supplier = construct.children[0];
    }
    var treeStyle = "horizontal";
    if( construct.annotation ) {
	if( construct.annotation.data == "vertical" ) {
	    treeStyle = "vertical";
	}
    }
   
    var src = diagram.getClass(client.supers[0].constructName);
    var dst = diagram.getClass(supplier.supers[0].constructName);

    props = { name: construct.name, style: treeStyle, from: src, to: dst };

    elem = new UmlCanvas.Dependency( props );
    return diagram.addRelation(elem);
};
    
Canvas2D.ADLVisitor.registerConstruct(UmlCanvas.Dependency);
