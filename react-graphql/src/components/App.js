import React from 'react';
import ConsoleContainer from './ConsoleContainer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {afterYear: 1990, beforeYear: 2000}
  }

  handleChangeAfter = (event) => {
    const afterYear = parseInt(event.target.value)
    this.setState({afterYear});
  }

  handleChangeBefore = (event) => {
    const beforeYear = parseInt(event.target.value)
    this.setState({beforeYear});
  }

  render() {
    const { afterYear, beforeYear } = this.state;
    return (
      <div>
        <h1>Consoles Information</h1>

        <div>
          After:
          <input type='number' value={afterYear} onChange={this.handleChangeAfter} />
        </div>

        <div>
          Before:
          <input type='number' value={beforeYear} onChange={this.handleChangeBefore} />
        </div>

        <br />

        <ConsoleContainer afterYear={afterYear} beforeYear={beforeYear} />
      </div>
    )
  }
}

export default App;
