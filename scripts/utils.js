const fs = require('fs-extra');
const path = require('path');


const recognizedParams = ['-scss', '-test', '-help'];

//Help command
function checkHelp(args){
    if(args.includes('-help')){
        console.log(`Use: rcg [params] ComponentName
    
        Params:
        -scss:  Change from css to scss for your component styles.
        -test:  Generate a unit test file along with the component.
        -help:  Show options and usage information.
        `);
        process.exit(1);
    }
}

//Check args
function checkArgs(args){
    if(args.length == 0){
        console.log(`I'm not a magician; I need you to give me instructions.`);
        process.exit(1);
    }
}

//Check params and Unrecognized params
function checkParams(args){

    if(args.some(arg => !recognizedParams.includes(arg) && arg.startsWith('-'))){
        console.error(`Error: Unrecognized parameter. Use 'rcg -help' for usage information.`);
        process.exit(1)
    }else{
        const options = {
            scss: args.includes('-scss'),
            test: args.includes('-test')
        }
        return options;
    }
    
}

//Save component/s name/S and check if user introduce a name
function saveComponentNames(args){
    const componentNames = args.filter(name => !name.startsWith('-') && !name.startsWith('*'));
    const checkComponentName = /^[a-zA-Z][a-zA-Z0-9]*$/;

    componentNames.forEach(name => {
        if(!checkComponentName.test(name)){
            console.log(`The name ${name} contains invalid characters. Please check it and try again`);
            process.exit(1);
        }
    })

    if(componentNames.length == 0){
        console.log(`Your component doesn't have a name??? How could you forget the name?`);
        process.exit(1)
    }else {
        return componentNames;
    }
}

//Check if we are in a react project
function isReactProject(){
    if(!fs.existsSync('./src') && fs.existsSync('./public') && fs.existsSync('./package.json')){
        console.log('You need to be inside your project...');
        process.exit(1);
    }
}

//Check directory or components by default
function checkDirectory(args){
    if(args.some(arg => arg.startsWith('*'))){
        const directoryNames = args.filter(name => name.startsWith('*'));

        if(directoryNames.length > 1){
            console.log('You can only choose one directory per command.');
            process.exit(1);
        }else{
            const directory = directoryNames[0].replace('*', '');
            return `./src/${directory}`;
        }
    }else{
        return './src/components';
    }
}

//Crate folders and files
function createFolderAndFiles(directory, componentNames, options, templates){

    if (!fs.existsSync(directory)) {
        fs.ensureDirSync(directory);
    }

    componentNames.forEach(componentName => {
        const componentDirectory = path.join(directory, componentName);
        const componentNameUpperCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        const relativeCssPath = options.scss ? `./${componentName}.scss` : `./${componentName}.css`;

        fs.ensureDirSync(componentDirectory);

        fs.writeFileSync(
            path.join(componentDirectory, `${componentName}.jsx`),
            templates.jsxTemplate.replace(/\${componentName}/g, componentNameUpperCase).replace(/\${relativeCssPath}/g, relativeCssPath).replace(/\${componentClass}/g, componentName.toLowerCase())
        );
    
        fs.writeFileSync(
            path.join(componentDirectory, `${componentName}${options.scss ? '.scss' : '.css'}`),
            templates.styleTemplate
        );
    
        if(options.test && templates.testTemplate){
            fs.writeFileSync(
                path.join(componentDirectory, `${componentName}-test.js`),
                templates.testTemplate.replace(/\${componentName}/g, componentNameUpperCase)
            );
        }

        console.log(`Component ${componentName} successfully created in ${componentDirectory}`);
    });
}

//Export functions
module.exports = {
    checkHelp,
    checkArgs,
    checkParams,
    saveComponentNames,
    isReactProject,
    checkDirectory,
    createFolderAndFiles
}