//  Oren Fix's Tooltip Plug-in
//  12/31/2013

   /******************************************************
   /                                                     /
   /             OREN FIX'S TOOLTIP PLUG-IN              /
   /                                                     /
   /      Add .tooltipOF class to div or span that       /
   /      includes plug-in.                              /
   /                                                     /
   /      Use 'tooltipOF-title' and 'tooltipOF-content'  /
   /      attributes for tooltip title and               /
   /      contents, respectively.                        /
   /                                                     /
   /                       STYLES                        /
   /      .tooltipOF       =  Div containing tooltip     /
   /                          link                       /
   /      .tooltipTarget   =  Div containing tooltip     /
   /      .tooltipTitle    =  Div containing tooltip     /
   /                          title                      /
   /      .tooltipContent  =  Div containing tooltip     /
   /                          content                    /
   /                                                     /
   /*****************************************************/


//	Create a function to deal with IE8 attachEvent when 'this' is not needed
function addEventHandler(elem, eventType, handler) {
	if (elem.addEventListener) {
    elem.addEventListener (eventType, handler, false);
    }	else if (elem.attachEvent) {
		elem.attachEvent ('on' + eventType, handler);
	}
}

//	Create a function that adds a new Div that will contain the tooltip.
//	The new Div is added after the Div that triggers the tooltip.
//	This function runs on pageload.

function addDiv() {

//	Create an array that contains all elements with class name 'tooltipOF' (class is added by user)	
	var tooltipArray = document.querySelectorAll('.tooltipOF');
	for (var i = 0; i < tooltipArray.length; i+=1) {

//	Assign a unique ID to each elements with class name 'tooltipOF' (link elements)
		tooltipArray[i].id = 'tooltipID'+i;
		elid = 'tooltipID'+i;

//	Create a new target Div with unique ID related to link ID
//	Insert new target Div immediately after Div with link ID		
		var parentDiv =document.getElementById(elid);
		var node=document.createElement("DIV");
		node.id = elid+'_target';
		parentDiv.parentNode.insertBefore(node, parentDiv.nextSibling);

//	Create variables to replace docoment.getElementById
		var tooltipLink = document.getElementById(elid);
		var tooltipTarget = document.getElementById(elid+'_target');

//	Assign target Div a class name of 'tooltipTarget' and add click event listener to hide it
		tooltipTarget.className = 'tooltipTarget';
		if (tooltipTarget.addEventListener) {
			tooltipTarget.addEventListener('click', hideTooltipTarget, false);
			}	else if (tooltipTarget.attachEvent) {
				tooltipTarget.onclick = hideTooltipTarget;
			}

//	Add click event listener to toggle tooltip from link element
		if (tooltipLink.addEventListener) {
			tooltipLink.addEventListener('click', toggleTooltip, false);
			}	else if (tooltipLink.attachEvent) {
				tooltipLink.onclick = toggleTooltip;
			}

//	Add hover event listener to toggle tooltip from link element
		if (tooltipLink.addEventListener) {
			tooltipLink.addEventListener('mouseover', showTooltip, false);
			}	else if (tooltipLink.attachEvent) {
				tooltipLink.onmouseover = showTooltip;
			}

		if (tooltipLink.addEventListener) {
			tooltipLink.addEventListener('mouseout', hideTooltip, false);
			}	else if (tooltipLink.attachEvent) {
				tooltipLink.onmouseout = hideTooltip;
			}

//	Add keypress event listener to toggle tooltip from link element using keyboard
		addEventHandler(tooltipLink, 'keydown', returnKeyToggle);

//	Add tabindex attribute to link elements
		tooltipLink.setAttribute('tabindex', '0');

//	Grab title and tooltipOF-content attributes from link element
//	Create tooltip Div with classes for styling ('tooltipTitle' and 'tooltipContent')
		var tooltipText;
		var tooltipTitle = tooltipLink.getAttribute('tooltipOF-title');
		var tooltipContent = tooltipLink.getAttribute('tooltipOF-content');
		if (tooltipTitle === '' || tooltipTitle === null) {
			tooltipText = "<div class='tooltipContent'>" + tooltipContent + "</div>";
			} else {
				tooltipText = "<div class='tooltipTitle'>" + tooltipTitle + "</div><div class='tooltipContent'>" + tooltipContent + "</div>";
			}
		tooltipTarget.innerHTML = tooltipText;
	}
}	// end of addDiv function

