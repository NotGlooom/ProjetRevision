// Valider le titre
let titreError = true;
$("#check-titre").hide();
$("#title").keyup(function () {
    validateTitre();
})

function validateTitre() {
    let titreValue = $("#title").val();
    if (titreValue.length === 0) {
        $("#check-titre").show().html("Entrez un titre")
        titreError = false;
        return false;
    } else if (titreValue.length < 5 || titreValue.length > 20) {
        $("#check-titre").show().html("Doit être comprise entre 5 et 20 caractères")
        titreError = false;
        return false;
    } else {
        $("#check-titre").hide();
        titreError = true;
    }
}

//Constructeur d'objet
function Manga(titre = "", cover = "", quantity = 0) {
    this.titre = titre
    this.cover = cover
    this.quantity = quantity
}


function ajouter() {
    event.preventDefault();
    console.log("Function activated")
    validateTitre();
    if (titreError === true) {
        const manga = new Manga($("#title").val(), $("#cover").val(), $("#quantity").val())

        fetch('https://6581a35b3dfdd1b11c43cd8c.mockapi.io/manga/', {
            method: 'POST',
            headers: {'content-type':'application/json'},
            // Envoyer les donnees JSON
            body: JSON.stringify(manga)
        }).then(res => {
            if (res.ok) {
                // Create a success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = 'Manga added successfully!';

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
            $("#title").val("")
            $("#cover").val("")
            $("#quantity").val("")
        }).catch(error => {
            $('.alert').text(error.message).removeClass('d-none');
        })
    }
}

















