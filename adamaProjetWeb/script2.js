var tabNumeros = ["776667771", "7755554322", "771456760", "773674433", "778835566"];
var tabSoldes = [13600000, 9000000, 244000, 600000, 20000000];
var tabCodes = ["1122", "2233", "3344", "4455", "5566"];
var tabNumeroDeCompteur = ["0000001", "0000002", "0000003", "0000004", "0000005"];

var données_langue = {};

$(document).ready(function () {
  var langue = document.getElementById("langue");

  langue.addEventListener("change", changementDeLangue);

  function changementDeLangue(event) {
    var langue = event.target.value;
    chargerLesDonnées(langue);
  }
});

function chargerLesDonnées(nomDuFichier) {
  $.get(nomDuFichier, (données, succés) => {
    var variables = données.split(";");
    for (let i = 0; i < variables.length; i++) {
      var variable = variables[i];
      var tabCleValeur = variable.split("=");
      var nomDeLaVriable = tabCleValeur[0].trim();
      var valeurDeLaVariable = tabCleValeur[1].trim();
      données_langue[nomDeLaVriable] = valeurDeLaVariable;
    }
  });
}

chargerLesDonnées("donnees_fr.txt");

function menu() {
  var rep = window.prompt(données_langue.MENU_PRINCIPAL);
  return rep;
}

function revenirAuMenu() {
  var choix = window.prompt(données_langue.RETOURNER_AU_MENU_PRINCIPAL);
  switch (choix) {
    case "1":
      main();
      break;
    case "0":
      alert(données_langue.AU_REVOIR);
      break;
    default:
      break;
  }
}

function afficheSolde(num) {
  var indice = tabNumeros.indexOf(num);
  var code = window.prompt(données_langue.DEMANDER_CODE);
  while (!(code == tabCodes[indice])) {
    if (code === null) break;
    alert(données_langue.CODE_INCORRECT);
    code = window.prompt(données_langue.DEMANDER_CODE);
  }
  if (!(code === null)) {
    alert(données_langue.VOTRE_SOLDE_EST + " " + tabSoldes[indice] + "cfa");
  }
}

function transfereSolde(num) {
  var indice1 = tabNumeros.indexOf(num);
  if (indice1 != -1) {
    var numeroDestinataire = window.prompt(données_langue.NUMERO_DESTINATAIRE);
    var indice2 = tabNumeros.indexOf(numeroDestinataire);
    while (indice2 == -1) {
      if (numeroDestinataire === null) break;
      alert(données_langue.NUMERO_EXISTE_PAS);
      numeroDestinataire = window.prompt(données_langue.NUMERO_DESTINATAIRE);
      indice2 = tabNumeros.indexOf(numeroDestinataire);
    }
    if (numeroDestinataire !== null) {
      var montant = window.prompt(données_langue.MONTANT_TRANSFERE) * 1;
      while (montant < 0 || `${montant}` === "NaN") {
        if (montant === null) break;
        montant = parseInt(window.prompt(données_langue.MONTANT_TRANSFERE));
      }
      if (montant !== null && montant !== 0) {
        var code = window.prompt(données_langue.DEMANDER_CODE);
        while (code !== tabCodes[indice1]) {
          if (code === null) break;
          alert(données_langue.CODE_INCORRECT);
          code = window.prompt(données_langue.DEMANDER_CODE);
        }
        if (code !== null) {
          if (tabSoldes[indice1] - montant < 0) {
            alert(données_langue.SOLDE_INSUFISANT);
          } else {
            tabSoldes[indice1] -= montant;
            tabSoldes[indice2] += montant;
            alert(`${données_langue.TRANSFERE_REUSSIE} ${tabSoldes[indice1]}cfa`);
          }
        }
      }
    }
  } else {
    alert(données_langue.NUMERO_EXISTE_PAS);
  }
}

function paymentFacture(num) {
  var indice1 = tabNumeros.indexOf(num);
  if (indice1 != -1) {
    var rep = window.prompt(données_langue.MENU_FACTURES);
    switch (rep) {
      case "1":
        senelec(indice1);
        break;
    }
  } else {
    alert(données_langue.NUMERO_EXISTE_PAS);
  }
}

function senelec(indice) {
  var numeroConteur = window.prompt(données_langue.DEMANDER_NUMERO_COMPTEUR);
  var indexNumeroConteur = tabNumeroDeCompteur.indexOf(numeroConteur);
  while (indexNumeroConteur == -1) {
    if (numeroConteur === null) break;
    alert(données_langue.NUMERO_EXISTE_PAS);
    numeroConteur = window.prompt(données_langue.DEMANDER_NUMERO_COMPTEUR);
    indexNumeroConteur = tabNumeroDeCompteur.indexOf(numeroConteur);
  }
  if (numeroConteur !== null) {
    var code = window.prompt(données_langue.DEMANDER_CODE);
    while (tabCodes[indice] !== code) {
      if (code === null) break;
      alert(données_langue.CODE_INCORRECT);
      code = window.prompt(données_langue.CODE_INCORRECT);
    }
    if (code !== null) {
      var motantDeLaFacture = Math.floor(Math.random() * 50000);
      tabSoldes[indice] -= motantDeLaFacture;
      alert(`${données_langue.PAIEMENT_REUSSI} ${motantDeLaFacture}cfa`);
    }
  }
}

function options(num) {
  var rep = window.prompt(données_langue.MENU_OPTIONS);
  switch (rep) {
    case "1":
      changerDeCode(num);
      break;
  }
}

function changerDeCode(num) {
  var code = window.prompt(données_langue.DEMANDER_ACNCIEN_CODE);
  var index = tabNumeros.indexOf(num);
  var ancienCode = tabCodes[index];
  while (ancienCode !== code) {
    if (code === null) break;
    alert(données_langue.CODE_INCORRECT);
    code = window.prompt(données_langue.DEMANDER_ACNCIEN_CODE);
  }
  if (code !== null) {
    var nouveauCode = window.prompt(données_langue.DEMANDER_NOUVEAU_CODE) * 1;
    while (nouveauCode < 0 || nouveauCode > 9999 || `${nouveauCode}` === "NaN") {
      if (nouveauCode === null) break;
      alert(données_langue.CODE_INVALID);
      nouveauCode = window.prompt(données_langue.DEMANDER_NOUVEAU_CODE) * 1;
    }
    if (nouveauCode !== null && nouveauCode !== 0) {
      if (nouveauCode < 9) {
        nouveauCode = "000" + nouveauCode;
      }
      tabCodes[index] = `${nouveauCode}`;
      alert(`${données_langue.VOTRE_NOUVEAU_CODE} ${nouveauCode}`);
    }
  }
}

function main() {
  var rep = menu();
  var numCourant = document.getElementById("num").value;
  switch (rep) {
    case "1":
      afficheSolde(numCourant);
      revenirAuMenu();
      break;
    case "2":
      transfereSolde(numCourant);
      revenirAuMenu();
      break;
    case "3":
      paymentFacture(numCourant);
      revenirAuMenu();
      break;
    case "4":
      options(numCourant);
      revenirAuMenu();
      break;
    default:
      if (rep !== null) main();
      break;
  }
}
