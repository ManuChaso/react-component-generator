# React Component Generator (RCG)

RCG is a command-line utility for quickly generating React components with associated CSS files. It streamlines the process of component creation within a React project.

## Installation

Ensure you have Node.js installed, and then run the following command to install CRC globally:

```bash
npm install -g react-component-generator
```

## Usage

```bash
rcg componentName
```
This will create a "components" directory if it doesn't exist, and inside it, a directory named after your component. Inside that directory, two files will be created: componentName.jsx and componentName.css.

## Example

```bash
rcg Button
```
This will generate the following files:

```css
/src
  /components
    /Button
      - Button.jsx
      - Button.css
```

