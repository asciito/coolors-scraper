const Coolors = require('./src/Coolors');
const fs = require('fs');

const cool = new Coolors('f3b3b4');


// Simple example of the use
(async () => {
    await cool.getTints();
    await cool.getShades();
    await cool.getHues();
    await cool.getTones();

    await cool.close();

    fs.writeFile('demo.json', JSON.stringify(cool.colors()), 'utf-8', error => {
        if (error) {
            return console.log(error);
        }
    });
})();
