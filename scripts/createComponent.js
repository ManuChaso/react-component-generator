#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const args = process.argv.slice(2);

const recognizedParams = ['-scss', '-test', '-help'];

if(args.some(arg => !recognizedParams.includes(arg) && args.indexOf(arg) != args.length -1)){
    console.error(`Error: Unrecognized parameter. Use 'rcg -help' for usage information.`);
    process.exit(1)
}


const options = {
    scss: args.includes('-scss'),
    test: args.includes('-test')
}

if(args.includes('-help')){
    console.log(`Use: rcg [params] ComponentName
    
    Params:
    -scss:  Change from css to scss for your component styles.
    -test:  Generate a unit test file along with the component.
    -help:  Show options and usage information.
    `);
    process.exit(1);
}

const componentName = args[args.length - 1];

if(!componentName || componentName.startsWith('-')){
    console.log("Your component doesn't have a name??? How could you forget the name?");
    process.exit(1)
}

const relativeStylesPath = options.scss ? `./${componentName}.scss` : `./${componentName}.css`;
const relativeComponentClass = `${componentName.toLowerCase()}`;

const componentsDirectory = './src/components';
const componentDirectory = path.join(componentsDirectory, componentName);


const isReactProject = fs.existsSync('./src') && fs.existsSync('./public') && fs.existsSync('./package.json');

if (!isReactProject) {
    console.error('You need to be inside your project...');
    process.exit(1);
}

if (!fs.existsSync(componentsDirectory)) {
    fs.ensureDirSync(componentsDirectory);
}

fs.ensureDirSync(componentDirectory);

const jsxTemplatePath = path.join(__dirname, '../templates/component.jsx');
const styleTemplatePath = options.scss ? path.join(__dirname, '../templates/component.scss') : path.join(__dirname, '../templates/component.css');
const testTemplatePath = options.test ? path.join(__dirname, '../templates/componentTest.js') : false;

const jsxTemplate = fs.readFileSync(jsxTemplatePath, 'utf-8');
const styleTemplate = fs.readFileSync(styleTemplatePath, 'utf-8');
const testTemplate = testTemplatePath ? fs.readFileSync(testTemplatePath, 'utf-8') : false;

if (typeof jsxTemplate === 'string' && typeof styleTemplate === 'string') {
    fs.writeFileSync(
        path.join(componentDirectory, `${componentName}.jsx`),
        jsxTemplate.replace(/\${componentName}/g, componentName).replace(/\${relativeCssPath}/g, relativeStylesPath).replace(/\${componentClass}/g, relativeComponentClass)
    );

    fs.writeFileSync(
        path.join(componentDirectory, `${componentName}${options.scss ? '.scss' : '.css'}`),
        styleTemplate
    );

    if(options.test && testTemplate){
        fs.writeFileSync(
            path.join(componentDirectory, `${componentName}-test.js`),
            testTemplate.replace(/\${componentName}/g, componentName)
        );
    }

    console.log(`Component ${componentName} successfully created in ${componentDirectory}`);

} else {
    console.error('Error: The content of the templates is not a string.');
    process.exit(1);
}