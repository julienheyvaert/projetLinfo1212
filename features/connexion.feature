Fonctionnalité: Connexion au site

Le site web est lié à une base de donnée pour les utilisateur.

Scenario: Création d'un nouveau compte
Etant donnée que l'utilisateur veut se connecter
Et qu'il n'a pas de compte
Lorsqu'il va sur la page de connexion
Et qu'il complète la section "Nouveau compte"
Alors le site crée un nouveau compte et se connecte à celui-ci

Scenario: Connexion avec un compte existant
Etant donné que l'utilisateur veut se connecter
Et qu'il a un compte existant
Lorsqu'il va sur la page de connexion
Et qu'il complète la section "Compte existant"
Alors la page se connecte à son compte