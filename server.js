const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static("public"));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Root route
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Pozdrav sa Railway servera!');
});

// Route for dynamic images
app.get('/slike', (req, res) => {
    try {
        console.log('GET /slike route hit'); // Debugging log
        const folderPath = path.join(__dirname, 'public', 'images');
        console.log(`Folder path: ${folderPath}`); // Debugging log

        const files = fs.readdirSync(folderPath);
        console.log(`Files in folder: ${files}`); // Debugging log

        const images = files
            .filter(file => file.endsWith('.jpg') || file.endsWith('.svg'))
            .map((file, index) => ({
                url: `/images/${file}`,
                id: `slika${index + 1}`,
                title: `Slika ${index + 1}`
            }));

        console.log(`Images to render: ${JSON.stringify(images)}`); // Debugging log
        res.render('slike', { images });
    } catch (error) {
        console.error(`Error in /slike route: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});