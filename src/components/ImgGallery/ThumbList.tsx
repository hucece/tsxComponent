import * as React from 'react';
import { curImgInfoPropsType, thumbListPropsType } from './ImgGalleryPropTypes';

export default class ThumbList extends React.Component<thumbListPropsType, any> {

  thumbItemClick = (e: any) => {
    const target = e.target;

    if (['LI', 'IMG'].indexOf(target.nodeName) === -1) {
      return;
    }

    const { imgList, switchImgHandler, curImgInfo } = this.props;
    const targetKey = target.dataset.key;

    const nextimgInfo = imgList.filter((item: curImgInfoPropsType) => item.key === targetKey)[0];

    if (nextimgInfo.key === curImgInfo.key) {
      return;
    }

    switchImgHandler(nextimgInfo);
  }
  getThumbList() {
    const { imgList, curImgInfo } = this.props;

    return imgList.map((item: curImgInfoPropsType) => {
      const { src, key } = item;
      let classname = 'thumbItem';

      const isActive = curImgInfo.key === key;

      if (isActive) {
        classname += ' thumbItemActive';
      }

      return (
        <li key={key} className={classname} data-key={key}>
          <img src={src} key={key} data-key={key} />
        </li>
      )
    })
  }

  render() {

    return (
      <ul className="thumbListContainer" onClick={this.thumbItemClick}>
        {this.getThumbList()}
      </ul>
    )
  }
}