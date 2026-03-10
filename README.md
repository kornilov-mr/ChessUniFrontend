# Chess Uni Frontend

## Description
The project is a frontend part for chess, which was script from the backend part for an internship project.
The project is created using React and vite bandle.

Consists of:
* Logic for the game of chess inside the *src/board* folder
* 56 tests for the game logic, including unit tests and integration tests, to verify different game positions and moves
* UI components for the playing board (taken from my previous project)

UI Components are located in the *src/UI/board* folder. 

The project is using the scss as well as css modules for styling, and more interesting case study on how they relate to the elements


## How to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## How scss and css get compiled

First the scss and css files are given. They need to be compiled to css. files, which would be used in the browser.

Steps:
* Scss files are compiled to css files using the scss compiler (because scss isn't supported in the browser and is just a language to generate the css files with better development experience)
* Then the css files are processed by the PostCSS (which is resposible for optimization, compatibility with different browsers, Autoprefixes, etc.)
* css files are bundled into one css file using the css-loader (In the case of this project, the vite css-loader is used to bundle the css files into one file)

That creates one css file used by the browser, as well as css maps, which are used to keep track of the original scss files and the line numbers.

## How to get the final css file and the css map

It's in the root folder of the project:
* [OutputCss.css](OutputCss.css)
* [OutputCssMap.css.map](OutputCssMap.css.map)

Or you could generate the new one by 
running the build command, and find the css file in the build folder *build/static/css*.

Also, scss can be transformed to css by running the command:
### `npx sass src/UI/board/BoardStyling.scss src/UI/board/BoardStyling.css`



