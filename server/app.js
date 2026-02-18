const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(express.static(path.join(__dirname, '../public')));


hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});


const getData = (file) => {
    const rawData = fs.readFileSync(path.join(__dirname, 'data', file));
    return JSON.parse(rawData);
};

app.get('/', (req, res) => {
    const siteData = getData('site.json');
    res.render('index', siteData);
});

app.get('/informe', (req, res) => {
    const site = getData('site.json');
    const citiesData = getData('cities.json');
    const countriesData = getData('countries.json');

 
    res.render('informe', {
        title: site.title,
        cities: citiesData.cities,
        countries: countriesData.countries 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});