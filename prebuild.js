const fs = require("fs");
const Fontmin = require('fontmin');
let set = new Set();

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