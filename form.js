"use strict";

// Fonction pour valider le champ de mot de passe en temps réel
function validatePasswordField() {
    const myInput = document.querySelector('#psw');
    const letter = document.querySelector('#letter');
    const capital = document.querySelector('#capital');
    const number = document.querySelector('#number');
    const special = document.querySelector('#special');
    const length = document.querySelector('#length');
    const confirmPasswordInput = document.querySelector('#confirmPsw');
    const controlConfirmPassword = document.querySelector('#controlConfirmPsw');
    const submitButton = document.querySelector("input[type='submit']");

    function updateValidation(element, isValid) {
        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }
    }

    function validatePassword() {
        const password = myInput.value;

        // Valider les lettres minuscules
        const lowercaseRegex = /[a-z]/g;
        updateValidation(letter, password.match(lowercaseRegex));

        // Valider les lettres majuscules
        const uppercaseRegex = /[A-Z]/g;
        updateValidation(capital, password.match(uppercaseRegex));

        // Valider les chiffres
        const numberRegex = /[0-9]/g;
        updateValidation(number, password.match(numberRegex));

        // Valider les caractères spéciaux
        const specialRegex = /[!#$%^&*()+/]/g;
        updateValidation(special, password.match(specialRegex));

        // Valider la longueur
        updateValidation(length, password.length >= 8);

        // Valider la confirmation du mot de passe
        const passwordsMatch = confirmPasswordInput.value === password;
        updateValidation(controlConfirmPassword, passwordsMatch);

        // Activer ou désactiver le bouton Soumettre
        submitButton.disabled = !passwordsMatch;

        // Ajouter ou supprimer la classe 'validButton' en fonction de la validité du mot de passe
        if (!submitButton.disabled) {
            submitButton.classList.add('validButton');
        } else {
            submitButton.classList.remove('validButton');
        }
    }

    myInput.addEventListener('keyup', validatePassword);
    confirmPasswordInput.addEventListener('keyup', validatePassword);
}

// Éviter la soumission du formulaire par défaut
function preventFormSubmission() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

// Fonction pour valider le formulaire
function attachFormListeners() {
    validatePasswordField();
    preventFormSubmission();
}

window.addEventListener('load', () => {
    attachFormListeners();
});
