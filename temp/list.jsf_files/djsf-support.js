dojo.require("dijit.form.DateTextBox");
//dojo.require("dijit.form.FilteringSelect");
//dojo.require("dijit.form.Button");
dojo.declare("djsf.DateTextBox",[dijit.form.DateTextBox], {
    serialize: function(d, options) {
        return this.getDisplayedValue();
    }
});
dojo.addOnLoad(
    function(){
        dojo.query("input.djsf_DateTextBox" ).forEach(function(node, i){
            var dateTextBox = new djsf.DateTextBox({
                id: dojo.attr(node, "id"),
                name: dojo.attr(node, "id"),
                constraints: {
                    datePattern: 'M/d/yy'
                },
                class: dojo.attr(node, "class")
            }, node);
            dateTextBox.setDisplayedValue(node.value);
            dateTextBox.constraints.fullYear = false;
        });
        dojo.query("select.djsf_FilteringSelect" ).forEach(function(node, i){
            var content = node.innerHTML;
            var select = new dijit.form.FilteringSelect({
                id: dojo.attr(node, "id"),
                name: dojo.attr(node, "id"),
                class: dojo.attr(node, "class"),
                style: dojo.attr(node, "style"),
                disabled: dojo.attr(node, "disabled")
            }, node);
            select.innerHTML = content;
        });
        dojo.query("input.djsf_SubmitButton" ).forEach(function(node, i){
            var button = new dijit.form.Button({
                class: dojo.attr(node, "class"),
                style: dojo.attr(node, "style"),
                disabled: dojo.attr(node, "disabled"),
                label: dojo.attr(node, "value"),
                type: "submit",
                onClick: function(){
                    var param = document.createElement("input");
                    param.type = "hidden";
                    param.name = dojo.attr(node, "name");
                    param.value = dojo.attr(node, "value");
                    dojo.query("form").forEach(function(form){
                        form.appendChild(param);
                    });
                }
            }, node);
        });
    }
);