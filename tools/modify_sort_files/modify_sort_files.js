/**
 * Created by alan on 2017/5/1.
 */


var fs = require('fs');
var path = require('path');

function getFileList(fileList, dir) {
    var allFiles = fs.readdirSync(dir);
    allFiles.forEach(function (filename) {
        var fullName = path.join(dir, filename);
        var stats = fs.statSync(fullName);
        if ((!stats.isDirectory()) && (filename.substr(0, 1) !== '.')) {
            // process.stdout.write(filename + '\t' + stats.size + '\t' + stats.mtime + '\n' );
            fileList.push(filename);
        }
    });
    // console.log(fileList);
}

function modifySortFiles(srcPath, dstPath, preFix, postFix) {
    var index = 0;
    var fileList = [];
    getFileList(fileList, srcPath);

    fileList.forEach(function (filename) {
        fullSrcName = srcPath + '/' + filename;
        fullDstName = dstPath + '/' + preFix + index + postFix;
        fs.writeFile(fullDstName);
        fs.createReadStream(fullSrcName).pipe(fs.createWriteStream(fullDstName));
        index++;
    });
}

function main(argv) {
    if (undefined === argv[0]) {
        console.log("Please input the direction to be converted ...");
        return;
    }

    if (undefined === argv[1]) {
        console.log("Please input the preFix ...");
        return;
    }

    if (undefined === argv[2]) {
        console.log("Please input the postFix ...");
        return;
    }

    var srcPath = argv[0];
    fs.mkdir(srcPath + '/convert');

    preFix = argv[1];
    postFix = argv[2];

    modifySortFiles(srcPath, (srcPath + '/convert'), preFix, postFix);
    console.log('finish');
}

main(process.argv.slice(2));




