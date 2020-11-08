
/*
The following is the original toggleBlock function. It works smoothly but each node within the
expanding sections is invisible but still takes up space and creates excess white space below the footer
Remove the following style from the css file:

.block > * {
	display: none;
}

function toggleBlock() {
	var block = document.getElementById(this.id + 'Block');
	var click = document.getElementById(this.id + 'Click');
	if (block.style.maxHeight === '' || block.style.maxHeight == '0px') {
		block.style.maxHeight = '90em';
		click.innerHTML = 'click to collapse';
		click.style.backgroundImage = "url('up-arrow.png')";
	} else {
		block.style.maxHeight = '0px';
		click.innerHTML = 'click to expand';
		click.style.backgroundImage = "url('down-arrow.png')";
	}
}
*/
/*
The following toggleBlock function hides the display of every node within the
expanding sections so there is no invisible overflow
Need the following style in the css file:

.block > * {
	display: none;
}
*/

function toggleBlock() {
	var block = document.getElementById(this.id + 'Block');
	var click = document.getElementById(this.id + 'Click');
	var blockChildren = block.children;
	if (block.style.maxHeight === '' || block.style.maxHeight == '0px') {
		block.style.maxHeight = '90em';
		for (var i=0; i<blockChildren.length; i+=1) {
			if (blockChildren[i].nodeName == 'TABLE') {
				blockChildren[i].style.display = 'table';
				} else {
					blockChildren[i].style.display = 'block';
			}
		}
		click.innerHTML = 'click to collapse';
		click.style.backgroundImage = "url('up-arrow.png')";
	} else {
		block.style.maxHeight = '0px';
		for (var j=0; j<blockChildren.length; j+=1) {
			blockChildren[j].style.display = 'none';
		}
		click.innerHTML = 'click to expand';
		click.style.backgroundImage = "url('down-arrow.png')";
	}
}


