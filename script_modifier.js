// Retrieve the stored manga ID from local storage
let storedMangaId = localStorage.getItem("mangaId");

function autofill() {
    // Check if the ID is present in local storage
    if (storedMangaId) {
        fetch(`https://6581a35b3dfdd1b11c43cd8c.mockapi.io/manga/${storedMangaId}`)
            .then(response => response.json())
            .then(mangaDetails => {
                // Populate the form fields with the manga details
                $("#title1").val(mangaDetails.titre);
                $("#cover1").val(mangaDetails.cover);
                $("#quantity1").val(mangaDetails.quantity);
            })
            .catch(error => {
                $('.alert').text(error.message).removeClass('d-none');
            });
    }
}

autofill()

// Valider le titre
let titreError1 = true;
$("#check-titre1").hide();
$("#title1").keyup(function () {
    validateTitre1();
})

function validateTitre1() {
    let titreValue1 = $("#title1").val();
    if (titreValue1.length === 0) {
        $("#check-titre1").show().html("Entrez un titre")
        titreError1 = false;
        return false;
    } else if (titreValue1.length < 5 || titreValue1.length > 20) {
        $("#check-titre1").show().html("Doit être comprise entre 5 et 20 caractères")
        titreError1 = false;
        return false;
    } else {
        $("#check-titre1").hide();
        titreError1 = true;
    }
}

//Constructeur d'objet
function Manga(titre = "", cover = "", quantity = 0) {
    this.titre = titre
    this.cover = cover
    this.quantity = quantity
}

function modifier() {
    event.preventDefault();
    validateTitre1();
    if (titreError1 === true) {
        const manga = new Manga($("#title1").val(), $("#cover1").val(), $("#quantity1").val())

        fetch('https://6581a35b3dfdd1b11c43cd8c.mockapi.io/manga/'+storedMangaId, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            // Envoyer les donnees JSON
            body: JSON.stringify(manga)
        }).then(res => {
            if (res.ok) {
                // Create a success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = 'Manga successfully modified!';

                // Append the success message to the main container
                $('.container').append(successMessage);

                // Remove the success message after a delay (e.g., 3 seconds)
                setTimeout(() => {
                    $(successMessage).remove();
                }, 3000);

                return res.json();
            }
            throw new Error ("Erreur "+res.status);
        }).then(task => {
            // Clear the stored ID from local storage after using it
            localStorage.removeItem("mangaId");
        }).catch(error => {
            $('.alert').text(error.message).removeClass('d-none');
        })
    }
}


