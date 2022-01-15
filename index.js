const Coolors = require('./src/Coolors');
const fs = require('fs');

const cool = new Coolors('f3b3b4');


// Simple example of the use
(async () => {
    await cool.getVariations(['hues', 'tints', 'shades']);

    await cool.getCombinations(['triadic', 'analogous']);

    await cool.close();

    fs.writeFile('demo.json', JSON.stringify(cool.colors()), 'utf-8', error => {
        if (error) {
            return console.log(error);
        }
    });
})();
