import * as React from 'react';
// import LazyRenderBox from './LazyRenderBox';
// import ImageGalleryWrapper from './ImgGalleryWrapper';
import "./index.css";


export default class imgGallery extends React.Component {
  state = {
    visible: false,
  }
  setVisible = (e: any) => {
    console.log(e.target.nodeName)
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const className = "LzayRenderBox";
    const hiddenClassName = "hiddenLazyRenderBox";
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'red', marginRight: '30px', flexGrow: 1.5 }}>fds</div>
          <div style={{background: 'yellow', flexGrow: 1}}>fsda</div>
      </div>
    )
  }
}