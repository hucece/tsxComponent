import * as React from 'react';
import { curImgInfoPropsType, imgGalleryDataSourcePropsType } from './ImgGalleryPropTypes';
import ThumbList from './ThumbList';
import ImgGalleryTools, { actionsMapping } from './ImgGalleryTools';
import ImgGalleryViewer from './ImgGalleryViewer';
import { createRandomStr } from '../../utils/utils';
import './index.css';

const scaleList = [0.1, 0.25, 0.33, 0.5, 0.65, 0.8, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4];

export default class ImgGallery extends React.Component<imgGalleryDataSourcePropsType, any> {
  private responsiveScale: number;
  private imgList: Array<curImgInfoPropsType>;

  constructor(props: any){
    super(props);
    const { curImgInfo, imgList, indexNum } = this._formatImgList();
    this.imgList = imgList;
    this.state = {
      curImgInfo,
      imgScale: 1,
      enableZoomIn: true,
      enableZoomOut: false,
      enableOrigin: false,
      enableResponsive: false,
      indexNum: indexNum,
    }
  }

  _formatImgList() {
    const { imgList, curImgIndex } = this.props;
    let curImgInfo = {};
  
    const fixedImgList = imgList.map((imgSrc, index) => {
      const imgInfo = { src: imgSrc, key: createRandomStr(), index: index + 1 };

      if (index === curImgIndex) {
        curImgInfo = imgInfo;
      }
    
      return imgInfo;
    })

    return { curImgInfo, imgList: fixedImgList, indexNum: `${curImgIndex + 1} / ${imgList.length}` };
  }
  
  // 缩小
  _handleZoomOut = () => {
    const pScale = this.state.imgScale;
    const scaleListLength = scaleList.length;
    const tempScaleList = scaleList.slice().reverse();

    const nextImgScale = tempScaleList.find((scale: number, index: number) => {
      return (pScale === scale && index === scaleListLength - 1) || (pScale > scale);
    }) || 1;

    console.log(nextImgScale)
    return nextImgScale;

  }

  // 放大
  _handleZoomIn = () => {
    const pScale = this.state.imgScale;
    const scaleListLength = scaleList.length;

    const nextImgScale = scaleList.find((scale: number, index: number) => {
      return (pScale === scale && index === scaleListLength - 1) || (pScale < scale);
    }) || 1;
  
    return nextImgScale;
  }

  // 原始尺寸
  _handleOrigin = () => {
    return 1;
  }

  // 自适应
  _handleResponsive = () => {
    return this.responsiveScale;
  }
  // 重新设置一些state
  _reAssignState(scale: number) {
    this.setState({
      imgScale: scale,
      enableZoomOut: scale > scaleList[0],
      enableZoomIn: scale < scaleList[scaleList.length - 1],
      enableResponsive: scale !== this.responsiveScale,
      enableOrigin: scale !== 1,
    })
  }
  _getImgGalleryToolsProps() {
    const imgGalleryToolsProps = actionsMapping
      .map((item) => ({ value: this.state[item.propKey], key: item.propKey }))
      .reduce(
        (props, item) => ({ ...props, [item.key]: item.value }), {
          isIndexNumVisible: true,
          toolsActionClickHandler: this.toolsActionClickHandler
        }
      )

    return imgGalleryToolsProps;
  }
 // 处理tool的action点击
  toolsActionClickHandler = (key: string) => {

    interface actionHandlerMappingPropsPrototype {
      zoomOut: () => number;
      zoomIn: () => number;
      origin: () => number;
      responsive: () => number;
      [key: string]: () => number;
    }

    const actionHandlerMapping: actionHandlerMappingPropsPrototype = {
      zoomOut: this._handleZoomOut,
      zoomIn: this._handleZoomIn,
      origin: this._handleOrigin,
      responsive: this._handleResponsive,
    };

    const actionHandler = actionHandlerMapping[key];

    if (typeof actionHandler === 'function') {
      const nextImgScale: number = actionHandler();

      this._reAssignState(nextImgScale);
    }
    
  }
  // 切换图片
  switchImgHandler = (imgInfo: curImgInfoPropsType) => {
    this.setState({
      curImgInfo: imgInfo,
      indexNum: `${imgInfo.index} / ${this.imgList.length}`
    })
  }
 
  // 初始化图片
  initImg = (scale: number) => {
    this._reAssignState(scale);
    this.responsiveScale = scale;
  }

  render() {
    const { enableResponsive, enableOrigin, enableZoomIn, enableZoomOut, indexNum, imgScale, curImgInfo } = this.state;

    return (
      <div className="imgGallery">
        <div className="imgGalleryMain">
          <ImgGalleryViewer
            imgScale={imgScale}
            curImgInfo={curImgInfo}
            initImg={this.initImg}
          />
          <ImgGalleryTools
            enableOrigin={enableOrigin}
            enableResponsive={enableResponsive}
            enableZoomIn={enableZoomIn}
            enableZoomOut={enableZoomOut}
            isIndexNumVisible={true}
            indexNum={indexNum}
            toolsActionClickHandler={this.toolsActionClickHandler}
          />
        </div>
        <div className="imgGallerySider">
          <ThumbList 
            imgList={this.imgList} 
            curImgInfo={curImgInfo} 
            switchImgHandler={this.switchImgHandler} 
          />
        </div>
      </div>
    )
  }
}