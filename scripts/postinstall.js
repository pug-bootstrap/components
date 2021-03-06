#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const fsPromises = fs.promises;

console.log('Copying mixins from @pug-bootstrap/components to views/components');
exec('echo "$INIT_CWD"', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  const workingDir = stdout.replace('\n','');
  const mixinPath = `${workingDir}/node_modules/@pug-bootstrap/components/mixins`;
  const mixins = fs.readdirSync(mixinPath);
  const destDir = `${workingDir}/views/components/`;
  if(!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
  mixins.forEach(m => {
    const source = `${mixinPath}/${m}`;
    const dest = `${destDir}/${m}`;
    fsPromises.copyFile(source, dest)
      .then(() => console.log(`${m} was copied to ${destDir}`))
      .catch(() => console.log(`${m} could not be copied`));
  });
});
