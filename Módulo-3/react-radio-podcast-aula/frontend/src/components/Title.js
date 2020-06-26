import React, { Component } from 'react';

export default class Title extends Component {
  render() {
    const { children } = this.props;

    return <h1 className='center'>{children}</h1>;
  }
}
