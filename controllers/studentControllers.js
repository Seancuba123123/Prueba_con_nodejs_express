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

const existsStudent = (name) => {
    return students.some(student => student.name === name);
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

const getStudents = (req, res) => {
    res.json(students);
};

const patchStudent = (req, res) => {
    const { name } = req.params;
    const { age, course, sex, language } = req.body;

    const student = updateStudent(name, age, course, sex, language);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
    }
};

const postStudent = (req, res) => {
    const { name, age, course, sex, language } = req.body;

    const studentExists = existsStudent(name);

    if(studentExists) {
        return res.status(400).json({ message: 'El estudiante ya existe' });
    }

    const student = createStudent(name, age, course, sex, language);

    res.status(201).json(student);
};

const deleteStudentController = (req, res) => {
    const { name } = req.params;
    const deleted = deleteStudent(name);

    if (deleted) {
        res.json({ message: 'Estudiante eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
    }
};

module.exports = {
    getStudents,
    postStudent,
    patchStudent,
    deleteStudentController 
};