if (window.jLog) with (jLog.Format) {
   width		= '60ex';
   height		= '95%';
   positionTop	= 0;
   fontSize	= 1;
}

var $Tabs, $InnerTabs;
var $AccordionInTab2, $AccordionInTab3;
var outerLayout, tabsContainerLayout;

var debugEnabled = false;

function debug(msg) {
   if (debugEnabled && typeof console != 'undefined') {
      console.log(msg);
   }
}

function toggleCustomTheme () {
   $('body').toggleClass('custom');
   resizeOuterLayout();
}

function resizeOuterLayout () {
   if (outerLayout) outerLayout.resizeAll();
}

function resizeSidebarLayout (pane, $Pane, state, options, layoutName) {
   if ($Pane.data("layoutContainer")) {
      debug("Resizing Layout: "+layoutName+" Pane:"+pane);
      $Pane.layout().resizeAll();
   }
}

function resizeTabPanelLayout () {
   var
   tabIndex	= $Tabs.tabs("option", "selected")
   ,	$TabPanel	= $( "#tab"+ (tabIndex + 1) ).show() // make sure is 'visible'
   ,	tabLayout
   ;
   // IF tabLayout exists - get Instance and call resizeAll
   if ($TabPanel.data("layoutContainer")) {
      // resize the layout-panes - if required
      tabLayout = $TabPanel.layout();
      tabLayout.resizeAll();
   }
   // else if tabLayout does not exist yet, create it now
   else { // if (ui.index > 0) // panel #0 layout is initialized in document.ready
      tabLayout = $TabPanel.layout( tabLayoutOptions );
      // also create nested-layouts in the 2 sidebars
      tabLayout.panes.west.layout( sidebarLayoutOptions );
      tabLayout.panes.east.layout( sidebarLayoutOptions );
   }

   // call sub-routines to handle widgets INSIDE the TabPanels
   handle_AccordionInTab2( tabLayout );
   handle_InnerTabsInTab3( tabLayout );
   return;

}

/*
 *	SUBROUTINES...
 */

function handle_AccordionInTab2 (tabLayout) {
   // see if Tab-Layout contains #AccordionInTab2, and handle if so
   if (tabLayout.panes.center.find("#tabTwoCenterAccordion").length) {
      if (!$AccordionInTab2)
      // Accordion not created yet, so do it now
         $AccordionInTab2 = tabLayout.panes.center.find("#tabTwoCenterAccordion").accordion({
            fillSpace:	true
            ,	active:		2 // 3rd panel
         });
      else
      // Accordion already exists, so resize it
         $AccordionInTab2.accordion("resize");
   }
}

function handle_InnerTabsInTab3 (tabLayout) {
   // if this tab contains #innerTabs, handle that
   if (tabLayout.panes.center.is("#innerTabs")) {
      if (!$InnerTabs) { // $InnerTabs not created yet
         $InnerTabs = tabLayout.panes.center; // set FIRST for handle_AccordionInTab3()
         $InnerTabs.tabs({
            show: function(){ handle_AccordionInTab3(); }
         });
         tabLayout.sizeContent("center"); // resize to fit tab-buttons correctly
      }
      else
         handle_AccordionInTab3();
   }
}

function handle_AccordionInTab3 () {
   // IF tab containing the Accordion is visible, then create OR resize it
   if ($InnerTabs.tabs("option", "selected") == 1) {
      if (!$AccordionInTab3)
      // Accordion not created yet, so do it now
         $AccordionInTab3 = $("#simpleTabAccordion").accordion({
            fillSpace:	true
            ,	active:		0 // 1st panel
         });
      else
      // Accordion already exists, so resize it
         $AccordionInTab3.accordion("resize");
   }
}


