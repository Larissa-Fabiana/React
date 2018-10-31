import React from 'react';
import '../index.css';
import data from'../data.js';

function StudentsPage(props){ //função de página
  return(
    <div>
      <StudentList sede={props.sede} />
    </div>
  )
}

function StudentList(props){ //lista de estudantes
  let Students = [];
  if(props.sede) {
    for(let turma in data[props.sede]){
      let active = [];
      let inactive = [];
      for(let student of data[props.sede][turma]['students']){
        var stdActive = student['active'];
        if (stdActive){
          stdActive = "Ativa";
          active.push(<p>{student['name']}- status: {stdActive}</p>)
        }else{
          stdActive = "Inativa";
          inactive.push(<p>{student['name']}- status: {stdActive}</p>)
        }
      }

      Students.push(
        <div className='studentElement' key={turma}>
          {turma}
          <div className='active'>
            {active}
          </div>
          <div className='inactive'>{inactive}</div>
        </div>
      )
    }
  }
  return Students;
}


export default StudentsPage;