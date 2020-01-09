const fs = require("fs");
const path = require("path");

Promise.race([create_promise(path.resolve(__dirname, "./file/01.txt")), create_promise(path.resolve(__dirname, "./file/02.txt")), create_promise(path.resolve(__dirname, "./file/03.txt"))]).then(result => {
    console.log(result);
});

function create_promise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}