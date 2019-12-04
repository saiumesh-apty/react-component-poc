//@ts-check
const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');


const projectOnePath = join(process.cwd(), 'build', 'dev', '%projectname%.js');

const destinationProjectOne = join(process.cwd(), '../../server/react-bundles', '%projectname%.js');
const serverComponentPath = join(process.cwd(), '../../server/react-bundles');

// check if folder exists
if(!existsSync(serverComponentPath)) {
    mkdirSync(serverComponentPath);
}

copyFileSync(projectOnePath, destinationProjectOne);