export interface curImgInfoPropsType {
  key?: string,
  src?: string,
  index?: number,
}

export interface thumbListPropsType {
  // 图片列表
  imgList: Array<curImgInfoPropsType>,
  // 现在图片的信息
  curImgInfo: curImgInfoPropsType,
  // 切换图片
  switchImgHandler: (imgInfo: curImgInfoPropsType) => any,
}

export interface imgGalleryToolsPropsType {
  // 缩小
  enableZoomOut: boolean,
  // 放大
  enableZoomIn: boolean,
  // 自适应
  enableResponsive: boolean,
  // 原始尺寸
  enableOrigin: boolean,
  // 点击工具栏的按钮
  toolsActionClickHandler: (arg: string) => any,
  // 序号是否可见
  isIndexNumVisible?: boolean,
  // 序号
  indexNum?: number,
}

export interface imgGalleryViewerPropsType {
  // 图片缩放尺寸
  imgScale: number,
  // 当前图片的信息
  curImgInfo: curImgInfoPropsType,
}