//	Create a function to get coordinates of tooltip link and set coordinates of tooltip target
function setPosition(tooltipLink, tooltipTarget) {
	var tooltipLinkCoordinates = tooltipLink.getBoundingClientRect();
	var tooltipLinkLeft = tooltipLinkCoordinates.left;
	var tooltipLinkRight = tooltipLinkCoordinates.right;
	var tooltipLinkWidth = tooltipLinkRight - tooltipLinkLeft;
	var innerWidth = window.innerWidth || document.documentElement.clientWidth;
	var tooltipMargin = tooltipLinkWidth + (innerWidth - tooltipLinkRight);
	var tooltipTargetCoordinates = tooltipTarget.getBoundingClientRect();
	var tooltipTargetLeft;
	if (tooltipMargin < 320) {
		tooltipTarget.style.right = '1em';
		tooltipTarget.style.left = '';
		} else {
			tooltipTargetLeft = tooltipLinkLeft;
			tooltipTarget.style.right = '';
			tooltipTarget.style.left = tooltipTargetLeft + 'px';
		}
}

//	Create function that toggles tooltip when link element is clicked
//	This function can be targeted with CSS transitions using visibility and opacity
function toggleTooltip() {
	var id=this.id;
	var tooltipLink = document.getElementById(id);
	var tooltipTarget = document.getElementById(id+'_target');
	setPosition(tooltipLink, tooltipTarget);
	if (tooltipTarget.style.visibility == 'hidden' || tooltipTarget.style.visibility === '') {
		tooltipTarget.style.visibility = 'visible';
		tooltipTarget.style.opacity = 1;
		} else {
			tooltipTarget.style.opacity = 0;
			tooltipTarget.style.visibility = 'hidden';
		}
}

//	Create function that shows tooltip when link is hovered
function showTooltip() {
	var id=this.id;
	var tooltipLink = document.getElementById(id);
	var tooltipTarget = document.getElementById(id+'_target');
	setPosition(tooltipLink, tooltipTarget);
	tooltipTarget.style.visibility = 'visible';
	tooltipTarget.style.opacity = 1;
}

//	Create function that hides tooltip when hovering off link
function hideTooltip() {
	var id=this.id;
	var tooltipTarget = document.getElementById(id+'_target');
	tooltipTarget.style.opacity = 0;
	tooltipTarget.style.visibility = 'hidden';
}

//	Create function that hides tooltip when target element is clicked
function hideTooltipTarget() {
	var id=this.id;
	var tooltipLink = document.getElementById(id);
	tooltipLink.style.opacity = 0;
	tooltipLink.style.visibility = 'hidden';
}

//	Create function that toggles tooltip when return is pressed
//	Intentionally left spacebar out of this function because its default behavior
//	is to cause the page to jump to the bottom
function returnKeyToggle(e) {
	if (!e) {
		e = window.event;
	}
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) {
		id = document.activeElement.id;

		var tooltipLink = document.getElementById(id);
		var tooltipTarget = document.getElementById(id+'_target');
		setPosition(tooltipLink, tooltipTarget);

		if (tooltipTarget.style.visibility == 'hidden' || tooltipTarget.style.visibility === '') {
		tooltipTarget.style.visibility = 'visible';
		tooltipTarget.style.opacity = 1;
		} else {
			tooltipTarget.style.opacity = 0;
			tooltipTarget.style.visibility = 'hidden';
		}
	}
}

addDiv();
