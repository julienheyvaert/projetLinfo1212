# projetLinfo1212

Ceci est le projet du cours LINFO1212 - Projet d'approfondissement en sciences informatiques.  
Ce projet consiste à concevoir des maquettes de pages pour un site web de consultation et d'ajout d'incidents (avec connexion utilisateur).

## Projet préparatoire LINFO1212, PP_V1_A12

- **Groupe** : A12  
- **Membres** : Heyvaert Julien, Ntaganda Keilan, Mohamed El Yattouti

## Structure du projet

### static
Dossier comprenants les dossier css et js (code statique), et les images.
### views
Dossier comprenants les vues (pages du site en .ejs (rendu html pour express, dynamique))
(homepage.ejs, la page d'accueil "principale", 
login.ejs, la page d'identification,
incident.ejs, la page de signalement d'incident)

### racine
app.js (fichier js principal pour configurer le site et le lancer)

## Comment lancer le site ?

0. installer les dépendances (node_modules) avec npm install
(modules a installer : express, ejs, body-parser, express-session, mongodb)
1. Si premier lancement du site, initialiser les dossier cert.perm et key perm,
(executer openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365)
2. Se rendre à la racine du projet et executer : node app.js
3. sur un naviguateur aller a  http://localhost:8080/
