import * as React from 'react';
import { imgGalleryViewerPropsType, curImgInfoPropsType } from './ImgGalleryPropTypes';

export default class ImgGalleryViewer extends React.Component<imgGalleryViewerPropsType, any> {
  private enableVerticalMove: boolean = false;
  private enableHorizalMove: boolean = false;
  private viewerContainerWidth: number = 0;
  private viewerContainerHeight: number = 0;
  private imgWidth: number = 0;
  private imgHeight: number = 0;
  private viewerContainer: any;
  private imgNode: any;

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    }
    this.viewerContainer = React.createRef();
    this.imgNode = React.createRef();
  }

  componentDidMount() {
    this._getViewerSize();
    this._loadImg(this.props.curImgInfo)
      .then((imgScale: number) => {
        this.props.initImg(imgScale);
      });

    window.addEventListener('resize', () => {
      this._resize();
    })
  }

  componentWillReceiveProps(nextProps: imgGalleryViewerPropsType) {
    if (this.props.curImgInfo.key !== nextProps.curImgInfo.key) {

      this._loadImg(nextProps.curImgInfo)
        .then((imgScale: number) => {
          nextProps.initImg(imgScale);
        });

    }
  }

  // 获取自适应的图片缩放尺寸
  _getImgResponsiveScale() {
    const viewerContainerWidth = this.viewerContainerWidth;
    const viewerContainerHeight = this.viewerContainerHeight;
    const imgWidth = this.imgWidth;
    const imgHeight = this.imgHeight;
    const horizontalPadding = viewerContainerWidth / 20;

    let responsiveScale = 1;

    if (imgWidth < viewerContainerWidth && imgHeight < viewerContainerHeight) {
      const width = viewerContainerWidth - (horizontalPadding * 2);

      if (width <= imgWidth) {
        responsiveScale = width / imgWidth;
      }
    } else if ((imgWidth / viewerContainerWidth) > (imgHeight / viewerContainerHeight)) {
      const width = viewerContainerWidth - (horizontalPadding * 2);
      responsiveScale = width / imgWidth;
    } else {
      const height = viewerContainerHeight - ((viewerContainerHeight / 20) * 2);
      responsiveScale = height / imgHeight;
    }

    return responsiveScale;
  }
  // 获取视图面板的宽高
  _getViewerSize() {

    if (this.viewerContainer) {
      const containerNode = this.viewerContainer.current;

      this.viewerContainerWidth = containerNode.offsetWidth;
      this.viewerContainerHeight = containerNode.offsetHeight;
    }

  }

  // 加载图片,加载成功后，渲染新图片
  _loadImg(curImgInfo: curImgInfoPropsType) {

    this.setState({ loading: true });

    return new Promise((resolve) => {
      const tempImg = new Image();

      tempImg.onload = () => {
        this.imgWidth = tempImg.width;
        this.imgHeight = tempImg.height;

        const imgScale = this._getImgResponsiveScale();

        this.setState({ loading: false });

        resolve(imgScale);
      }

      tempImg.src = curImgInfo.src;
    })
  }

  // 获取尺寸、定位
  _getStyle() {
    const { imgScale } = this.props;

    const width = this.imgWidth * imgScale;
    const height = this.imgHeight * imgScale;

    const left = (this.viewerContainerWidth - width) / 2;
    const top = (this.viewerContainerHeight - height) / 2;

    this.enableHorizalMove = width > this.viewerContainerWidth;
    this.enableVerticalMove = height > this.viewerContainerHeight;

    const style = {
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
      cursor: this.enableHorizalMove || this.enableVerticalMove ? 'move' : 'auto',
    }

    return style;
  }
  _getPosition(node: any) {
    let left = node.offsetLeft;
    let top = node.offsetTop;
    let current = node.offsetParent; // 取得元素的offsetParent
    // 一直循环直到根元素
    while (current != null) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }
    return { left, top };
  }
  // 移动图片
  handleImgMove = (e: any) => {
    const target = e.target;
    if (!this.enableHorizalMove && !this.enableVerticalMove) {
      return;
    }

    const position = this._getPosition(target);
    let isMoving = true;

    const disX = e.clientX - position.left;
    const disY = e.clientY - position.top;

    document.onmousemove = (moveEvent: any) => {
      moveEvent.preventDefault();
      if (!isMoving) return;

      const viewerContainer = this.viewerContainer.current;
      const pPosition = this._getPosition(viewerContainer);

      function getLeft() {
        return Math.min(
          Math.max(
            viewerContainer.offsetWidth - target.width - 10, moveEvent.clientX - disX - pPosition.left
          ), 10
        );
      }

      function getTop() {
        return Math.min(
          Math.max(
            viewerContainer.offsetHeight - target.height - 10, moveEvent.clientY - disY - pPosition.top
          ), 10
        );
      }

      let left;
      let top;

      if (this.enableHorizalMove && this.enableVerticalMove) {
        left = `${getLeft()}px`;
        top = `${getTop()}px`;
      } else if (this.enableHorizalMove) {
        left = `${getLeft()}px`;
      } else if (this.enableVerticalMove) {
        top = `${getTop()}px`;
      }

      const img = this.imgNode.current;

      if (left) {
        img.style.left = left;
      }

      if (top) {
        img.style.top = top;
      }

    }

    document.onmouseup = () => {
      isMoving = false;
    }

  }

  _resize() {
    this._getViewerSize();
    const imgNewScale = this._getImgResponsiveScale();
    this.props.initImg(imgNewScale);
  }

  render() {
    const style = this._getStyle();

    return (
      <div ref={this.viewerContainer} className="imgGalleryViewerContainer">
      {
        this.state.loading ? (
            <p className="loading">图片加载中...</p>
        ) : (
              <img
                src={this.props.curImgInfo.src}
                style={style}
                onMouseDown={this.handleImgMove}
                ref={this.imgNode}
              />
        )
      }
        
      </div>
    )
  }
}