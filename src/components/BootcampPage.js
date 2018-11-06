import React from 'react';
import '../index.css';
import data from'../data.js';

function BootcampPage (props){ //função de página
  return(
    <div>
      <AverageNps sede={props.sede} />
      {/* <BestGrades sede={props.sede} /> */}
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
        <div className='averageNpsElement container-margin' key={turma}>
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

export default BootcampPage;