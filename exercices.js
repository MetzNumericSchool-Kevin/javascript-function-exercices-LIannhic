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

// étape 1 : Salutation Aventurier
/**
 * Retourne un message de salutation pour l'aventurier.
 * @param {string} unPrenom - Le nom du sorcier.
 * @returns {string} Message de bienvenue.
 */
function salutations(unPrenom) {
    // Interpolation du paramètre dans une chaîne de caractères.
    return `Salutations Aventurier ! Je me nomme ${unPrenom} pour vous servir.`;
};

// étape 2 : Quel est le tarif d'une potion ?
/**
 * Calcule le prix total pour l'achat d'une ou plusieurs potions.
 * @param {string} unNomPotion - L'identifiant de la potion souhaitée.
 * @param {Array<{id:string,prix:number,stock:number}>} unTableauDObjets - Le tableau contenant l'inventaire des potions.
 * @param {number} [uneQuantité=1] - La quantité de potions à acheter (par défaut, 1).
 * @returns {number|undefined} Le prix total de l'achat, ou `undefined` si la potion n'existe pas.
 */
function tarifAchatPotion(unNomPotion, unTableauDObjets, uneQuantité = 1) {
    // Parcourt chaque objet (potion) dans l'inventaire
    for (let objet of unTableauDObjets) {
        // Vérifie si l'identifiant de la potion correspond à celui recherché
        if (unNomPotion === objet.id) {
            // Calcule le prix total en multipliant le prix unitaire par la quantité demandée
            return objet.prix * uneQuantité;
        };
    };
    // Si la potion n'existe pas dans l'inventaire, la fonction retourne `undefined`
    return;
};

// étape 3 : Fabrication de potion
/**
 * Crée un objet représentant une potion avec son identifiant, son prix et son stock.
 * @param {string} unIdentifiantPotion - L'identifiant unique de la potion.
 * @param {number} unPrixPotion - Le prix de la potion en pièces d'or.
 * @param {number} unStockPotion - La quantité disponible en stock.
 * @returns {object<id:string,prix:number,stock:number} Un objet représentant la potion.
 */
function creationPotion(unIdentifiantPotion, unPrixPotion, unStockPotion) {
    return{
        id: unIdentifiantPotion,  // Identifiant unique de la potion
        prix: unPrixPotion,        // Prix de la potion en pièces de cuivre peut-être
        stock: unStockPotion       // Nombre d'unités fabriquées
    };
};

// étape 4 : Ajout de nouvelles potions dans l'inventaire
/**
 * Ajoute une potion à l'inventaire ou met à jour son stock et son prix si elle existe déjà.
 * Trie ensuite l'inventaire par prix décroissant.
 * @param {Array<{id:string,prix:number,stock:number}>} unTableauDObjets - Le tableau contenant les potions en stock.
 * @param {object} unePotion - L'objet représentant la potion à ajouter ou mettre à jour.
 * @returns {Array<{id:string,prix:number,stock:number}>} Le tableau d'inventaire trié par prix décroissant.
 */
function ajouterUnePotionInventaire(unTableauDObjets, unePotion) {
    // Parcourir l'inventaire,...
    for (let objet of unTableauDObjets) {
        // ...si les identifiants de la potion en paramètre et celui de l'itération sont identiques... 
        if (unePotion.id === objet.id) {
            // ...actualiser le prix de la potion
            objet.prix = unePotion.prix;
            // ...et augmenter le stock.
            objet.stock += unePotion.stock;
            // Retourner l'invetaire trié par ordre décroissant de prix.
            return unTableauDObjets.sort((potionA, potionB) => potionB.prix - potionA.prix);
        };
    };
    // Sinon ajouter à l'inventaire la potion,...
    unTableauDObjets.push(unePotion);
    // puis trier l'inventaire par ordre décroissant de prix.
    return unTableauDObjets.sort(function (potionA, potionB) {
        return potionB.prix - potionA.prix;
    }); 
};

