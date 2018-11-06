import React from 'react';
import '../index.css';
import data from'../data.js';


function GeneralPage (props){
  return(
    <div>
      <DadosDaTurma sede={props.sede} />
      <Grades sede={props.sede} />
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
        <div className='periodElement container-margin' key={turma}>
          {turma}
          <div className='sumStudentsElement'>total de alunas: {sum} alunas</div>
          <div className='dropoutsElement'>desistências: {resultFinal.toFixed(2) + '%'}</div>
        </div>
      );
    }
  }

  
  return renderDosDadosDaTurma;
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
      <div className='container-Element container-margin' key={'Grades'}>
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

export default GeneralPage;