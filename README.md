# APIRest_E_Learning

## Description

APIRest_E_Learning est une API permettant de gérer des cours en ligne.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir [Node.js](https://nodejs.org) installé.
3. Installez les dépendances en exécutant la commande suivante :
   npm install

## Configuration

1. Créez un fichier `.env` à la racine du projet.
2. Ajoutez les variables d'environnement requises dans le fichier `.env`, par exemple :
   PORT=3000

## Utilisation

- Pour démarrer le serveur, exécutez la commande :
  npm start
- L'API sera accessible à l'adresse `http://localhost:3000`.

## Routes

Voici la liste des routes disponibles :

### GET /courses

- `/cours/uploads` : POST - Ajouter un nouveau cours.
- `/cours/uploads/id` : PATCH - Modifer un nouveau cours.-
- `/cours/uploads/id` : GET - Lire un nouveau cours.
- `/cours/uploads/id` : DELETE - Supprimer un nouveau cours.

### GET /TD

- `/td/uploads` : POST - Ajouter un nouveau td.
- `/td/uploads/id` : PATCH - Modifer un nouveau td.-
- `/td/id` : GET - Lire un nouveau td.
- `/td/uploads/id` : DELETE - Supprimer un nouveau td.
- `/uploads/correction/:id` : POST - Ajouter une correction pour un td.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à proposer une pull request.

## Auteur

[Mahrez Touzi] - [mahreztouzi@gmail.com]
