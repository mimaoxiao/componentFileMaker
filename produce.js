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
const componentsName = process.argv[3];
if(componentsName === undefined){
    console.log('error: no componentsName');
    return;
}
console.log('componentsName:',componentsName);

const templatePath = path.join(basePath,templateName);

const nowPath = path.resolve('./');
const aimPath = path.join(nowPath,componentsName);
fs.mkdirSync(aimPath);

fs.readdirSync(templatePath).forEach(Path => {
	console.log('making', Path);
	try{
		const filePath = path.join(templatePath,Path);
		if(fs.existsSync(filePath)){
			const file = fs.readFileSync(filePath);
			fs.writeFileSync(path.join(aimPath,Path),file);
		}
		console.log('make',Path,'complete');
	} catch (e){
		console.log('make',Path,'error:',e);
	}
})