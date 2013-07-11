$(document).ready(function(){
   jsPrintSetupInstalled = false;
   try {
      jsPrintSetup;
      jsPrintSetupInstalled = true;
   } catch (ex) {
      $("#jsprint-install").css("display", "inline-block");
      $("#print-link").css("display", "none");
   }
}
);
function print(orientation, margin) {
    if (jsPrintSetupInstalled) {
      if (orientation == "Portrait") {
         jsPrintSetup.setOption('orientation', jsPrintSetup.kPortraitOrientation);
      } else if (orientation == "Landscape") {
         jsPrintSetup.setOption('orientation', jsPrintSetup.kLandscapeOrientation);
      }
      if (margin == undefined) {
         margin = 0;
      }
      jsPrintSetup.setPaperSizeUnit(jsPrintSetup.kPaperSizeMillimeters);
      jsPrintSetup.setOption('marginTop', margin);
      jsPrintSetup.setOption('marginBottom', margin);
      jsPrintSetup.setOption('marginLeft', margin);
      jsPrintSetup.setOption('marginRight', margin);
      jsPrintSetup.clearSilentPrint();
      jsPrintSetup.setOption('printSilent', 1);
      jsPrintSetup.print();
   } else {
      window.print();
   }
   return false;
}

