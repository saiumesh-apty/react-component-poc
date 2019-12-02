//@ts-check
const { copyFileSync } = require('fs');
const { join } = require('path');


const projectOnePath = join(process.cwd(), 'build', 'dev', 'login_module.js');

const destinationProjectOne = join(process.cwd(), '../build', 'dev', 'login_module.js');

function copyFile(source, destination) {
    copyFileSync(source, destination);
}

copyFileSync(projectOnePath, destinationProjectOne);