// Ici, déclarer les variables et les constantes.

const nom_sorcier = "Archibald 🧙‍♂️";
const manuel_de_fabrication = {
    potion_soin: {
        ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
        temps_de_fabrication: 3, // exprimé en secondes
    },
};
const inventaire = [
    {
        id: "potion_soin", // identifiant unique de la potion
        prix: 10,
        stock: 0,
    },
];

// Ici, définir les fonctions.
// celles de collecte

// celles de traitement
function strSalutations(nom_sorcier){
    return "Salutations Aventurier ! Je me nomme " + nom_sorcier +" pour vous servir"
}
// celles d'affichage
function salutations(strSalutations){
    console.log(strSalutations)
}