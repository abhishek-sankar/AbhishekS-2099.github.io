// GOAL: To imitate terminal to the fullest extent possible.

// TODO A wall of available commands.
// TODO Run it through Babel (for Mac Safari)!!
// TODO Maybe go into the mode of listening to ARROW_UP and ARROW_DOWN when the last result was a list (or a specific option from the available commands)
// TODO Scroll down to the input automatically.
// TODO If the quote is already being displayed, don't show it and choose a different one.
// TODO If possible make it so that available commands element is created right after the wrong command is entered.

$(document).ready(function() {

	let $terminal = $('#terminal');
	let historyDisplayedIndex = -1;
	let lastDisplayedIndex = -1;

	let termHistory = []; // work with this

	// Text Options
	let wakeUp = "Wake up, Neo...",
	knock = "Knock, knock, Neo...",
	about = 'My name is Abhishek Sankar, soon taking over the world.',
	writeCode = "I write code",
	learnMore = "Learn more",
	quote = "There is no spoon.",
	listCommands = 'I grant you these commands - [about] [bio] [contact] [skills] [social] [quote] [clear]',
	commandNotFound = 'Command not found. Don\'t worry, it\'s probably just a glitch in the Matrix. Gli Glitch in the Matrix trix.',
	skills = "Main: JavaScript, HTML5, CSS3, Java, C++, GIT and Github.\n Familiar with: Node.js, Python, MySQL",
	contact = "Feel free to contact me on abhishek.sankar.in@gmail.com. It can be for a project or a chit-chat about Life.";
	// let

	let arrowNavigationMode = false;

	let quotes = [
		"There is no spoon.",
		"Follow the white rabbit.",
		"Don't think you are, know you are.",
		"There's a difference between knowing the path and walking the path.",
		"Free your mind",
		"I can only show you the door. You're the one that has to walk through it.",
		"The time has come to make a choice.",
		"Choi: \"It just sounds to me like you need to unplug, man.",
		"You've been living in a dream world, Neo.",
		"What is \"real\"? How do you define \"real\"?",
		"Welcome to the real world.",
		"Because you have been down there Neo, you know that road, you know exactly where it ends. And I know that's not where you want to be.",
		"A déjà vu is usually a glitch in the Matrix. It happens when they change something.",
		"Do you believe that my being stronger or faster has anything to do with my muscles in this place? Do you think that's air you're breathing now?",
		"Neo: I know kung fu. \nMorpheus: [eyeing him, hand on chin] Show me.",
		"Trinity: Neo... nobody has ever done this before. \nNeo: That's why it's going to work.",
		"Neo: I thought it wasn't real. \nMorpheus: Your mind makes it real.",
		"The answer is out there, Neo, and it's looking for you, and it will find you if you want it to.",
		"So what do you need? Besides a miracle.",
		"I can only show you the door. You're the one that has to walk through it.",
		"Morpheus: [to Neo who is choosing the red pill] Remember... all I'm offering is the truth. Nothing more.",
		"It is not who you are underneath, but what you do that defines you.",
		"Is it just me or is it getting crazier out there?"
	];

	function getRandomQuote() {
		var randomIndex = Math.round(Math.random() * (quotes.length-1));
		console.log("Random index generated is " + randomIndex);
		return quotes[randomIndex];
	}

	let list = "Abhishek : Hello there! Welcome to the matrix. I see a curious soul. Type 'help' to uncover the secrets that lie within.";

	function generateContactHTML() {
		let contact = $('<ul id="abilities"></ul>');

		let codewars = $('<li></li>');
		let github = $('<li></li>'); // optimize this
		let linkedin = $('<li></li>');
		let instagram = $('<li></li>');


		let githubLink = $('<a>Github</a>').attr({
			'href': 'https://github.com/AbhishekS-2099/',
			'target': '_blank'
		});

		let instagramLink = $('<a>instagram</a>').attr({
			'href': 'https://www.instagram.com/not.your_average.geek/',
			'target': '_blank'
		});


		let linkedinLink = $('<a>LinkedIn</a>').attr({
			'href': 'www.linkedin.com/in/abhishek-sankar-in',
			'target': '_blank'
		})

		github.append(githubLink);
		linkedin.append(linkedinLink);
		instagram.append(instagramLink);


		console.log("$$$ Github element is currently: ");
		console.log(github);

		contact.append(github);
		contact.append(linkedin);
		contact.append(instagram);


		console.log("*** Working with the DOM: contactEl - ");
		console.log(contact);
		return contact;

		arrowNavigationMode = true; // change this back after a
	}



	function generateSkillHTML() {
		let skillsFullOne = $('<div id="skills"></div>');

		let skillsFull = $('<div id="skills"><p>> list skill</p><p>> where &lt;skill&gt; is one of:<skill><p class="subresult">HTML5, CSS3, ReactJS, D3, GIT and Github, </p></div><div id="familiar"><p>> list familiar area:</p><p>> where &lt;area&gt; is one of:</p><p class="subresult">Haxe, OpenFL, Python, THREE.js, Node.js</p></div>')
	}

	// <li><i class="fa fa-suitcase"></i> <a href="https://www.vretta.com/" target="_blank">work</a></li>


	let shortBio = 'Junior year at CET, majoring in Computer Science. Self-taught Android developer, always pumped about technology, and what a difference a few lines of code can bring to the world.';
	let typeSpeedSuperFast = 20;
	let typeSpeedSlow = 75
	let typeSpeedFast = 60; // in ms

	var autotype = function(el, text, i, interval) {
		// $(el).append("> ");
		if (i < text.length) {
			$(el).append(text[i++]);
			setTimeout(function () { autotype(el, text, i, interval); }, interval);
		}
		return $(el);
	};

	// IsAutotype is Bool
	// isHTML or not

	function clearTerminal() {
		$('.term-output').remove();
	}

	function addHTMLToTerminal(html) {
		let $el = $('<p class="term-output"></p>').append(html).appendTo($terminal);

		// $el.append(html);
	}

	function addToTerminal(text, speed, isAutotype) {
		let $el = $('<p class="term-output"></p>').text('> ').appendTo($terminal);

		if (isAutotype) {
			autotype($el, text, 0, speed);
		} else {
			$el.append(text);
		}

		return $el;
	}

	var handleInput = function() {
		let value = $('#term-prompt').val();

		console.log("***" + typeof value);

		switch (value.toLowerCase()) {
			case 'about':
				let aboutEl = addToTerminal(about, typeSpeedSlow, false);
				break;
			case 'bio':
				let bioEl = addToTerminal(shortBio, typeSpeedSuperFast, false);
				break;
			case 'clear':
				clearTerminal();
				let listEl = addToTerminal(list, typeSpeedSuperFast, false);
				break;
			case 'contact':
				let contactEl = addToTerminal(contact, typeSpeedFast, true);
				break;
			case "whois":
				// add a div that
				// have a function that creates and appends certan elements to the pages
				break;
			case "help":
				// alert("help is working!");
				let helpEl = addToTerminal(listCommands, typeSpeedFast, false);
				break;
			case "list":
				break;

			case 'skills':

				let skillsEl = addToTerminal(skills, typeSpeedFast, false);
				// generateSkillHTML();
				// $('#abilities').show();
				break;

			case 'social':
				// optimize this code and the code below - maybe in a function
				let socialHTML = generateContactHTML();
				let socialEl = addHTMLToTerminal(socialHTML);
				break;

			case 'portfolio':
				let portfolioHTML = generatePortfolioHTML();
				let portfolioEl = addHTMLToTerminal(portfolioHTML);
				break;

			case 'quote':

				let quoteEl = addToTerminal(getRandomQuote(), typeSpeedFast, false);
				break;

			case '':
				break;
			default:
				console.log("I don't understand, please choose between these options:");
				let commandNotFoundEl = addToTerminal(commandNotFound, typeSpeedSuperFast, true);
				let unknownEl = addToTerminal(listCommands, typeSpeedFast, false);
				
				setTimeout(function() {

				}, 4000);

		}
	}

	function createAndAutofillEl() {

	}

	function init() {

		// improve this code
		setTimeout(function() {
			let wakeupEl = addToTerminal(wakeUp, typeSpeedSlow, true);
		}, 200);

		setTimeout(function() {
			let listEl = addToTerminal(list, typeSpeedFast, true);
		}, 3500);

		setTimeout(function() {
			$('#term-prompt').html('&#9612;');
			$('#terminal-line').show();
			$('#term-prompt').focus();

		}, 6500);

		// make "I write code" to be text first, and then change it to link?

	}

	$('body').on('click', function() {
		$('#term-prompt').focus();
	});

	$('#term-prompt').on('click', function() {
		$('#term-prompt').focus();
	});

	$(".expand").on("click", function() {
		$(".learn").delay(100).hide();
		$("#short-bio").delay(200).show();

		autotype('#short-bio', shortBio, 0, typeSpeedSlow / 2);

		$("#online-presence").delay(300).show();
		$("#abilities").show();
	});

	$('#term-prompt').on("keydown", function(e) {
		console.log("The button you're currently pressing has a code of " + e.which);
		// preventDefault(); // ???
		// should there be a switch case here?
		let keyEnter = 13,
			keyArrowDown = 40, // check if it works for other machines
			keyArrowUp = 38;

		//
		if (e.which == keyEnter) {
			if ($('#term-prompt').val() != termHistory[termHistory.length-1]) {
				console.log('The input was different from the previous one.');
				handleInput(); //
			} else {
				console.log("This input is the same as previous - it shouldn't be added.");
			}


			// clear the input
			if ($('#term-prompt').val() !== "") {
				termHistory.push($('#term-prompt').val());
			}

			historyDisplayedIndex++;
			console.log("Now the terminal history is");
			console.log(termHistory);

			$('#term-prompt').val('');

		}

		// ARROW UP
		if (e.which == keyArrowUp) {
			console.log("Arrow Up is pressed");

			if (historyDisplayedIndex > 0) {
				historyDisplayedIndex--;
			}


			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
		}

		// ARROW DOWN
		if (e.which == keyArrowDown) {
			console.log("Arrow Down is pressed");
			if (historyDisplayedIndex < termHistory.length) {
				historyDisplayedIndex++;
			}

			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
		}

	})

	// $('#term-prompt').on("keypress", function(e))

	init();
});
