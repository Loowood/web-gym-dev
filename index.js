// Ici on a une sorte de base de données simulée. Voici la réponse que pourrai renvoyer le serveur (c'est au format JSON).
let notesServeur = ''

// Quand la page a chargé, on lance l'initialisation du tableau des scores
window.onload = initialisationTableau

function initialisationTableau() {
	notesServeur = '{ "notes": [{"score": 9.1, "equipe": "Lorem Ipsum, Dolor Sit", "club": "Amet"},{"score": 8.1, "equipe": "Lorem Ipsum, Dolor Sit", "club": "Amet"},{"score": 7.1, "equipe": "Lorem Ipsum, Dolor Sit", "club": "Amet"},{"score": 6.1, "equipe": "Lorem Ipsum, Dolor Sit", "club": "Amet"}]}'
	refresh()
	// Méthode pour lancer le rafraîchissement toute les X secondes
	// Tu peux décommenter les lignes (enlever les slashs "/") pour que ça fonctionne
	// let X = 2;
	// setInterval(refresh, X * 1000)
}

function remplaceVirgules(participants) {
	return participants.replaceAll(",", "</br>")  // Remplacer les virgules par des <br> pour que ça s'affiche un poil mieux
}

function refresh() {
	// On fait comme si on envoyait une requête au serveur
	console.log("Requête envoyée")
	console.log("Réponse reçue")
	const reponseServeur = notesServeur
	const data = JSON.parse(reponseServeur)
	
	const tableau = document.getElementById("tableau")
	tableau.innerHTML = "<tr><th> Place </th><th> Score </th><th> Noms </th><th> Club </th></tr>" // On réintialise le tableau
	// On trie en fonction des notes pour avoir un classement
	notes = data.notes.sort( (a, b) => b.score - a.score )
	// On ajoute ensuite dynamiquement les scores triés au tableau
	for (let i = 0; i < notes.length; i ++){
		let ligne = tableau.insertRow(tableau.length)
		let cellulePlace = ligne.insertCell(0)
		let celluleScore = ligne.insertCell(1)
		let celluleNoms = ligne.insertCell(2)
		let celluleClub = ligne.insertCell(3)
		
		// Place
		cellulePlace.innerHTML = ligne.rowIndex // Fait dynamiquement, c'est juste le numéro de la ligne au final
		// Score
		celluleScore.innerHTML = notes[i].score
		// Noms des participants
		celluleNoms.innerHTML = remplaceVirgules(notes[i].equipe)
		// Club
		celluleClub.innerHTML = notes[i].club
	}
}

function passageGym() {
	// On fait comme si des données avaient été rentrées sur la base de données du serveur.
	const scoreGym = (Math.random() * 10).toPrecision(2) // On simule un score aléatoire avec une précision de 1 chiffre après la virgule.
	console.log("Une équipe est passée ! -> " + scoreGym)
	let notesAChanger = JSON.parse(notesServeur)
	notesAChanger.notes.push({"score": scoreGym, "equipe": "Nouvelle équipe !", "club": "St-André"})
	console.log(notesAChanger)
	notesServeur = JSON.stringify(notesAChanger)
}
