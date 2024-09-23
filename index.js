const { program } = require('commander');
const fs = require("fs");

program.option('-cl, --count-letter <path>');

program.parse();
const option = program.opts();

function content(path) {
const location = fs.readFileSync(path, "utf-8").split(/\s+/).filter(Boolean);
console.log(`You have ${location.length} words in this file`);
}

content(option.countLetter);

