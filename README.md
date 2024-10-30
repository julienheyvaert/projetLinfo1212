# projetLinfo1212

Ceci est le projet du cours LINFO1212 - Projet d'approfondissement en sciences informatiques.  
Ce projet consiste à concevoir des maquettes de pages pour un site web de consultation et d'ajout d'incidents (avec connexion utilisateur).

## Projet préparatoire LINFO1212, PP_V1_A12

- **Groupe** : A12  
- **Membres** : Heyvaert Julien, Ntaganda Keilan  
- **Date** : 30/09/2024  

## Structure du projet

### static
Dossier comprenants les dossier css et js (code statique), et les images.
### views
Dossier comprenants les vues (pages du site en .ejs (rendu html pour express, dynamique))
(homepage.ejs, la page d'accueil "principale", 
login.ejs, la page d'identification,
incident.ejs, la page de signalement d'incident)

### racine
app.js (fichier js principal pour initialiser le site et le lancer)

## Comment lancer le site ?

0. installer les dépendances (node_modules) avec npm install
1. Se rendre à la racine du projet et executer : node .\app.js  