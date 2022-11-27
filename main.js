import { constants } from "buffer";
import readline from "readline";

const students = [{
    age: 32,
    examScores: [],
    gender: 'male',
    name: 'edu'
  },
  {
    age: 29,
    examScores: [],
    gender: 'female',
    name: 'silvia'
  }]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

//config node
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const isInt = (str) => {
    const integer = parseInt(str);
    if (Number.isNaN(integer)) {
      return false;
    } else {
      return true;
    }
};
function getNumberFromConsole() {
    const promise = new Promise((resolve, reject) => {
      rl.question("Ingrese su opción: ", (num) => {
        rl.pause();
        if (isInt(num)) {
          num = Number.parseInt(num);
          resolve(num);
        } else {
          reject("Número no válido");
        }
      });
    });
  
    return promise;
  }

  async function showInConsole() {
    let numberFromConsole;
    

    do {
        const inputNumber = "\nIngrese alguna de las opciones para obtener los siguientes resultados,\no ingrese 0 para detener el programa.\n\n1 - Mostrar en formato de tabla todos los alumnos.\n2 - Mostrar por consola la cantidad de alumnos que hay en clase.\n3 - Mostrar por consola todos los nombres de los alumnos.\n4 - Eliminar el último alumno de la clase.\n5 - Eliminar un alumno aleatoriamente de la clase.\n6 - Mostrar por consola todos los datos de los alumnos que son chicas.\n7 - Mostrar por consola el número de chicos y chicas que hay en la clase.\n8 - Mostrar true o false por consola si todos los alumnos de la clase son chicas.\n9 - Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.\n10- Añadir un alumno nuevo con los siguientes datos:\n    - nombre aleatorio.\n    - edad aleatoria entre 20 y 50 años.\n    - género aleatorio.\n    - listado de calificaciones vacío.\n11- Mostrar por consola el nombre de la persona más joven de la clase.\n12- Mostrar por consola la edad media de todos los alumnos de la clase.\n13- Mostrar por consola la edad media de las chicas de la clase.\n14- Añadir nueva nota a los alumnos.\n15- Ordenar el array de alumnos alfabéticamente según su nombre.\n16- Mostrar por consola el alumno de la clase con las mejores notas.\n17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.\n18- Añadir un punto extra a cada nota existente de todos los alumnos."
        console.log(inputNumber)
        try {
            numberFromConsole = await getNumberFromConsole()
        } catch (error) {
            console.log(error)
            process.exit(0)
        }

        switch(numberFromConsole) {
          //1 - Mostrar en formato de tabla todos los alumnos.
            case 1:
                console.table(students);
                break;
          //2 - Mostrar por consola la cantidad de alumnos que hay en clase.
            case 2:
                console.log(students.length);
                break;
          //3 - Mostrar por consola todos los nombres de los alumnos.
            case 3:
                for (let student in students) {
                  console.log(students[student].name)
                };
                break;
          //4 - Eliminar el último alumno de la clase.
            case 4:
                students.pop();
                console.table(students);
                break;
          //5 - Eliminar un alumno aleatoriamente de la clase.
            case 5:
                let randomIndex = Math.floor(Math.random() * students.length);
                students.splice(randomIndex, 1);
                console.table(students);
                break;
          //6 - Mostrar por consola todos los datos de los alumnos que son chicas.
            case 6:
                const sheStudents = students.filter(student => student.gender === 'female');
                console.table(sheStudents);
                break;
          //7 - Mostrar por consola el número de chicos y chicas que hay en la clase.
            case 7:
                const men = students.filter(student => student.gender === 'male');
                const women = students.filter(student => student.gender === 'female');
                console.log("Chicos: " + (men.length));
                console.log("Chicas: " + (women.length));  
                break;
          //8 - Mostrar true o false por consola si todos los alumnos de la clase son chicas.
            case 8:
                const allWoman = students.length > 0 ? students.every(student => student.gender === 'female') : false;
                console.log(allWoman);
                break;
          //9 - Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
            case 9:        
                const youngerStudents = students.filter(student => student.age >= 20 && student.age <= 25)
                
                if (youngerStudents.length > 0){
                  for (let student in youngerStudents) {
                    console.log(youngerStudents[student].name)
                  }
                } else{
                    console.log("No hay alumnos menores de 25 años")
                  };                 
                
                break;
          //10- Añadir un alumno nuevo:
            case 10:
                let randomGender = availableGenders[Math.floor(Math.random() * availableGenders.length)]
                let randomName = randomGender === 'female' ? availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)] : availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)];
                let randomAge = Math.floor(Math.random() * 31)+20;
                
                students.push({age: randomAge, examScores: [], gender: randomGender, name: randomName});
                console.table(students);
                break;
            //11- Mostrar por consola el nombre de la persona más joven de la clase.
            case 11:
              let studentAges = students.map(student => student.age);

              const minAge = Math.min(...studentAges);
              const youngerStudent = students[studentAges.indexOf(minAge)];
              const youngerName = students.length > 0 ?  youngerStudent.name : "No hay nadie por aquí";
    
              console.log(youngerName)
              break;
            //12- Mostrar por consola la edad media de todos los alumnos de la clase.
            case 12:
                let total = 0;
                for (let student in students) {
                  total += students[student].age;
                  } if (students.length > 0) {
                    console.log(total/students.length)
                  } else {
                    console.log("No hay nadie por aquí")
                  }
          
                break;
            //13- Mostrar por consola la edad media de las chicas de la clase.
            case 13:
                let womenTotal = 0;
                let counter = 0;
                  for (let i in students) {
                      if (students[i].gender === 'female') {
                          counter += 1;
                          womenTotal += students[i].age;
                      } 
                  }
                  let media = Math.floor(womenTotal/counter)
                  console.log(`La edad media de las mujeres es de ${media} años`)
                break;
            //14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.
            case 14:
                for (let i in students) {
                  let randomScore = Math.floor(Math.random() * 11);
                  students[i]["examScores"] = randomScore;
                };
                console.table(students)
                break;
            //15- Ordenar el array de alumnos alfabéticamente según su nombre.
            case 15:
                let studentsAbc = students.sort((a, b) => a.name.localeCompare(b.name))
                console.table(studentsAbc);
                break;
            default:
                process.exit(0);
            }
        
    } while (numberFromConsole <= 15 && numberFromConsole >= 0)
}
 

showInConsole();
