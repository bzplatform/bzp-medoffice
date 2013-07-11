var pntl = {
   update : function() {
      var json = $('.pntl-state').val();
      var values = {};
      if (json !== undefined && json !==  '') {
         values = JSON.parse(unescape(json));
      }
      $('.pntl-section').each(function(i, pntlSection) {
         if ($(pntlSection).data() == null) {
            alert('pntlSection without data');
            return;
         }
         var section = $(pntlSection).data().section;
         values[section] = {};
         $(pntlSection).find('*').each(function(index, elem) {              
            if ($(elem).data() != {} && $(elem).data().name !== undefined) {
               if ($(elem).is("input:checkbox")) {
                  values[section][$(elem).data().name] = $(elem).is(":checked");
               } else if ($(elem).is("input:radio:checked")) {
                  values[section][$(elem).data().name] = $(elem).val();
               } else if($(elem).is("select")) {
                  values[section][$(elem).data().name] = $(elem).find("option:selected").val();
               } else if($(elem).is("input:text, textarea")) {
                  values[section][$(elem).data().name] = $(elem).val() != "" ? $(elem).val() : null;
               }
            }
         });
         $('.pntl-' + section + '-val').val(pntl.toString(values, pntlSection));
      //alert(escape(JSON.stringify(values)));
      //alert(JSON.stringify(values));
      });
      $('.pntl-state').val(escape(JSON.stringify(values)));
   },
         
   refresh : function() {
      var json = $('.pntl-state').val();
      var values = {};
      if (json !== undefined && json !==  '') {
         values = JSON.parse(unescape(json));
      }
      $('.pntl-section').each(function(i, pntlSection) {
         if ($(pntlSection).data() == null) {
            alert('pntlSection without data');
            return;
         }
         var section = $(pntlSection).data().section;
         if (values[section] === undefined) {
            values[section] = {};
         }
         $(pntlSection).find('*').each(function(index, elem) {
            if ($(elem).data() != {} && $(elem).data().rendered !== undefined) {
               with (values[section]) {
                  var rendered = false;
                  try {
                     rendered = eval($(elem).data().rendered);
                  } catch(e) {}
                  if (! rendered) {
                     $(elem).remove();
                  }
                  }
            }
         });
         $(pntlSection).find('*').each(function(index, elem) {
            if ($(elem).data() != {} && $(elem).data().name !== undefined) {
               if ($(elem).is("input:checkbox")) {
                  values[section][$(elem).data().name] ? $(elem).attr("checked", "checked") : $(elem).removeAttr("checked");
               } else if ($(elem).is("input:radio:checked")) {
                  values[section][$(elem).data().name] == $(elem).val() ? $(elem).attr("checked", "checked") : $(elem).removeAttr("checked");
               } else if($(elem).is("select")) {
                  $(elem).find("option").each(function(index, option){
                     $(option).val() == values[section][$(elem).data().name] ? $(option).attr("selected", "selected") : $(elem).removeAttr("selected");
                  });
               } else if($(elem).is("input:text, textarea")) {
                  $(elem).val(values[section][$(elem).data().name] ? values[section][$(elem).data().name] : "");
               } 
            }
         });
      });
   },
         
   toString : function(values, pntlSection) {
      var copy = $(pntlSection).clone();
      var section = $(pntlSection).data().section;
      copy.find('*').each(function(index, elem) {
         if ($(elem).data() != {} && $(elem).data().textIf !== undefined) {
            with (values[section]) {
               var textIf = false;
               try {
                  textIf = eval($(elem).data().textIf);
               } catch(e) {}
               if (! textIf) {
                  $(elem).remove();
               }
               }
         }
      });
      copy.find('*').each(function(index, elem) {
         if ($(elem).data() != {} && $(elem).data().name !== undefined) {
            if ($(elem).is("input:checkbox")) {               
               if ($(elem).is(":checked") && $(elem).data().valueChecked !== undefined) {
                  $(elem).replaceWith($(elem).data().valueChecked);
               } else if ($(elem).is(":not(:checked)") && $(elem).data().valueUnchecked !== undefined) {
                  $(elem).replaceWith($(elem).data().valueUnchecked);
               }
            } else if ($(elem).is("input:radio, select, input:text, textarea")) {
               var elemText = '';
               if (values[section][$(elem).data().name]) {
                  elemText = values[section][$(elem).data().name].replace(/\n/gm, "__BR__");
               }
               $(elem).replaceWith(elemText);
            } 
         }
      });
      var text = copy.text();
      text = $.trim(text.replace(/\s+/gm, " "));
      text = text.replace(/\s\./gm, ".");
      text = text.replace(/\s\,/gm, ",");
      text = text.replace(/\s\;/gm, ";");
      text = text.replace(/,$/gm, ".");
      text = text.replace(/;$/gm, ".");
      text = text.replace(/__BR__/gm, "\n");
      return text;      
   }
}

//$(document).ready(function() {
//   pntl.refresh();   
//});