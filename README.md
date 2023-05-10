# Airport Information App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Prerequisites

Before running this application, ensure that you have the following installed:

- Node.js
- Angular CLI

You will need an rapidAPI key to pull the data from API. Replace the below code in the `airport-service.ts` file.
- `private readonly rapidapiKey ='ENTER-YOUR-RAPID-API-KEY-HERE';`

You will need an googleMapsAPI key to pull the data from API. Replace the below code in the `index.ts` file.
- `<script src="https://maps.googleapis.com/maps/api/js?key=ENTER-YOUR-GOOGLE_MAPS-API-KEY-HERE"></script>`

## Installation

Clone the repository to your local machine: `git clone https://github.com/markmcnulty/SITA-Angular-Challenge.git`

## Development server

To run the application, do the following steps in a terminal:

1. `cd airport-information-app`
2. `npm i` to create a node modules folder.
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
