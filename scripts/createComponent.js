#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const { checkHelp, checkArgs, checkParams, saveComponentNames, isReactProject, checkDirectory, createFolderAndFiles } = require('./utils.js');

const args = process.argv.slice(2);

checkHelp(args);
isReactProject();
checkArgs(args);

const options = checkParams(args);
const componentNames = saveComponentNames(args);
const directory = checkDirectory(args);

const jsxTemplatePath = path.join(__dirname, '../templates/component.jsx');
const styleTemplatePath = options.scss ? path.join(__dirname, '../templates/component.scss') : path.join(__dirname, '../templates/component.css');
const testTemplatePath = options.test ? path.join(__dirname, '../templates/componentTest.js') : false;

const templates = {
    jsxTemplate: fs.readFileSync(jsxTemplatePath, 'utf-8'),
    styleTemplate: fs.readFileSync(styleTemplatePath, 'utf-8'),
    testTemplate:  testTemplatePath ? fs.readFileSync(testTemplatePath, 'utf-8') : false
}

createFolderAndFiles(directory, componentNames, options, templates);