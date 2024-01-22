# React Component Generator (RCG)

RCG is a command-line utility for quickly generating React components with associated CSS files. It streamlines the process of component creation within a React project.

## Installation

Ensure you have Node.js installed, and then run the following command to install RCG globally:

```bash
npm install -g rcg-mc
```

## Usage

Navigate to the root of your React project and use the following syntax to create a new component:
```bash
rcg [options] componentName1 componentName2 ... componentNameN [*directoryName]
```
##### [Options]
- -scss: Change from CSS to SCSS for your component styles.
- -test: Generate a unit test file along with the component.
- -help: Show options and usage information.

> Please note that if you create multiple components and add parameters such as -scss, all the components will be affected by this parameter.

##### [ComponentName]
The component name cannot contain special characters or spaces, and it must start with a letter. It will automatically capitalize the first letter of the component name, following React convention.

##### [DirectoryName]
To specify the directory name, use `*` followed by the directory name.
If not specified, components will be created in the "components" directory.

By default, without any specified options, RCG will create components without test files and with CSS styles. Inside each component directory, two files will be created: ComponentName.jsx and ComponentName.css.

The order in which you write the commands will not affect functionality.


## Example

```bash
rcg button
```
This will generate the following files:

```bash
/src
  /components
    /button
      - button.jsx
      - button.css
```
## Example 2

```bash
rcg home about *pages
```
This will generate the following files:

```bash
/src
  /pages
    /home
      - home.jsx
      - home.css
    /about
      - about.jsx
      - about.css
```

## Example 3

```bash
rcg -scss -test Button
```
This will generate the following files:

```bash
/src
  /components
    /Button
      - Button.jsx
      - Button.scss
      - button-test.js
```