function showOutput() {
// Assign HTML element IDs
	var admission = document.getElementById('admission');
	var allALF = document.getElementById('allALF');
	var diagnosis = document.getElementById('diagnosis');
	var apap = document.getElementById('apap');
	var encephalopathy = document.getElementById('encephalopathy');
	var nac = document.getElementById('nac');
	var abrupt = document.getElementById('abrupt');
	var headCT = document.getElementById('headCT');
	var sodium = document.getElementById('sodium');
	var hypertonic = document.getElementById('hypertonic');
	var intubated = document.getElementById('intubated');
	var agitated = document.getElementById('agitated');
	var sedating = document.getElementById('sedating');
	var propofol = document.getElementById('propofol');
	var hypothermia = document.getElementById('hypothermia');
	var warm = document.getElementById('warm');
	var mannitol = document.getElementById('mannitol');
	var icp = document.getElementById('icp');
	var intubate = document.getElementById('intubate');
	var hyperventilating = document.getElementById('hyperventilating');
	var ventilation = document.getElementById('ventilation');
	var progression = document.getElementById('progression');
	var sirs = document.getElementById('sirs');
	var deterioration = document.getElementById('deterioration');
	var listed = document.getElementById('listed');
	var antibiotics = document.getElementById('antibiotics');
	var hypotension = document.getElementById('hypotension');
	var vasopressors = document.getElementById('vasopressors');
	var hydrocortisone = document.getElementById('hydrocortisone');
	var oliguria = document.getElementById('oliguria');
	var creatinine = document.getElementById('creatinine');
	var ammonia = document.getElementById('ammonia');
	var volume = document.getElementById('volume');
	var ich = document.getElementById('ich');
	var crrt = document.getElementById('crrt');
	var renal = document.getElementById('renal');
	var bleeding = document.getElementById('bleeding');
	var coagulopathy = document.getElementById('coagulopathy');
	var thrombocytopenia = document.getElementById('thrombocytopenia');
	var inr = document.getElementById('inr');
	var procedure = document.getElementById('procedure');
	var consult = document.getElementById('consult');
	var evaluation = document.getElementById('evaluation');
	var listing = document.getElementById('listing');
	var form = document.getElementById('form');
	var output = document.getElementById('output');
	var innerContainer = document.getElementById('innerContainer');

//	Display admission recommendations only when 'day of admission' is selected	
	if (admission.checked) {
		allALF.innerHTML = "The following should be done in all cases of ALF: <span id='allALFClick' class='click'></span>";
		diagnosis.style.display = 'block';
		} else {
			allALF.innerHTML = "Confirm the following are done (for all cases of ALF):<span id='allALFClick' class='click'></span>";
			diagnosis.style.display = 'none';
	}

//	Display NAC recommendation only if APAP OD is selected or HE grade III/IV is not selected
	if (apap.checked || !encephalopathy.checked) {
		nac.style.display = 'list-item';
		} else {
			nac.style.display = 'none';
	}

//	Head CT recommendation
	if (abrupt.checked) {
		headCT.style.display = 'list-item';
		} else {
			headCT.style.display = 'none';
	}

//	Hypertonic Na recommendation
	if (sodium.checked) {
		hypertonic.style.display = 'list-item';
		} else {
			hypertonic.style.display = 'none';
	}

//	Sedation recommendation (if not intubated, agitated or pain)
	if (intubated.checked || agitated.checked) {
		sedating.style.display = 'none';
		propofol.style.display = 'list-item';
		} else {
			sedating.style.display = 'list-item';
			propofol.style.display = 'none';
	}

//	Do not warm recommendation
	if (hypothermia.checked) {
		warm.style.display = 'list-item';
		} else {
			warm.style.display = 'none';
	}

//	Recommendations for grade III/IV HE
	if (encephalopathy.checked && intubated.checked) {
		mannitol.style.display = 'list-item';
		icp.style.display = 'list-item';
		intubate.style.display = 'none';
		} else if (encephalopathy.checked && !intubated.checked) {
			mannitol.style.display = 'list-item';
			icp.style.display = 'list-item';
			intubate.style.display = 'list-item';
		} else {
			mannitol.style.display = 'none';
			icp.style.display = 'none';
			intubate.style.display = 'none';
	}

//	Do not correct hyperventilation recommendation
	if (intubated.checked && hyperventilating.checked) {
		ventilation.style.display = 'list-item';
		} else {
			ventilation.style.display = 'none';
	}

//	Antibiotics recommendation
	if (encephalopathy.checked || progression.checked || sirs.checked || deterioration.checked || listed.checked) {
		antibiotics.style.display = 'list-item';
		} else {
			antibiotics.style.display = 'none';
	}

//	Vasopressors recommendation
	if (encephalopathy.checked && hypotension.checked) {
		vasopressors.style.display = 'list-item';
		hydrocortisone.style.display = 'list-item';
		} else {
			vasopressors.style.display = 'none';
			hydrocortisone.style.display = 'none';
	}

//	CRRT recommendation
	if (oliguria.checked || creatinine.checked || ammonia.checked || volume.checked || ich.checked) {
		crrt.style.display = 'list-item';
		renal.style.display = 'none';
		} else {
			crrt.style.display = 'none';
			renal.style.display = 'list-item';
	}

//	Blood products recommendation
	if (bleeding.checked) {
		coagulopathy.style.display = 'list-item';
		thrombocytopenia.style.display = 'none';
		inr.style.display = 'none';
		} else if (procedure.checked) {
			coagulopathy.style.display = 'none';
			thrombocytopenia.style.display = 'list-item';
			inr.style.display = 'none';
		} else {
			coagulopathy.style.display = 'none';
			thrombocytopenia.style.display = 'none';
			inr.style.display = 'list-item';
	}

//	Display recommendation for listing only if patient not already listed
	if (listed.checked) {
		consult.style.display = 'none';
		evaluation.style.display = 'none';
		listing.style.display = 'none';
		} else {
			consult.style.display = 'list-item';
			evaluation.style.display = 'list-item';
			listing.style.display = 'list-item';
	}

//	Add 'click to expand' text and icon to output display
	var expandCollapseArray = document.querySelectorAll('.click');
	for (var i = 0; i < expandCollapseArray.length; i+=1) {
		var expandCollapse = document.getElementById(expandCollapseArray[i].id);
		if (expandCollapse.innerHTML == 'click to expand' || expandCollapse.innerHTML === '') {
			expandCollapse.innerHTML = 'click to expand';
		} else {
			expandCollapse.innerHTML = 'click to collapse';
		}
	}

//	Hide form and show output
		form.style.display = 'none';
		output.style.display = 'block';
		if (window.innerWidth < 480) {
			innerContainer.scrollIntoView();
			} else {
				window.scrollTo(0, 0);
		}
} // End of showOutput function

function resetForm() {
	var admission = document.getElementById('admission');
	var inputs = document.getElementsByTagName('input');
	var innerContainer = document.getElementById('innerContainer');
	for (i=0; i<inputs.length; i+=1) {
		if (inputs[i].type == 'checkbox') {
			inputs[i].checked = false;
		}
	}
	admission.checked = 'checked';

	if (window.innerWidth < 480) {
		innerContainer.scrollIntoView();
		} else {
			window.scrollTo(0, 0);
	}
	clearProgress();
	document.getElementById('screenTextarea').value = '';
}

