//Constructeur pour les cartes
function creerCarte(manga) {
    $("#mangas").append(`
    <div class="card" style="width: 18rem;">
        <img src="${manga.cover}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${manga.titre}</h5>
            <div class="card-text">
                <p>Quantity : ${manga.quantity}</p>
                <p>ID : ${manga.id}</p>
            </div>
            <input type="button" onclick="supprimer(${manga.id})" class="btn btn-danger mb-3" value="Supprimer">
            <a href="ModifierMangaFormPage.html" onclick="storeMangaId(${manga.id})" class="btn btn-info">Modifier</a>
        </div>
    </div>`);
}

// Function to store the manga ID in local storage
function storeMangaId(id) {
    localStorage.setItem("mangaId", id);
}

function affichertout() {
    $("#mangas").text("")
    fetch('https://6581a35b3dfdd1b11c43cd8c.mockapi.io/manga/')
        .then(function (reponse) {
            //Un problème s'est produit
            if(!reponse.ok){
                //lancer une expedition (pas de distinction de syntaxe entre exception et erreur)
                throw new Error ("Erreur "+reponse.status);
            }
            return reponse.json();
        })
        .then(function (mangas) {
            mangas.forEach(function (manga) {
                creerCarte(manga)
            });
            creerBoxAjout();
        })
        //attraper et gerer
        .catch(function (erreur) {
            $('.alert').text(erreur.message).removeClass('d-none');
        });
}

function creerBoxAjout() {
    $("#mangas").append(`
    <div class="card" style="width: 18rem;">
        <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title mb-4" style="margin-top: 100px">Add Manga</h5>
            <a href="addMangaFormPage.html" class="btn btn-success mx-auto mb-4">Ajouter</a>
            <a href="Index.html" class="btn btn-primary mx-auto">Acceuil</a> 
        </div>
    </div>`);
}

affichertout();

function supprimer(id) {
    fetch('https://6581a35b3dfdd1b11c43cd8c.mockapi.io/manga/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error ("Erreur "+res.status);
    }).then(manga => {
        affichertout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}
