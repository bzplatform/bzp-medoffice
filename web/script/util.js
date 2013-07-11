dojo.require("dojo.NodeList-manipulate");

function focusElement(elementId) {
   var elem = document.getElementById(elementId);
   elem.focus();
   elem.select();
}

function keyHandler(evt) {
   var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
   if (charCode == 13) {
      document.forms[0].submit();
      return false;
   }
   else return true;
}

function suppressEnterKeyHandler(evt) {
   var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
   if (charCode == 13) {
      $(evt.target).blur();
      return false;
   }
   return true;
}

function searchEnterKeyHandler(evt) {
   var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
   if (charCode == 13) {
      $(".ok-button").click();
      return false;
   }
   return true;
}

function errorsTuner(){
   dojo.query("span.errors, ul.errors")
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

function radioGroup(elem, cssClass) {
   if (cssClass === '') {
      return;      
   }
   if($(elem).attr("checked") == false) {
      $(elem).attr("checked", true);
   } else {
      $('input:checkbox.radio-group-' + cssClass).each(function(index){
         if (this != elem) {
            $(this).attr("checked", false);
         }
      });
   }
}

function alertFinishEditing() {
   alert('Finish Section Editing');
   document.location.reload();
}

