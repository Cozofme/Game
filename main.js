function generateLink() {
    const statements = document.getElementById('statements').value.split('\n');
    const truthIndex = parseInt(document.getElementById('truthIndex').value) - 1;

    if (statements.length < 4 || truthIndex < 0 || truthIndex > 3) {
        alert("Please enter four statements and specify the correct index (1-4).");
        return;
    }

    const encodedStatements = encodeURIComponent(JSON.stringify(statements));
    const shareLink = `${window.location.href}?statements=${encodedStatements}&truthIndex=${truthIndex}`;
    
    document.getElementById('shareLink').innerHTML = `Share this link with your partner: <br> <a href="${shareLink}">${shareLink}</a>`;
}

function loadGameFromLink() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('statements') && urlParams.has('truthIndex')) {
        const statements = JSON.parse(decodeURIComponent(urlParams.get('statements')));
        const truthIndex = parseInt(urlParams.get('truthIndex'));

        document.getElementById('creation-section').style.display = 'none';
        document.getElementById('answer-section').style.display = 'block';

        const statementsList = document.getElementById('statementsList');
        statements.forEach((statement, index) => {
            const btn = document.createElement('button');
            btn.innerText = statement;
            btn.onclick = () => checkAnswer(index, truthIndex);
            statementsList.appendChild(btn);
        });
    }
}

function checkAnswer(selectedIndex, truthIndex) {
    const message = document.getElementById('message');
    if (selectedIndex === truthIndex) {
        message.textContent = "Correct! ❤️ You guessed the truth!";
    } else {
        message.textContent = "Incorrect! 💔 Try again!";
    }
}

function createOwn() {
    window.location.href = window.location.origin + window.location.pathname;
}

window.onload = loadGameFromLink;