// étape 5 : Cherche moi les potions qui...
/**
 * Récupère la liste des potions ayant un stock supérieur à 0.
 * Cette fonction filtre le tableau d'objets et retourne uniquement les potions en stock.
 * 
 * @param {Array<{id:string,prix:number,stock:number}>} unTableauDObjets - Le tableau d'objets représentant les potions.
 * Chaque objet doit avoir au moins une propriété `stock` qui est un nombre.
 * 
 * @returns {Array<{id:string,prix:number,stock:number}>} Un tableau d'objets représentant les potions en stock (stock > 0).
 */
function listePotionEnStock(unTableauDObjets) {
    return unTableauDObjets.filter((potion => potion.stock > 0)); // On filtre les potions où le stock est supérieur à 0 
};

/**
 * Récupère la liste des potions ayant un stock égal à 0.
 * Cette fonction filtre le tableau d'objets et retourne uniquement les potions en rupture de stock.
 * 
 * @param {Array<{id:string,prix:number,stock:number}>} unTableauDObjets - Le tableau d'objets représentant les potions.
 * Chaque objet doit avoir au moins une propriété `stock` qui est un nombre.
 * 
 * @returns {Array<{id:string,prix:number,stock:number}>} Un tableau d'objets représentant les potions avec un stock de 0.
 */
function listePotionsEnRupture(unTableauDObjets) {
    return unTableauDObjets.filter(function (potion) {
        return potion.stock === 0;  // On filtre les potions où le stock est égal à 0
    });
};

// étape 6 : Allons faire de la cueillette,..
/**Crée un objet représentant une potion avec son identifiant, son prix et son stock.
* @param {string} unIdentifiantPotion - L'identifiant unique de la potion.
* @param {string[]} uneListeIngredients - la liste des ingrédients.
* @param {number} unPrixPotion - Le prix de la potion en pièces d'or.
* @param {number} unStockPotion - La quantité disponible en stock.
* @returns {object<id:string,prix:number,stock:number>} Un objet représentant la potion ou un objet erreur.
*/
function creationPotionV2(unIdentifiantPotion, uneListeIngredients, unPrixPotion, unStockPotion) {
    // Parcourir l'itérable manuel_de_fabricaton avec la boucle forin 
    for (let recette in manuel_de_fabrication) {
        // Si la liste d'ingrédients en paramètre est identique aux ingrédiants d'une potion du manuel de fabrication,... 
        if (JSON.stringify(manuel_de_fabrication[recette].ingredients) === JSON.stringify(uneListeIngredients)) {
            // ...retourner une potion avec...
            return {
                id: unIdentifiantPotion, // ...un identifiant,
                prix: unPrixPotion, // ...un prix,
                stock: unStockPotion // ...un nombre d'unité fabriqué.
            };
        }
    }
    // Retourne une erreur.
    return new Error('Il manque des ingrédients à cette potion'); // Si aucune correspondance trouvée
}

// étape 7 : Une potion n'est jamais fabriquée en retard...
/**
 * Crée une potion si la recette correspond aux ingrédients fournis.
 * @param {string} unIdentifiantPotion - L'identifiant de la potion.
 * @param {Array<string>} uneListeIngredients - La liste des ingrédients de la potion.
 * @param {function} fonctionCallBack - La fonction de rappel à exécuter une fois la potion prête.
 * @param {number} unPrixPotion - Le prix de la potion.
 * @param {number} unStockPotion - Le nombre d'unités de potion à créer.
 * @returns {Error|undefined} - Retourne une erreur si la recette est invalide, sinon undefined.
 */
