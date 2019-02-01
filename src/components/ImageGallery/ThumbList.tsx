import * as React from 'react';
import { curImgInfoPropsType, thumbListPropsType  } from './ImgGalleryPropTypes';

export default class ThumbList extends React.Component<thumbListPropsType, any> {

  thumbItemClick = (e: any) => {
    const target = e.target.nodeName;

    if (['LI', 'IMG'].indexOf(target.nodeName) > -1) {
      return;
    }

    const { imgList, switchImgHandler } = this.props;

    const nextimgInfo = imgList.filter((item: curImgInfoPropsType) => item.key === target.key)[0];

    switchImgHandler(nextimgInfo);
  }
  getThumbList() {
    const { imgList, curImgInfo } = this.props;

    return imgList.map((item: curImgInfoPropsType) => {
      const { src, key } = item;
      let classname = 'thumbItem';

      if (curImgInfo.key === key) {
        classname += ' thumbItemActive';
      }

      return (
        <li key={key} className={classname}>
          <img src={src} key={key} />
        </li>
      )
    })
  }
  
  render() {

    return (
      <ul className="thumbListContainer">
        {this.getThumbList()}
      </ul>
    )
  }
}