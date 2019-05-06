const express = require('express'),
      app = express();

const exphbs = require('express-handlebars'),
      mongoose = require('mongoose')
      
      
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

mongoose.connect('mongodb://localhost:27017/revolution', { useNewUrlParser: true });

app.use(express.static('public'));

// ########################
//       Controllers    
// ########################

    // Map
const welcome = require('./controllers/welcome'),
      mediaOwnerMap = require('./controllers/mediaOwnerMap'),
      gallery = require('./controllers/gallery')

// ########################
//         Routes       
// ########################

app.get ('/', welcome)
app.get ('/mediaOwnerMap', mediaOwnerMap)
app.get('/gallery', gallery)

app.listen(3000, () => {
    console.log('Le serveur tourne sur le port 3000');
});