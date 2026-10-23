const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const studentRoutes = require('./routes/studentsRoutes');

app.get('/', (req, res) => {
    res.send('Nuestro app está funcionando correctamente');
});

app.use('/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