function creationPotionV3(unIdentifiantPotion, uneListeIngredients, uneFonctionCallBack, unPrixPotion, unStockPotion) {
    // Rechercher la recette dans le manuel de fabrication
    for (let recette in manuel_de_fabrication) {
        let potion = manuel_de_fabrication[recette];
        // Vérifier si les ingrédients correspondent
        if (JSON.stringify(potion.ingredients) === JSON.stringify(uneListeIngredients)) {
            // Lancer la préparation de la potion (avec un délai).
            setTimeout(() => {
                // Crée l'objet potion pour...
                let unePotion = {
                    id: unIdentifiantPotion,
                    prix: unPrixPotion,
                    stock: unStockPotion
                };
                // ...le mettre en paramètre dans la fonction callback (laPotionEstFinie) 
                uneFonctionCallBack(unePotion);
            // multiplie par 1000 le temps de fabrication de la poton dans le manuel de fabrication. 
            }, manuel_de_fabrication[unIdentifiantPotion].temps_de_fabrication * 1000);
            return; // Sortir de la fonction si la potion est trouvée et en préparation
        }
    }
    // Retourner une erreur si aucune recette correspondante n'est trouvée
    return new Error('Recette de potion non trouvée');
}
/**
 * Fonction de rappel appelée lorsque la potion est prête.
 * @param {Objet<{id:string, prix:number, stock:number}>} unePotion - La potion créée.
 */
function laPotionEstFinie(unePotion) {
    console.log("Fabrication de potion finie :", unePotion);
    ajouterUnePotionInventaire(inventaire, unePotion);
}

// étape 8 : Épreuve ultime,...
function creationInventaire() {
    let inventaireEchope = [];
    return {
        /**
         * Ajoute une potion à l'inventaire.
         * @param {Object<{id:string,prix:number,stock:number}>} potion - L'objet représentant une potion avec son identifiant, son prix et sa quantité.
         * @returns {Array<{id:string,prix:number,stock:number}>} L'inventaire actualisé.
         */
        ajoutPotion: function (potion) {
            // Vérifier si la potion existe déjà dans l'inventaire
            for (let objet of inventaireEchope) {
                if (potion.id === objet.id) {
                    objet.prix = potion.prix; // Mise à jour du prix
                    objet.stock += potion.stock; // Augmentation du stock
                    return inventaireEchope;
                }
            }
            // Ajouter la nouvelle potion si elle n'existe pas encore
            inventaireEchope.push(potion);
            return inventaireEchope;
        },
        /**
         * Récupère la liste des potions en stock (> 0).
         * @returns {Array<{id:string,prix:number,stock:number}>} Liste des potions disponibles.
         */
        lesPotionsEnStock: function () {
            return inventaireEchope.filter((potion) => potion.stock > 0);
        },
        /**
         * Récupère la liste des potions en rupture de stock (= 0).
         * @returns {Array<{id:string,prix:number,stock:number}>} Liste des potions en rupture.
         */
        lesPotionsEnRuptureDeStock: function () {
            return inventaireEchope.filter((potion) => potion.stock === 0);
        },
        /**
         * Retourne l'inventaire complet.
         * @returns {Array<{id:string,prix:number,stock:number}>} L'inventaire actuel.
         */
        voirInventaire: function () {
            return inventaireEchope;
        },
    };
}




// Ici, exécution du programme.

// étape 1 : Salutation Aventurier
console.log("Message d'accueil :");
console.log(salutations(nom_sorcier));

// étape 2 : Quel est le tarif d'une potion ?
console.log("le prix est de :");
console.log(tarifAchatPotion('potion_soin', inventaire, 3)); // test avec tous les paramètres entrés
console.log("le prix est de :");
console.log(tarifAchatPotion('potion_soin', inventaire)); // test avec tous les paramètres obligatoires entrés
console.log("le prix est de :");
console.log(tarifAchatPotion('potion_stamina', inventaire)); // test avec une potion n'existante pas dans l'inventaire

// étape 3 : Fabrication de potion
console.log("potions fabriquées :");
console.table(creationPotion('potion_soin', 8, 5)); // test potion de soin moins chère
console.log("potions fabriquées :");
console.table(creationPotion('potion_mana', 3, 19)); // test nouvelle potion
console.log("potions fabriquées :");
console.table(creationPotion('potion_soin', 12, 2)); // test potion de soin plus chère

