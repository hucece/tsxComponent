import * as React from 'react';
import { imgGalleryViewerPropsType } from './ImgGalleryPropTypes';

export default class ImgGalleryViewer extends React.Component<imgGalleryViewerPropsType> {
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

  state = {
    imgStyle: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    imgSrc: '',
    loading: false,
  }

  componentDidMount() {
    this.viewerContainer = React.createRef();
    this.getViewerSize();
  }

  init() {

  }

  // 获取自适应的图片缩放尺寸
  getImgResponsiveScale() {
    const viewerContainerWidth = this.viewerContainerWidth;
    const viewerContainerHeight = this.viewerContainerHeight;
    const imgWidth = this.imgWidth;
    const imgHeight = this.imgHeight;
    const horizontalPadding = viewerContainerWidth / 20;

    let responsiveScale = 1;

    if (imgWidth < viewerContainerWidth && imgHeight < viewerContainerHeight) {
      const width = viewerContainerWidth - (horizontalPadding * 2);

      if (width <= imgWidth) {
        this.responsiveScale = width / imgWidth;
      }
    } else if ((imgWidth / viewerContainerWidth) > (imgHeight / viewerContainerHeight)) {
      const width = viewerContainerWidth - (horizontalPadding * 2);
      this.responsiveScale = width / imgWidth;
    } else {
      const height = viewerContainerHeight - ((viewerContainerHeight / 20) * 2);
      this.responsiveScale = height / imgHeight;
    }

    this.imgScale = this.responsiveScale;
  }
  // 设置图片的style
  setImgStyle() {
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
  // 获取视图面板的宽高
  getViewerSize() {

    if (this.viewerContainer) {
      const containerNode = this.viewerContainer.current;

      this.viewerContainerWidth = containerNode.offsetWidth;
      this.viewerContainerHeight = containerNode.offsetHeight;
    }

  }

  // 加载图片,加载成功后，渲染新图片
  loadImg() {
    const { curImgInfo } = this.props;
    const tempImg = new Image();

    this.setState({ loading: true })
  
    tempImg.onload = () => {
      this.imgWidth = tempImg.width;
      this.imgHeight = tempImg.height;
    }

    tempImg.src = curImgInfo.src;
  }



  render() {
    return (
      <div ref={this.viewerContainer} className="imgGalleryViewer">
        <img src={this.state.imgSrc} />
      </div>
    )
  }
}