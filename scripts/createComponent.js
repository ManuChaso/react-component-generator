#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const componentName = process.argv[2];
const relativeCssPath = `./${componentName}.css`;
const relativaComponentClass = `${componentName.toLowerCase()}`

if (!componentName) {
    console.error("Your component doesn't have a name??? How could you forget the name?");
    process.exit(1);
}

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
const cssTemplatePath = path.join(__dirname, '../templates/component.css');

const jsxTemplate = fs.readFileSync(jsxTemplatePath, 'utf-8');
const cssTemplate = fs.readFileSync(cssTemplatePath, 'utf-8');


if (typeof jsxTemplate === 'string' && typeof cssTemplate === 'string') {
    fs.writeFileSync(
        path.join(componentDirectory, `${componentName}.jsx`),
        jsxTemplate.replace(/\${componentName}/g, componentName).replace(/\${relativeCssPath}/g, relativeCssPath).replace(/\${componentClass}/g, relativaComponentClass)
    );

    fs.writeFileSync(
        path.join(componentDirectory, `${componentName}.css`),
        cssTemplate
    );

    console.log(`Component ${componentName} successfully created in ${componentDirectory}`);

} else {
    console.error('Error: The content of the templates is not a string.');
    process.exit(1);
}

