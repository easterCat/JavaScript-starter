const { execSync } = require('child_process');
const stamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
const command = `gitbook build && gitbook build ./ ./docs && git pull && git add . && git commit -m "javascript-starter快速提交=>${stamp}" && git push -u origin master`;
execSync(command);
