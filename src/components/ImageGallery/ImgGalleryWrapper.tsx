import * as React from 'react';
import Portarl from '../../utils/Portal';

export default class imgGalleryWrapper extends React.Component {
  getContainer = () => {
    const container = document.createElement('div');
    document.body.append(container);
    return container;
  }
  getComponent() {
    return <div>今生</div>
  }

  render() {
    return (
      <Portarl getContainer={this.getContainer}>
        {this.getComponent()}
      </Portarl>
    )
  }
}