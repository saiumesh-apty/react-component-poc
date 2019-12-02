const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();
const publicPath = path.join(__dirname, './build/dev');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));
app.use(compression());

// here serve your angular/react html file
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
});