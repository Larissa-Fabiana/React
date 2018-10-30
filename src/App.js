import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import GeneralPage from'./GeneralPage';
import BootcampPage from'./BootcampPage';
import TeamPage from'./TeamPage';
import StudentsPage from'./StudentsPage';
import { Route, Link } from 'react-router-dom';

const selectOptions = [
  {value: 'AQP', text: 'Arequipa'},
  {value: 'LIM', text: 'Lima'},
  {value: 'CDMX', text: 'Cidade do México'},
  {value: 'SCL', text: 'Santiago'}
];

function Dropdown(props) {
  return (
    <select id="drop-menu" onChange={props.dropdownChange} value={props.dropdownValue}>
      <option defaultValue>{props.defaultValue}</option>
      {
        props.options.map((option, index) => {
          return <option key={index} value={option.value}>{option.text}</option>
        })
      }
    </select>
  );
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: "",
      selectValue2: ""
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.setState({selectValue: e.target.value})
  }
  

  handleSelectChange2(e) {
    this.setState({selectValue2: e.target.value})
  }

  render() {
    return (
      // <div>oi</div>
      <div>
        <nav>
          <Dropdown dropdownChange={this.handleSelectChange} 
            dropdownValue={this.state.selectValue}
            defaultValue={"Selecione a sede"}
            options={selectOptions}
          />
          <Link to='/'>Home</Link>
          <Link to='/general'>Geral</Link>
          <Link to='/students'>Estudantes</Link>
          <Link to='/bootcamp'>Bootcamp</Link>
          <Link to='/team'>Equipe</Link>
          <Link to='/exit'>Sair</Link>
          <Link to='*'></Link>
        </nav>
        <Route path='/' exact render={
          () => <img src='https://ucarecdn.com/c9de877a-a518-4d5c-959f-f2e12fce9fb1/'/>
        }/>
        <Route path='/general' render={() => <GeneralPage sede={this.state.selectValue}/>}/>
        <Route path='/students' render={() => <StudentsPage sede={this.state.selectValue}/>}/>
        <Route path='/bootcamp' render={() => <BootcampPage sede={this.state.selectValue}/>}/>
        <Route path='/team' render={() => <TeamPage sede={this.state.selectValue}/>}/>
        <Route path='/exit' render={() => <h1 class='outputElement'>Nos vemos na próxima :)</h1>}/>
      </div>
    );
  }
}

export default App;