function returnToForm() {
	var form = document.getElementById('form');
	var output = document.getElementById('output');
	var innerContainer = document.getElementById('innerContainer');
	form.style.display = 'block';
	output.style.display = 'none';
	if (window.innerWidth < 480) {
		innerContainer.scrollIntoView();
		} else {
			window.scrollTo(0, 0);
	}
}

//	Create a function to control the progress bar
function progressMeter() {
	var numerator = 0;
	var progress = document.getElementById('progress');
	var percentText = document.getElementById('percentText');
	var percentBar = document.getElementById('percentBar');
	var progressArray = document.querySelectorAll('.progress');
	for (var i = 0; i < progressArray.length; i+=1) {
		if (progressArray[i].checked) {
			numerator +=1;
		}
	}

	var percentage = Math.round(numerator/progressArray.length*100);
	progress.style.width = percentage+'%';
	percentText.innerHTML = numerator + ' of ' + progressArray.length;
	percentBar.innerHTML = percentage+'%';
	if (percentage == 100) {
		percentText.style.color = 'black';
		percentBar.style.color = 'white';
		progress.style.background = 'rgb(14,111,137)';
		} else {
			percentText.style.color = 'rgb(182,27,40)';
			percentBar.style.color = 'rgb(182,27,40)';
			progress.style.background = 'rgb(65,177,194)';
		}
}

// Create a function to reset the progress bar
function clearProgress() {
	var progressArray = document.querySelectorAll('.progress');
		for (var i = 0; i < progressArray.length; i+=1) {
		progressArray[i].checked = false;
	}
	progressMeter();
}

//	Add event listeners to buttons

//	Create a function to deal with IE8 attachEvent (as long as 'this' is not needed)
function addEventHandler(elem, eventType, handler) {
	if (elem.addEventListener) {
		elem.addEventListener (eventType, handler, false);
		} else if (elem.attachEvent) {
			elem.attachEvent ('on' + eventType, handler);
	}
}

function printOutput() {
	var screenTextarea = document.getElementById('screenTextarea').value;
	var printTextarea = document.getElementById('printTextarea');
	screenTextarea = screenTextarea.replace(/\n/g, '<br>');
	printTextarea.innerHTML = '<p><b>Notes:</b><br>' + screenTextarea + '</p>';
	window.print();
}

function addEvents() {
	var submitButton = document.getElementById('submitButton');
	var resetButton = document.getElementById('resetButton');
	var printButton = document.getElementById('printButton');
	var returnButton = document.getElementById('returnButton');
	var allALF = document.getElementById('allALF');
	var diagnosticStudies = document.getElementById('diagnosticStudies');
	var diagnosticTests = document.getElementById('diagnosticTests');
	var specificTherapies = document.getElementById('specificTherapies');
	var specificPatient = document.getElementById('specificPatient');
	var clearButton = document.getElementById('clearButton');

	addEventHandler(submitButton, 'click', showOutput);
	addEventHandler(resetButton, 'click', resetForm);
	addEventHandler(printButton, 'click', printOutput);
	addEventHandler(returnButton, 'click', returnToForm);
	addEventHandler(clearButton, 'click', clearProgress);

//	Add event listeners for toggleBlock function
	if (allALF.addEventListener) {
		allALF.addEventListener('click', toggleBlock, false);
		}	else if (allALF.attachEvent) {
			allALF.onclick = toggleBlock;
	}

	if (diagnosticStudies.addEventListener) {
		diagnosticStudies.addEventListener('click', toggleBlock, false);
		}	else if (diagnosticStudies.attachEvent) {
			diagnosticStudies.onclick = toggleBlock;
	}

	if (diagnosticTests.addEventListener) {
		diagnosticTests.addEventListener('click', toggleBlock, false);
		}	else if (diagnosticTests.attachEvent) {
			diagnosticTests.onclick = toggleBlock;
	}

	if (specificTherapies.addEventListener) {
		specificTherapies.addEventListener('click', toggleBlock, false);
		}	else if (specificTherapies.attachEvent) {
			specificTherapies.onclick = toggleBlock;
	}

	if (specificPatient.addEventListener) {
		specificPatient.addEventListener('click', toggleBlock, false);
		}	else if (specificPatient.attachEvent) {
			specificPatient.onclick = toggleBlock;
	}
}

// Add event listeners for progressMeter function
var progressArray = document.querySelectorAll('.progress');
	for (var i = 0; i < progressArray.length; i+=1) {
		if (progressArray[i].addEventListener) {
			progressArray[i].addEventListener('click', progressMeter, false);
			} else if (progressArray[i].attachEvent) {
				progressArray[i].onclick = progressMeter;
		}
	}

addEvents();
clearProgress();