const fs = require('fs');
const readAndAppend = (content, file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve('Note added');
            });
        }
        );
    }
    );
}
const readAndDelete = (id, file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const parsedData = JSON.parse(data);
            const newData = parsedData.filter(note => note.id !== id);
            fs.writeFile(file, JSON.stringify(newData, null, 4), (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve('Note deleted');
            });
        }
        );
    }
    );
}
module.exports = { readAndAppend, readAndDelete, fs };
