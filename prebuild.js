var fs = require("fs");
var Fontmin = require('fontmin');
var set = new Set();
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

var generateFinalHTML = function(finalString) {
    console.log("Generating font subset for: ")
    console.log(finalString)
    var fontmin = new Fontmin()
    .src('assets/fonts/SourceHanSerifJP-Regular.ttf')
    .dest('build/fonts/')
    .use(Fontmin.ttf2woff({
        deflate: true           // deflate woff. default = false
    }))
    .use(Fontmin.glyph({ 
        text: finalString,
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }));

fontmin.run(function (err) {
    if (err) {
        throw err;
    }
});
}

walk("data", (n,results)=>{
    results.forEach(file => {
        const result = fs.readFileSync(file, 'utf8');
        var currentSet = new Set(result)
        set = new Set([...set, ...currentSet]);
    });
    generateFinalHTML(Array.from(set).join(""))
})


