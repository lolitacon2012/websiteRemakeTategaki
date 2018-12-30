const fs = require("fs");
const Fontmin = require('fontmin');
let set = new Set();
let article_collection = {
    tags:[],
    tag_articles:[],
    articles: {},
};
/* 
something like this:

{
    total: 3,
    tags: [
        "aaa", "bbb", "ccc"
    ],
    tag_articles: [
        ["id1", "id2"],["id1"]
    ],
    articles: {
        id1: {},
        id2: {},
        ...
    }
}

*/
fs.readdir("data/article", (err, list) => {
    console.log("Found " + list.length + " articles.")
    article_collection.total = list.length;
    for(let i=0;i<list.length;i++){
        const currentFile = 'data/article/' + list[i];
        const currentJson = JSON.parse(fs.readFileSync(currentFile, 'utf8'));
        article_collection.articles[currentJson.id] = currentJson;
        const current_tags = currentJson.tags;
        current_tags.forEach((tag)=>{
            const indexOfTag = article_collection.tags.indexOf(tag);
            if(indexOfTag>-1){
                article_collection.tag_articles[indexOfTag].push(currentJson.id)
            }else{
                article_collection.tags.push(tag);
                article_collection.tag_articles.push([ currentJson.id ]);
            }
        })
    }
    fs.writeFileSync('build/article/index.json', JSON.stringify(article_collection));
});




//get all possible characters
const scanFolder = (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) {
            return done(err);
        }
        let i = 0;
        (function iter() {
            let file = list[i++];
            if (!file) {
                return done(null, results);
            }
            file = dir + '/' + file;
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    scanFolder(file, (err, res) => {
                        results = results.concat(res);
                        iter();
                    });
                } else {
                    results.push(file);
                    iter();
                }
            });
        })();
    });
};

//get all possible characters
const generateFinalHTML = finalString => {
    const fontmin = new Fontmin()
        .src('assets/fonts/SourceHanSerifCN-Light.ttf')
        .dest('build/fonts/')
        .use(Fontmin.glyph({
            text: finalString,
            hinting: false
        }))
        .use(Fontmin.ttf2woff({
            deflate: true
        }));


    fontmin.run((err) => {
        if (err) {
            throw err;
        }
    });
}

//get all possible characters
scanFolder("data", (n, results) => {
    results.forEach(file => {
        const result = fs.readFileSync(file, 'utf8');
        const currentSet = new Set(result)
        set = new Set([...set, ...currentSet]);
    });
    generateFinalHTML(Array.from(set).join(""))
})

//generate all articles
