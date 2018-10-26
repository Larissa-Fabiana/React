import React from 'react';
import './index.css';
import data from'./data.js';

function BootcampPage (props){ //função de página
  return(
    <div>
      <AverageNps sede={props.sede} />
      <BestGrades sede={props.sede} />
    </div>
  )
}




function DadosDaTurma(props) {
  let renderDosDadosDaTurma = [];
  if(props.sede) {
    for(let turma in data[props.sede]) {
      var sum = 0;
      var result = [];
      var total = 0;
      var resultFinal = 0;

      data[props.sede][turma].students.forEach((student) => {
        if (student.name !== undefined){
          sum+=1
        }

        var isStudentActive = student.active;
        total += 1;

        if (!isStudentActive) {
          result.push(student);
          resultFinal = (result.length/100) * total;
        }
      });

      renderDosDadosDaTurma.push(
        <div className='periodElement' key={turma}>
          {turma}
          <div className='sumStudentsElement'>total de alunas: {sum} alunas</div>
          <div className='dropoutsElement'>desistências: {resultFinal.toFixed(2) + '%'}</div>
        </div>
      );
    }
  }

  
  return renderDosDadosDaTurma;
}





function AverageNps(props){ //NPS
  let AverageNpsDaTurma = [];
  if(props.sede) {

    var arraySprints = [];
    for (letturma in data[props.sede]) {

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
          <div class='sumSprintsElement'>O número de sprints é de: ${result.length} sprints</div>
          <div class='npsElement'>A média do NPS dos sprints foi de ${parseFloat(resultFinal.toFixed(2))} %</div>
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







function Grades(props) {  //function para notas tech e hse totais
  let renderDasNotasDaTurma = [];
  if(props.sede) {
    for (let turma in data[props.sede]) {  //arrays com todas as notas em uma unica linha abaixo
      var techTotal = [];
      var hseTotal = [];
      var resultTech = 0;
      var resultHSE = 0;

      data[props.sede][turma].students.forEach((student) => {
      // for (student of data[props][turma]['students']){
        for (let j in student['sprints']) {

          techTotal.push(student['sprints'][j]['score']['tech']);  //joga notas na array tech
          hseTotal.push(student['sprints'][j]['score']['hse']);  //joga notas na array hse

          resultTech = resultTechAndHseBootcamp(techTotal, j)
          resultHSE = resultTechAndHseBootcamp(hseTotal, j)

        } 
      })
    }

    renderDasNotasDaTurma.push(
      <div className='container-Element' key={'Grades'}>
        <div className='techElement'>A média de notas tech no Bootcamp é: {resultTech}</div>
        <div className='hseElement'>A média de notas HSE no Bootcamp é: {resultHSE}</div>
      </div>
    );
  }
  return renderDasNotasDaTurma;
}

function resultTechAndHseBootcamp(total, j){
  var hability = 0;
  var result = 0;
  for(var x=0; x < total.length; x++ ){
    hability += total[j];
    result = hability / total.length;
  }
  return(result);
}

export default BootcampPage;




function averageNps(){ //NPS
  var sede = $('#drop-menu').val();
  var arraySprints = [];
  for (turma in data[sede]) {
    $("#infos").append(`<div class='averageNpsElement' data-turma=${turma}>${turma}</div>`);
    var result = [];
    for (i in data[sede][turma]['ratings']) {
      var studentsPromoters = data[sede][turma]['ratings'][i]['nps']['promoters'];
      var studentsDetractors = data[sede][turma]['ratings'][i]['nps']['detractors'];
      arraySprints.push(i);
      result.push(studentsPromoters-studentsDetractors);
    }
    var resultFinal = resultTechAndHse(result)
    $(`div[data-turma=${turma}]`).append(`
    <div class='sumSprintsElement'>O número de sprints é de: ${result.length} sprints</div>
    <div class='npsElement'>A média do NPS dos sprints foi de ${parseFloat(resultFinal.toFixed(2))} %</div>
    `);
  }
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

function bestGrades() {  //function para alunas acima de 70%, tech e hse
  var sede = $('#drop-menu').val();
  for (turma in data[sede]) {   // alunas acima de 70% por turma
    $("#infos").append(`<div class='bestGradesElement' data-turma=${turma}bestGradesElement>${turma}</div>`);
    var arrayOfSprints = [];
    var arrayOfHSESprints = [];
    var studentsOfSprints = [];
    var studentsOfHSE = [];
    for (i in data[sede][turma]['students']){
      // var techTotal = [];
      // var hseTotal = [];
      //duplicar esse for
      var arrTech = arrayOfSprint('tech', 1280, data[sede][turma]['students'][i])
      arrTech.forEach(element => {
        arrayOfSprints.push(element)
      });
      var arrHse = arrayOfSprint('tech', 1280, data[sede][turma]['students'][i])
      arrHse.forEach(element => {
        arrayOfHSESprints.push(element)
      });

      var ind = arrayOfSprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (ind>=0){
        studentsOfSprints.push(ind);
      }
      var indHSE = arrayOfHSESprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (indHSE>=0){
        studentsOfHSE.push(indHSE);
      }
    }
    $(`div[data-turma=${turma}bestGradesElement]`).append(`
    <div class='gradesElement'>A quantidade de alunas com notas TECH acima de 70% em todos os sprints é ${studentsOfSprints.length}</div>
    <div class='grdElement'>A quantidade de alunas com notas HSE acima de 70% em todos os sprints é ${studentsOfHSE.length}</div>
    `);
  }
}

function arrayOfSprint(techOrHse, min, dataBase){
  var total = [];
  var arrayOfSprints = [];
  for (j in dataBase['sprints']) {          
    var grade = dataBase['sprints'][j]['score'][techOrHse];
    if (grade >= min) {
      total.push(grade);
    } else {total.push(0);}
    if(total[j]>0){
      arrayOfSprints.push(dataBase['name']);
    }
  }
  return(arrayOfSprints);
}
