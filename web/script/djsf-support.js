dojo.require("dojo.parser");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.NumberSpinner");
//dojo.require("dijit.form.Button");
dojo.declare("djsf.DateTextBox",[dijit.form.DateTextBox], {
   serialize: function(d, options) {
      return this.getDisplayedValue();
   }
});

function dojoParse(){
   dojo.query("input.djsf_DateTextBox" ).forEach(function(node, i){
      var w = dijit.byId(dojo.attr(node, "id"));
      if (w != null) {
         w.destroy();
      }
      var dateTextBox = new djsf.DateTextBox({
         id: dojo.attr(node, "id"),
         name: dojo.attr(node, "id"),
         constraints: {
            datePattern: 'M/d/yy'
         },
         class: dojo.attr(node, "class"),
         jsfNode: node,
         onChange: function(){
            if (! this.firstTime) {
               this.jsfNode.value = this.getDisplayedValue();
               $(this.jsfNode).trigger("change");
            }
            this.firstTime = false;
         },
         firstTime: true
      }, node);
      dateTextBox.setDisplayedValue(node.value);
      dateTextBox.constraints.fullYear = false;
   });
   dojo.query("input.djsf_DateTextBoxYYYY" ).forEach(function(node, i){
      var w = dijit.byId(dojo.attr(node, "id"));
      if (w != null) {
         w.destroy();
      }
      var dateTextBox = new djsf.DateTextBox({
         id: dojo.attr(node, "id"),
         name: dojo.attr(node, "id"),
         constraints: {
            datePattern: 'M/d/yyyy'
         },
         class: dojo.attr(node, "class"),
         jsfNode: node,
         onChange: function(){
            if (! this.firstTime) {
               this.jsfNode.value = this.getDisplayedValue();
               $(this.jsfNode).trigger("change");
            }
            this.firstTime = false;
         },
         firstTime: true
      }, node);
      dateTextBox.setDisplayedValue(node.value);
      dateTextBox.constraints.fullYear = false;
   });
   dojo.query("input.djsf_immediate_DateTextBox" ).forEach(function(node, i){
      var w = dijit.byId(dojo.attr(node, "id"));
      if (w != null) {
         w.destroy();
      }
      var dateTextBox = new djsf.DateTextBox({
         id: dojo.attr(node, "id"),
         name: dojo.attr(node, "id"),
         constraints: {
            datePattern: 'M/d/yy'
         },
         class: dojo.attr(node, "class"),
         onChange: function(){
            if (! this.firstTime) document.forms[0].submit();
            this.firstTime = false;
         },
         firstTime: true
      }, node);
      dateTextBox.setDisplayedValue(node.value);
      dateTextBox.constraints.fullYear = false;
   });
   dojo.query("input.djsf_immediate_NumberSpinner" ).forEach(function(node, i){
      var w = dijit.byId(dojo.attr(node, "id"));
      if (w != null) {
         w.destroy();
      }
      var numberSpinner = new dijit.form.NumberSpinner({
         id: dojo.attr(node, "id"),
         name: dojo.attr(node, "id"),
         constraints: {
            min: 0
         },
         class: dojo.attr(node, "class"),
         onChange: function(){
            if (! this.firstTime) document.forms[0].submit();
            this.firstTime = false;
         },
         firstTime: true
      }, node);
      numberSpinner.setDisplayedValue(node.value);
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
   dojo.query("input[type='checkbox'].check").forEach(function(node, i){
      node.checked = "true";
   });
   dojo.query("input[type='checkbox'].uncheck").forEach(function(node, i){
      node.checked = null;
   });
   dojo.query("div.fix").forEach(function(node, i){
      dojo.query("." + dojo.attr(node, "for"))[0].value = dojo.attr(node, "value");
   });
   $(".mask-phone").mask("(999)999-9999");
   $(".mask-npi").mask("9999999999");
   $(".mask-ssn").mask("999-99-9999");
   $(".mask-date").mask("99/99/9999");
   $(".mask-zip").mask("99999?-9999");
   $(".ptTimeSelect").ptTimeSelect();
   $(".context-menu-button").each(function (index, elem){
      if ($(elem.parentNode).find("* a").size() == 0) {
         $(elem).css("display", "none");
         $(elem).toggleClass("context-menu-button");
      }
   });
   $.contextMenu({
      selector: '.context-menu-button',
      trigger: 'left',
      build: function($trigger, e) {         
         return {
            callback: function(key, options) {
               $($.contextMenu._items[key]._target).click();
            },
            events: {
               show: function(opt){
                  if ($(e.target).prop('title')) {
                     $(".context-menu-root").addClass("titled");
                     $(".context-menu-root").prop("title", $(e.target).prop('title'));
                  }
               }
            },
            items: function (){
               var items = {};
               $(e.target.parentNode).find("a, input:checkbox, div.separator").each(function (index, elem){
                  if ($(elem).is("a") && ! $(elem).is("a.exclude-from-menu")) {
                     items[index] = {
                        name: $(elem).text(), 
                        _target: elem
                     }
                  } else if ($(elem).is("input:checkbox")) {
                     items[index] = {
                        type: 'checkbox',
                        name: $(elem).next('label').text(),
                        _target: elem,
                        selected : ($(elem).attr("checked") == "checked"),
                        events: {
                           click : function(e) {
                              $(elem).click();
                           }
                        }
                     }
                  } else if ($(elem).is("div.separator")) {
                     items[index] = "---------";
                  }
               });
               $.contextMenu._items = items;
               return items;
            } ()
         };
      }
   });
   (function() {
      var options = {
         serviceUrl: "autocomplete-diagnosis.jsf", 
         minChars:3
      };
      $(".autocomplete-diagnosis").each(function(index) {
         $(this).autocomplete(options);
      });
   })();

   (function() {
      var options = {
         serviceUrl: "autocomplete-procedure.jsf", 
         minChars:3
      };
      $(".autocomplete-procedure").each(function(index) {
         $(this).autocomplete(options);
      });
   })();

   (function() {
      var options = {
         serviceUrl: "../ReferringProvider/autocomplete.jsf", 
         minChars:3
      };
      $(".autocomplete-referring-provider").each(function(index) {
         $(this).autocomplete(options);
      });
   })();
   
   (function() {
      var options = {
         serviceUrl: "../Drug/autocomplete.jsf", 
         minChars:3
      };
      $(".autocomplete-drug").each(function(index) {
         $(this).autocomplete(options);
      });
   })();
   
   (function() {
      var options = {
         serviceUrl: "../Allergy/autocomplete.jsf", 
         minChars:1
      };
      $(".autocomplete-allergy").each(function(index) {
         $(this).autocomplete(options);
      });
   })();
   
   (function() {
      var options = {
         serviceUrl: "../Pharmacy/autocomplete.jsf", 
         minChars:3
      };
      $(".autocomplete-pharmacy").each(function(index) {
         $(this).autocomplete(options);
      });
   })();
   
   (function() {
      $('form').each(function () {
         var thisform = $(this);
         thisform.prepend(thisform.find(':submit.default').clone().css({
            position: 'absolute',
            left: '-999px',
            top: '-999px',
            height: 0,
            width: 0
         }));
      });
   })();
   
   $(".emr_template").bind("keypress", function(ev) {
      $(ev.target).attr("keyCode", ev.keyCode);
   });
   
   $(".emr_template").bind({

      keyIn: function(ev){
         if ($(ev.target).attr("keyCode") != 40) {
            ev.smartAutocompleteData.query = "IMPOSSIBLE_TERM";
         } else {
            ev.smartAutocompleteData.query = "";
         }
         $(ev.target).attr("keyCode", null);
      },

      itemSelect: function(ev, selected_item){ 
         var options = $(this).smartAutoComplete();

         //get the text from selected item
         var selected_value = $(selected_item).text();
         $(this).val($(this).val() + ($(this).val() == "" ? "" : ". ") + selected_value);

         //set item selected property
         options.setItemSelected(true);

         //hide results container
         $(this).trigger('lostFocus');
              
         //prevent default event handler from executing
         ev.preventDefault();
      }

   });
   
}

function ajaxEventHandler(evt){
   $(document).ready( function() {
      if (evt.status == "success"){
         dojoParse();
         errorsTuner();
         dojo.parser.parse();
      }
   });
}

function restoreFocus(evt){
   $(document).ready( function() {
      if (evt.status == "success"){
         $(evt.source).val("");
         $(evt.source).focus();
      }
   });
}

function fixer(evt){
   $(document).ready( function() {
      if (evt.status == "success"){
         $("input[type=text].fix").each(function(index) {
            this.value = $(this).next('div').text();
         });
         $("input[type=checkbox].fix").each(function(index) {
            $(this).next('div').text() == "true" ? $(this).attr("checked","checked") : $(this).removeAttr("checked");
         });
         $(".toolbar-container").click(function(evt){
            var toolbar = $(this).children(".toolbar");
            toolbar.css("display", "inline-block");
            var tid = setTimeout(function(){
               toolbar.css("display", "none");
               clearTimeout(tid);
            }, 5000);
         });
         $(".toolbar-container").toggleClass("toolbar-container");
      }
   });
}

function okPost(evt){
   $(document).ready( function() {
      if (evt.status == "success"){
         $(".ok-button-post").click();
      }
   });
}

function okPost(){
   $(document).ready( function() {
      $(".ok-button-post").click();
   });
}

$(document).ready( function() {
   $(".toolbar-container").click(function(evt){
      var toolbar = $(this).children(".toolbar");
      toolbar.css("display", "inline-block");
      var tid = setTimeout(function(){
         toolbar.css("display", "none");
         clearTimeout(tid);
      }, 5000);
   });
   $(".toolbar-container").toggleClass("toolbar-container");
});

//$(document).ready( function() {
//   var options = {
//      serviceUrl: "autocomplete-diagnosis.jsf", 
//      minChars:3
//   };
//   $(".autocomplete-diagnosis").each(function(index) {
//      $(this).autocomplete(options);
//   });
//});
//
//$(document).ready( function() {
//   var options = {
//      serviceUrl: "autocomplete-procedure.jsf", 
//      minChars:3
//   };
//   $(".autocomplete-procedure").each(function(index) {
//      $(this).autocomplete(options);
//   });
//});
//
//$(document).ready( function() {
//   var options = {
//      serviceUrl: "autocomplete-referring-provider.jsf", 
//      minChars:3
//   };
//   $(".autocomplete-referring-provider").each(function(index) {
//      $(this).autocomplete(options);
//   });
//});

dojo.addOnLoad(
   function(){
      dojoParse();
      dojo.parser.parse();
   }
   );

