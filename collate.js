const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);

let posts;
let arr = [];

let args = process.argv;
args.shift();
args.shift();
args.push(null);
console.log(args);

const readFunc = async (arr, cb)=>{

	for(let entry of arr){
		entry.content = await readFileAsync('./posts/'+entry.filename, 'utf-8');
	}

	cb(arr);
};

readdirAsync('./posts').then((files)=>{

	posts = files.filter( (el)=>{return (el.substr(el.lastIndexOf('.')) == '.md');} ).sort().reverse();
	console.log(posts);
	posts.forEach((el)=>{

	let str = el.substr(0, el.lastIndexOf('.'));
	let rmgroup = el.substr(0, el.lastIndexOf('-'));

		let entry = {
			filename: el,
			date:  str.substr(0, rmgroup.lastIndexOf('-')),
			title: rmgroup.substr(rmgroup.lastIndexOf('-')+1),
			description: "",
			content: "",
			group: str.substr(str.lastIndexOf('-')+1),
			categories: [],
			display: true,
			minimize: false,
			static: false
		};
		
	    console.log(entry);
		arr.push(entry);
	});

}).catch(error => console.log(error)).then(()=>{

	for(let i = 0; i < args.length; i++){	

		let filter = args[i];
		let list = (filter == null) ? arr : arr.filter((el)=> el.group == filter);
		let file = (filter == null) ? 'posts.json' : 'posts_'+filter+'.json';
		
		readFunc(list,(ret)=>{	

			writeFileAsync('./posts/'+file, JSON.stringify(ret, null, "\t")).catch(error => console.log(error)).then(()=>{
				console.log('wrote: /posts/'+file);
			});

		});

	}


});

