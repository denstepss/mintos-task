#### PHP task for MINTOS
Project build on Symfony 4.4 
# Getting started

## Requirements

    PHP ^7.1.3

## Environment variables

- `.env` - Environment variables can be set in this file

## Installation

Install all the dependencies using composer

    composer install


Database create

    php bin/console doctrine:database:create

Run the database migrations (**Set the database connection in .env before migrating**)

    php bin/console doctrine:migrations:migrate

Installing Encore in Symfony Applications (**First, make sure you install Node.js and also the Yarn package manager.**)
    
    yarn install
   
Generate build assets for frontend( **public/build** by default)
    
    yarn encore prod


