//@ts-check
const { copyFileSync } = require('fs');
const { join } = require('path');


const projectOnePath = join(process.cwd(), 'build', 'dev', 'graph.js');

const destinationProjectOne = join(process.cwd(), '../build', 'dev', 'graph.js');

function copyFile(source, destination) {
    copyFileSync(source, destination);
}

copyFileSync(projectOnePath, destinationProjectOne);