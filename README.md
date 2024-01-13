# React Component Generator (RCG)

RCG is a command-line utility for quickly generating React components with associated CSS files. It streamlines the process of component creation within a React project.

## Installation

Ensure you have Node.js installed, and then run the following command to install CRC globally:

```bash
npm install -g rcg-mc
```

## Usage

Navigate to the root of your React project and use the following command to create a new component:
```bash
rcg [options] componentName
```
##### options
- -scss: Change from CSS to SCSS for your component styles.
- -test: Generate a unit test file along with the component.
- -help: Show options and usage information.

By default, without any specified options, RCG will create the component without a test file and with CSS styles.

This will create a "components" directory if it doesn't exist, and inside it, a directory named after your component. Inside that directory, two files will be created: componentName.jsx and componentName.css.

## Example

```bash
rcg Button
```
This will generate the following files:

```bash
/src
  /components
    /Button
      - Button.jsx
      - Button.css
```

## Example 2

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