// étape 4 : Ajout de nouvelles potions dans l'inventaire
console.table(inventaire); // affichage de l'inventaire
console.table(ajouterUnePotionInventaire(inventaire, creationPotion('potion_mana', 20, 5))); // test nouvelle potion plus chère
console.table(ajouterUnePotionInventaire(inventaire, creationPotion('potion_soin', 30, 10))); // test actualisation prix et stock potion existante

// étape 5 : Cherche moi les potions qui...
console.table(ajouterUnePotionInventaire(inventaire, creationPotion('potion_soin', 25, -10))); // test rupture de potion de soin
console.table(listePotionEnStock(inventaire)); // test liste des potions en stock
console.table(listePotionsEnRupture(inventaire)); // test liste des potions en rupture

// étape 6 : Allons faire de la cueillette,..
console.table(creationPotionV2("potion_soin", ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"], 10, 5)) // tous les ingrédiants
console.table(creationPotionV2("potion_soin", ["eau_de_source", "ecaille_de_dragon"], 10, 5)) // un ingrédiant manquant
console.error(creationPotionV2("potion_soin", ["eau_de_source", "ecaille_de_dragon"], 10, 5).message) // 

// étape 7 : Une potion n'est jamais fabriquée en retard...
console.table(inventaire)
console.log(creationPotionV3('potion_soin', ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"], laPotionEstFinie, 10, 5))
console.table(inventaire)
const erreurDeFabrication = creationPotionV3('potion_soin', ["eau_de_source", "poudre_de_diamant"], laPotionEstFinie, 10, 5)
if (erreurDeFabrication instanceof Error) console.error(erreurDeFabrication.message);
setTimeout(() => {
    console.table(inventaire)
}, 3000
);

// Étape 8 : Épreuve ultime...
const inventaireBoutiquePotionsA = creationInventaire();
console.log(inventaireBoutiquePotionsA);
const inventaireBoutiquePotionsB = creationInventaire();
console.log(inventaireBoutiquePotionsB);
// Création de potions uniques pour chaque inventaire
const potionA1 = { id: 'potion_soin', prix: 10, stock: 5 };
const potionA2 = { id: 'potion_soin', prix: 15, stock: 5 };
const potionA3 = { id: 'potion_stamina', prix: 10, stock: 0 };
const potionB1 = { id: 'potion_soin', prix: 10, stock: 5 };
const potionB2 = { id: 'potion_soin', prix: 15, stock: 5 };
const potionB3 = { id: 'potion_mana', prix: 10, stock: 5 };
const potionB4 = { id: 'potion_stamina', prix: 10, stock: 0 };
// Ajout de potions spécifiques à chaque inventaire
inventaireBoutiquePotionsA.ajoutPotion(potionA1);
inventaireBoutiquePotionsA.ajoutPotion(potionA2);
inventaireBoutiquePotionsA.ajoutPotion(potionA3);
console.table(inventaireBoutiquePotionsA.voirInventaire());
inventaireBoutiquePotionsB.ajoutPotion(potionB1);
inventaireBoutiquePotionsB.ajoutPotion(potionB2);
inventaireBoutiquePotionsB.ajoutPotion(potionB3);
inventaireBoutiquePotionsB.ajoutPotion(potionB4);
console.table(inventaireBoutiquePotionsB.voirInventaire());
// Affichage des inventaires
console.log("Inventaire A :");
console.table(inventaireBoutiquePotionsA.lesPotionsEnStock());
console.table(inventaireBoutiquePotionsA.lesPotionsEnRuptureDeStock());
console.log("Inventaire B :");
console.table(inventaireBoutiquePotionsB.lesPotionsEnStock());
console.table(inventaireBoutiquePotionsB.lesPotionsEnRuptureDeStock());
