import React from 'react';
import '../index.css';
import data from'../data.js';

function BootcampPage (props){ //função de página
  return(
    <div>
      <AverageNps sede={props.sede} />
      <BestGrades sede={props.sede} />
    </div>
  )
}

function AverageNps(props){ //NPS
  let AverageNpsDaTurma = [];
  if(props.sede) {

    var arraySprints = [];
    for (let turma in data[props.sede]) {

      var result = [];

      data[props.sede][turma].ratings.forEach((rating) => {
      // for (i in data[sede][turma]['ratings']) {

        var studentsPromoters = rating['nps']['promoters'];
        var studentsDetractors = rating['nps']['detractors'];
        arraySprints.push(rating);
        result.push(studentsPromoters-studentsDetractors);

      })
      var resultFinal = resultTechAndHse(result)

      AverageNpsDaTurma.push(
        <div className='averageNpsElement' key={turma}>
          {turma}
          <div className='sumSprintsElement'>O número de sprints é de: {result.length} sprints</div>
          <div className='npsElement'>A média do NPS dos sprints foi de {parseFloat(resultFinal.toFixed(2))} %
          </div>
        </div>
      );

    }
  }
  return AverageNpsDaTurma;
}

function resultTechAndHse(total){
  var hability = 0;
  var result = 0;
  for(var i=0; i < total.length; i++ ){
    hability += total[i];
    result = hability / total.length;
  }
  return(result);
}


function BestGrades(props) {  //function para alunas acima de 70%, tech e hse
  let melhoresNotasDaTurma = [];
  if(props.sede) {
    for (let turma in data[props.sede]) {   // alunas acima de 70% por turma
      var arrayOfSprints = [];
      var arrayOfHSESprints = [];
      var studentsOfSprints = [];
      var studentsOfHSE = [];
      // var arrTech = [];
      for (let student in data[props.sede][turma]['students']){

        arrayOfSprints.push( arrayOfSprint('tech', 1280, data[props.sede][turma]['students'][student]))

        arrayOfHSESprints.push('tech', 1280, data[props.sede][turma]['students'][student])

        console.log(data[props.sede][turma]['students'][student]['sprints'].length)
        var ind = arrayOfSprints.indexOf(data[props.sede][turma]['students'][student]['name']);
        if (ind>=0){
          studentsOfSprints.push(ind);
        }
        console.log(ind);
        var indHSE = arrayOfHSESprints.indexOf(data[props.sede][turma]['students'][student]['name']);
        if (indHSE>=0){
          studentsOfHSE.push(indHSE);
        }
      }
    }
      melhoresNotasDaTurma.push(
        <div className='gradesElement' key={'bestGrades'}>
          <div className='gradesElement'>
            A quantidade de alunas com notas TECH acima de 70% em todos os sprints é {studentsOfSprints.length}
          </div>
          <div className='grdElement'>
            A quantidade de alunas com notas HSE acima de 70% em todos os sprints é {studentsOfHSE.length}
          </div>
        </div>
      );
    
  }
  return melhoresNotasDaTurma;
}

function arrayOfSprint(techOrHse, min, dataBase){
  var total = [];
  var arrayOfSprints = [];
  var arrayOfNames = [];
  for (let sprint in dataBase['sprints']) {
    var sprintCorrect = sprint + 1;      
    var grade = dataBase['sprints'][sprint]['score'][techOrHse];
    if (grade >= min) {
      total.push(grade);
    } else {total.push(0);}
  
    if(total[sprint]>0){
      arrayOfSprints.push(dataBase['name']);
    }
  }
  return(arrayOfSprints);
}
export default BootcampPage;