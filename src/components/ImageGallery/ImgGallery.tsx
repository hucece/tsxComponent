import * as React from 'react';
import { curImgInfoPropsType } from './ImgGalleryPropTypes';

const scaleList = [0.1, 0.25, 0.33, 0.5, 0.65, 0.8, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4];

export default class ImgGallery extends React.Component {
  private isMoving: boolean;
  private enableVerticalMove: boolean;
  private enableHorizalMove: boolean;
  private viewerContainerWidth: number;
  private viewerContainerHeight: number;
  private imgWidth: number;
  private imgHeight: number;
  private viewerContainer: any;
  private responsiveScale: number;
  private imgScale: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      imgStyle: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      imgSrc: '',
      loading: false,
    }
  }
  

  // 缩小
  _handleZoomOut() {
    const pScale = this.imgScale;
    const scaleListLength = scaleList.length;
    const tempScaleList = scaleList.slice().reverse();

    this.imgScale = tempScaleList.find((scale: number, index: number) => {
      return (pScale === scale && index === scaleListLength -1) || (pScale > scale);
    }) || 1;

  }

  // 放大
  _handleZoomIn() {
    const pScale = this.imgScale;
    const scaleListLength = scaleList.length;

    this.imgScale = scaleList.find((scale: number, index: number) => {
      return (pScale === scale && index === scaleListLength - 1) || (pScale < scale);
    }) || 1;
  }

  // 原始尺寸
  _handleOrigin() {
    this.imgScale = 1;
  }

  // 自适应
  _handleResponsive() {
    this.imgScale = this.responsiveScale;
  }

  _setImgStyle() {
    const scale = this.imgScale;
    const width = this.imgWidth * scale;
    const height = this.imgHeight * scale;
    const left = (this.viewerContainerWidth - width) / 2;
    const top = (this.viewerContainerHeight - height) / 2;

    this.setState({
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
    })
  }

  toolsActionClickHander = (key: string) => {
    if (key === 'zoomOut') {
      this._handleZoomOut();
    }
    if (key === 'zoomIn') {
      this._handleZoomIn();
    }

    if (key === 'origin') {
      this._handleOrigin();
    }

    if (key === 'responsive') {
      this._handleResponsive();
    }

    this._setImgStyle();
  }

  switchImgHandler = (imgInfo: curImgInfoPropsType) => {
    this.setState({
      curImgInfo: imgInfo,
    })
  }


  
  render() {
    return (
      <div className="imgGallery">
        <div className="imgGalleryMain">
          <div className="imgGalleryViewerContainer"></div>
          <div className="imgGalleryTools"></div>
        </div>
        <div className="imgGallerySider"></div>
      </div>
    )
  }
}