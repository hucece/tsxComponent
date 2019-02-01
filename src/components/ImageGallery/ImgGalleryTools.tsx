import * as React from 'react';
import { imgGalleryToolsPropsType } from './ImgGalleryPropTypes';

export default class ImgGalleryTools extends React.Component<imgGalleryToolsPropsType, {}> {
  toolsActionClick = (e: any) => {
    const target = e.target;
    if (target.nodeName === 'A') {
      const key = target.key;
      this.props.toolsActionClickHandler(key);
    }
  }

  getClassName(enable: boolean) {
    return `toolAction ${enable ? '' : 'disableToolAction'}`;
  }

  render() {
    const { isIndexNumVisible, enableZoomIn, enableZoomOut, enableOrigin, enableResponsive } = this.props;

    const toolList = [{
      key: "zoomOut",
      title: '缩小',
      className: this.getClassName(enableZoomOut),
    }, {
      key: "zoomIn",
      title: '放大',
      className: this.getClassName(enableZoomIn),
    }, {
      key: "origin",
      title: '原始尺寸',
      className: this.getClassName(enableOrigin),
    }, {
      key: "responsive",
      title: '自适应',
      className: this.getClassName(enableResponsive),
    }];

    return (
      <div>
        {
          isIndexNumVisible && <div>{this.props.indexNum}</div>
        }
        <div onClick={this.toolsActionClick}>
          {
            toolList.map(props => <a href="javascript:;" {...props}></a>)
          }
        </div>
      </div>
    )
  }
}