var tabLayoutOptions = {
   name:					'tabPanelLayout' // only for debugging
   ,	resizeWithWindow:		false	// required because layout is 'nested' inside tabpanels container
   //,	resizeWhileDragging:	true	// slow in IE because of the nested layouts
   ,	resizerDragOpacity:		0.5
   ,	north__resizable:		false
   ,	south__resizable:		false
   ,	north__closable:		false
   ,	south__closable:		false
   ,	west__minSize:			200
   ,	east__minSize:			200
   ,	center__minWidth:		400
   ,	spacing_open:			10
   ,	spacing_closed:			10
   ,	contentSelector:		".ui-widget-content"
   ,	togglerContent_open:	'<div class="ui-icon"></div>'
   ,	togglerContent_closed:	'<div class="ui-icon"></div>'
   ,	center__onresize:		function (pane, $Pane) { $Pane.find("#AccordionInTab2").accordion("resize"); }
   /*	don't need nested-layout callbacks as of Layout 1.3 RC-29
      ,	west__onresize:			resizeSidebarLayout
      ,	east__onresize:			resizeSidebarLayout
    */
}

var sidebarLayoutOptions = {
   name:					'sidebarLayout' // only for debugging
   ,	resizeWhileDragging:	true
   ,   north__size:			"30%"
   ,   south__size:			"30%"
   ,	minSize:				100
   ,	center__minHeight:		100
   ,	spacing_open:			10
   ,	spacing_closed:			10
   ,	contentSelector:		".ui-widget-content"
   ,	togglerContent_open:	'<div class="ui-icon"></div>'
   ,	togglerContent_closed:	'<div class="ui-icon"></div>'
}

$(document).ready( function() {

   outerLayout = $("body").layout( {
      name:					'outerLayout' // only for debugging
      ,	resizeWithWindowDelay:	250		// delay calling resizeAll when window is *still* resizing
      //,	resizeWithWindowMaxDelay: 2000	// force resize every XX ms while window is being resized
      ,	resizable:				false
      ,	slidable:				false
      ,	closable:				false
      ,	north__paneSelector:	"#outer-north"
      ,	center__paneSelector:	"#outer-center"
      ,	south__paneSelector:	"#outer-south"
      ,	south__spacing_open:	0
      ,	north__spacing_open:	0
      /*	don't need nested-layout callbacks as of Layout 1.3 RC-29
            ,	center__onresize:		"tabsContainerLayout.resizeAll"
       */
   });

   tabsContainerLayout = $("#outer-center").layout( {
      name:					'tabsContainerLayout' // only for debugging
      ,	resizable:				false
      ,	slidable:				false
      ,	closable:				false
      ,	north__paneSelector:	"#tabbuttons"
      ,	center__paneSelector:	"#tabpanels"
      ,	spacing_open:			0
      ,	center__onresize:		resizeTabPanelLayout // resize VISIBLE tabPanelLayout
   });

   window.tabsLoading = true;
   // set object BEFORE initializing tabs because is used during init
   $Tabs = $("#outer-center");
   $Tabs
   .tabs({
      show: function (evt, ui) {
         // need to resize layout after tabs init,
         // but before creating inner tabPanelLayout
         if (tabsLoading) {
            tabsLoading = false;
            tabsContainerLayout.resizeAll();
            // resizeAll will trigger center.onresize = resizeTabPanelLayout()
         }
         else // resize the INNER-layout each time it becomes 'visible'
            resizeTabPanelLayout(ui);
      }
   })
   .find(".ui-tabs-nav")
   .sortable({ axis: 'x', zIndex: 2 })
   ;

   addThemeSwitcher('#outer-north',{ top: '13px', right: '20px' });
   // if a theme is applied by ThemeSwitch *onLoad*, it may change the height of some content,
   // so we need to call resizeLayout to 'correct' any header/footer heights affected
   // call multiple times so fast browsers update quickly, and slower ones eventually!
   // NOTE: this is only necessary because we are changing CSS *AFTER LOADING* (eg: themeSwitcher)
   //setTimeout( resizeOuterLayout, 1000 ); /* allow time for browser to re-render for theme */
   //setTimeout( resizeOuterLayout, 5000 ); /* for really slow browsers */
});