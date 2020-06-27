import axios from "axios";

const API_URL = "http://localhost:3001/grade/"
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: "Exercícios",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: "Trabalho Prático",
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: "Desafio",
    minValue: 0,
    maxValue: 50,
  },
]


async function getAllGrades() {
  const res = await axios.get(API_URL);
  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    }
  })
  return grades;
}

export { getAllGrades }