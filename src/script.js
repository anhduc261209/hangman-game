// Prepare alphabet buttons
let alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet.toUpperCase();
let alparr = alphabet.split("");
console.log(alparr);

for (let a = 0; a < alparr.length; a++) {
    const alpha_butt = document.getElementById("alpha-butt");
    alpha_butt.innerHTML += `<button id=${alparr[a]} class="btn btn-success"/>${alparr[a]}</button>&nbsp;`;
}
// Init all variables
let lives = 9;
let right = new Audio();
let wrong = new Audio();
right.src = "audio/haoHan.mp3";
wrong.src = "audio/doAnHai.mp3";
//Display lives
document.getElementById("lives").innerText = lives;

//categories and hints
const words = [["everton", "liverpool", "swansea", "chelsea", "hull", "manchestercity", "newcastleunited"],
["alien", "dirtyharry", "gladiator", "findingnemo", "jaws"],
["manchester", "milan", "madrid", "amsterdam", "prague"]];

const hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
];

// Generate random word from the list
function generate() {
    i = Math.floor(Math.random() * 3);
    if (i == 0) {
        category = "Premier League Football Teams";
        j = Math.floor(Math.random() * 7);
        chosenword = words[i][j];
        clue = hints[i][j];
        return [chosenword, category, clue];
    } else if (i == 1) {
        category = "Films";
        j = Math.floor(Math.random() * 5);
        chosenword = words[i][j];
        clue = hints[i][j];
        return [chosenword, category, clue];
    } else {
        category = "Cities";
        j = Math.floor(Math.random() * 5);
        chosenword = words[i][j];
        clue = hints[i][j];
        return [chosenword, category, clue];
    }
}

// Prepare
function prepare() {
    word = generate()[0];
    console.log(word);
    wordarr = word.split("");
    category = generate()[1];
    clue = generate()[2];
    // For loop to write those underscores
    for (let i = 0; i < word.length; i++) {
        document.getElementById("wordarea").innerHTML += `<span id="char-${i}">_</span>&nbsp;`;
    }
    // Write category
    document.getElementById("category").innerText = "The category is " + category;
    // If user clicks on the hint button, we will show the hint
    document.getElementById("hint-butt").addEventListener("click", function() {
        document.getElementById("clue").innerText = "The clue is " + clue; 
    });
    // Add listener for alphabet buttons
    for (let a = 0; a < alparr.length; a++) {
        document.getElementById(alparr[a]).addEventListener("click", function() {
            let done = false;
            for (let i = 0; i < word.length; i++) {
                // Check if already has char
                if (document.getElementById("char-" + i).innerText == "_") {
                    // Check if match
                    if (document.getElementById(alparr[a]).innerText == wordarr[i]) {
                        document.getElementById("char-" + i).innerText = wordarr[i];
                        done = true;
                        // Play haohan audio (right)
                        right.play();
                    }
                }
            }
            // Check if false
            if (done == false) {
                lives--;
                document.getElementById("lives").innerText = lives;
                displayHangman(9 - lives);
                // Play doanhai audio (wrong)
                wrong.play();
            }
        });
    }
    // Display lives and hangman 
    document.getElementById("lives").innerText = lives;
    displayHangman(9 - lives);
    // Check if won
    n = 0;
    for (let i = 0; i < wordarr.length; i++) {
        if (document.getElementById("char-" + i).innerText !== "_") {
            n++;
        } 
    }
    if (n == wordarr.length) {
        for (let a = 0; a < alparr.length; a++) {
            document.getElementById(alparr).disabled = true;
        }
    }
}
// Display hangman
function displayHangman(noofpicture) {
    if (checkLose() == false) {
        img = `<img src="images/${noofpicture}.png">`;
        document.getElementById("hangman-img").innerHTML = img;
        document.getElementById("lives").innerText = lives;
    }
}
// Check if lose
function checkLose() {
    if (lives == 0) {
        for (let a = 0; a < alparr.length; a++) {
            document.getElementById(alparr).disabled = true;
        }
        return true;
    } else {
        return false;
    }
}
// Reset game
function resetGame() {
    // Reste game just means reload the page
    location.reload();
}
// Call the prepare function
prepare();
