import React from 'react';
import '../index.css';
import data from'../data.js';

function TeamPage(props) { //função de página
  return(
    <div>
      <Teachers sede={props.sede} />
      <Satisfaction sede={props.sede} />
    </div>
  )
}

function Teachers(props){ //notas de professores e jedis
  let renderDaEquipe = [];
  if(props.sede) {
    let arraySprints = [];
          let resultFinalT = '';
      let resultFinalJ = '';
    for (let turma in data[props.sede]) {
      let resultTeacher = [];
      let resultJedi = [];
      for (let rating in data[props.sede][turma]['ratings']){
        arraySprints.push(rating);
        resultTeacher.push(data[props.sede][turma]['ratings'][rating]['teacher']);  
        resultJedi.push(data[props.sede][turma]['ratings'][rating]['jedi']);     
      }
    
    resultFinalT = resultTechAndHse(resultTeacher)
    resultFinalJ = resultTechAndHse(resultJedi)
    console.log(resultFinalT)
    console.log(resultFinalJ)
    }
    const reduce = resultFinalT.reduce((acum, num) => acum + num);
    console.log(reduce)

    renderDaEquipe.push(
      <div className='periodElement' key={'equipe'}>
        <div className='teachersElement'>A média dos mentores é {resultFinalT.toFixed(2)}</div>
        <div className='jediElement'>A média dos Jedi Masters é  {resultFinalJ.toFixed(2)}</div>
      </div>
    );
  
  }
  return renderDaEquipe;
}

function resultTechAndHse(total){
  let hability = 0;
  let result = 0;
  for(let one of total){
    hability += one;
    result = hability / total.length;
  }
  return(result);
}


function Satisfaction(props){ //satisfação média por sede
  let satisfaçãoDaTurma = [];
  if(props.sede) {
    let arraySprints = [];
    for (let turma in data[props.sede]) {
      let result = [];
      for (let rating in data[props.sede][turma]['ratings']) {
        let cumpleExpectancy = data[props.sede][turma]['ratings'][rating]['student']['cumple'];
        let superaExpectancy = data[props.sede][turma]['ratings'][rating]['student']['supera'];
        arraySprints.push(rating);
        // var sizeSprints = arraySprints.length;
        result.push(cumpleExpectancy + superaExpectancy);
      }
      let resultFinal = resultTechAndHse(result)

      satisfaçãoDaTurma.push(
        <div className='satisfactionElement' key={turma}>
          {turma}
          <div class='expectationElement'>
            Alunas satisfeitas com a experiência  na Laboratoria: {resultFinal.toFixed(2)} %
          </div>
        </div>
      );
    }
  }
  return satisfaçãoDaTurma;
}


export default TeamPage;