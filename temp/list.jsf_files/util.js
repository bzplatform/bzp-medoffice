dojo.require("dojo.NodeList-manipulate");

function focusElement(elementId) {
    var elem = document.getElementById(elementId);
    elem.focus();
    elem.select();
}

function keyHandler(evt) {
    var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
    if (charCode == 13) {
        document.getElementById('addItem').click();
        return false;
    }
    else return true;
}

function errorsTuner(){
    dojo.query("span.errors")
    .wrap("<div class='error-wrapper' style='position: relative;'></div>");
    dojo.query("div.error-wrapper")
    .forEach(function(node){
          dojo.connect(node, "onclick", null, function(e){
             //alert(e.target.parentNode);
             dojo.style(e.target.parentNode, 'display', 'none');
          });
    })
}

dojo.addOnLoad(function(){
    errorsTuner();
});

