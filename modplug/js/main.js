document.querySelector('#compose').addEventListener('click', compose)

let allNotes = []
const noteRegex = /^[A-G][-#]\d/i
let numLines = 16
let compOut = "rando"

function rando () {
	// Take in the notes and store them in an array
	let theNotes = document.querySelector('#theNotes').value
	theNotes.toString()
	allNotes = theNotes.split(',')
	for (let i = 0; i < allNotes.length; i++) {
		if (noteRegex.test(allNotes[i]) == false) {
			document.querySelector('#displayNotes').innerText = 'Your notes must be formatted with the note and octave like this: C-4 or C#4. There must also be commas and no spaces after each note'
			allNotes = theNotes.toString().split(',').filter(noteRegex.test)
			return
		} else {
			document.querySelector('#displayNotes').innerText = ' '
		}
	}

	allNotes.push('...', '...', '...')
	console.log(allNotes)

	//Compose
	function compRand(numLines) {
		document.querySelector('#displayNotes').innerText = ` `
		document.querySelector('#displayNotes').innerText = `ModPlug Tracker  XM\n`
		for (i = 1; i <= numLines; i++) {
			document.querySelector('#displayNotes').innerText += `|${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n`
		}
	}
	compRand(numLines)
}

function eigths() {
	// Take in the notes and store them in an array
	let theNotes = document.querySelector('#theNotes').value
	theNotes.toString()
	allNotes = theNotes.split(',')
	for (let i = 0; i < allNotes.length; i++) {
		if (noteRegex.test(allNotes[i]) == false) {
			document.querySelector('#displayNotes').innerText = 'Your notes must be formatted with the note and octave like this: C-4 or C#4. There must also be commas and no spaces after each note'
			allNotes = theNotes.toString().split(',').filter(noteRegex.test)
			return
		} else {
			document.querySelector('#displayNotes').innerText = ' '
		}
	}
	allNotes.push('...')
	console.log(allNotes)

	//Compose
	function compEigths(numLines) {
		document.querySelector('#displayNotes').innerText = ` `
		document.querySelector('#displayNotes').innerText = `ModPlug Tracker  XM\n`
		for (i = 1; i <= numLines - (numLines / 2); i++) {
			document.querySelector('#displayNotes').innerText += `|${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n`
		}
	}
	compEigths (numLines)
}

function edm () {
		// Take in the notes and store them in an array
		let theNotes = document.querySelector('#theNotes').value
		theNotes.toString()
		allNotes = theNotes.split(',')
		for (let i = 0; i < allNotes.length; i++) {
			if (noteRegex.test(allNotes[i]) == false) {
				document.querySelector('#displayNotes').innerText = 'Your notes must be formatted with the note and octave like this: C-4 or C#4. There must also be commas and no spaces after each note'
				allNotes = theNotes.toString().split(',').filter(noteRegex.test)
				return
			} else {
				document.querySelector('#displayNotes').innerText = ' '
			}
		}
		console.log(allNotes)
	
		//Compose
		function compEDM(numLines) {
			document.querySelector('#displayNotes').innerText = ` `
			document.querySelector('#displayNotes').innerText = `ModPlug Tracker  XM\n`
			for (i = 1; i <= numLines; i++) {
				document.querySelector('#displayNotes').innerText += `|${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n|...........\n`
			}
		}
		compEDM (numLines)
			console.log('Rows do not matter here')
}

function breaks (numLines) {
	// Declare break slice sample root notes and then screw and chop
	allNotes = ['C-4','C#4','D-4','D#4']
	document.querySelector('#displayNotes').innerText = ` `
	document.querySelector('#displayNotes').innerText = `ModPlug Tracker  XM\n||${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n|...........\n|...........\n||${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n|...........\n|...........\n||${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n|...........\n|...........\n||${allNotes[Math.floor(Math.random() * allNotes.length)]}01......\n|...........\n|...........\n|...........\n`
}

// Actual composition happens here
function compose () {
	compOut = document.querySelector('#presets');
    preset = compOut.value;
	console.log(preset)
	if (preset === "rando") {
		numLines = document.getElementById("rows").value;
		rando ()
	} else if (preset === "eigths") {
		numLines = document.getElementById("rows").value;
		eigths ()
	} else if (preset === "edm") {
		numLines = document.getElementById("rows").value;
		edm ()
	} else if (preset === "breaks") {
		numLines = document.getElementById("rows").value;
		breaks (numLines)
	}
}