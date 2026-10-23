const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const students = [];

const createStudent = (name, age, course, sex, language) => {
    const student = {
        name,
        age,
        course,
        sex,
        language
    }
    students.push(student);
    return student;
}

const extractStudent = (name) => {
    return students.find(student => student.name === name);
}

const updateStudent = (name, age, course, sex, language) => {
    const student = extractStudent(name);
    if (student) {
        if(age !== undefined) student.age = age;
        if(course !== undefined) student.course = course;
        if(sex !== undefined) student.sex = sex;
        if(language !== undefined) student.language = language;
    }
    return student;
}

const deleteStudent = (name) => {
    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
        students.splice(index, 1);
        return true;
    }
    return false;
}

app.get('/', (req, res) => {
    res.send('Nuestro app esta funcionando correctamente');
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.patch('/students/:name', (req, res) => {
    const { name } = req.params;
    const { age, course, sex, language } = req.body;

    const student = updateStudent(name, age, course, sex, language);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
    }
});

app.post('/students', (req, res) => {
    const { name, age, course, sex, language } = req.body;

    const student = createStudent(name, age, course, sex, language);

    res.status(201).json(student);
});

app.delete('/students/:name', (req, res) =>{
    const { name } = req.params;
    const deleted = deleteStudent(name);

    if (deleted) {
        res.json({ message: 'Estudiante eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Este servidor esta corriendo en el puerto ${PORT}`);
});

