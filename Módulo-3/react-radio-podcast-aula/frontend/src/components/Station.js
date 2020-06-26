import React, { Component } from 'react';

export default class Station extends Component {
  handleInputChange = (event) => {
    const newStation = event.target.value;
    this.props.onStationChange(newStation);
  };

  render() {
    const { station } = this.props;
    const { stationStyle, stationStyle2 } = styles;

    return (
      <div className='center'>
        <input
          style={{ ...stationStyle, ...stationStyle2 }}
          type='text'
          value={station}
          readOnly
        />

        <input
          min='88.5'
          max='108'
          step='0.1'
          type='range'
          value={station}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const styles = {
  stationStyle: {
    width: '400px',
    border: '1px solid lightgray',
    borderRadius: '5px',
    textAlign: 'center',
  },

  stationStyle2: {
    fontWeight: 'bold',
  },
};
