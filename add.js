const fs = require('fs');
const process = require('process');
const path = require('path');

const basePath = __dirname;

const templateName = process.argv[2];
if(templateName === undefined){
    console.log('error: no templateName');
    return;
}
console.log('templateName:',templateName);

const templatePath = path.join(basePath,templateName);
if(fs.existsSync(templatePath)){
    console.log('error:template has existed');
    return;
}
fs.mkdirSync(templatePath);

const nowPath = path.resolve('./');
const aimPath = path.join(nowPath,templateName);
if(!fs.existsSync(aimPath)){
    console.log('error:no such dir');
    return;
}

fs.readdirSync(aimPath).forEach(Path => {
	console.log('making', Path);
	try{
		const filePath = path.join(aimPath,Path);
		if(fs.existsSync(filePath)){
      const file = fs.readFileSync(filePath);
			fs.writeFileSync(path.join(templatePath,Path),file);
		}
		console.log('make',Path,'complete');
	} catch (e){
		console.log('make',Path,'error:',e);
	}
})