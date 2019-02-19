import * as React from 'react';
import { imgGalleryToolsPropsType } from './ImgGalleryPropTypes';
import '../../asserts/font/iconfont.css';

export const actionsMapping = [{
  key: "zoomOut",
  title: '缩小',
  propKey: 'enableZoomOut',
  iconfontclassname: 'icon-minus',
}, {
  key: "zoomIn",
  title: '放大',
  propKey: 'enableZoomIn',
  iconfontclassname: 'icon-plus',
}, {
  key: "origin",
  title: '原始尺寸',
  propKey: 'enableOrigin',
  iconfontclassname: 'icon-appstore',
}, {
  key: "responsive",
  title: '自适应',
  propKey: 'enableResponsive',
  iconfontclassname: 'icon-credit-card-scan',
}]

export default class ImgGalleryTools extends React.Component<imgGalleryToolsPropsType, any> {
  toolsActionClick = (e: any) => {
    const target = e.target;
    if (['A', 'I'].indexOf(target.nodeName) > -1 && target.dataset.enable === 'true') {
      const key = target.dataset.key;
      this.props.toolsActionClickHandler(key);
    }
  }

  getClassName(enable: boolean) {
    return `toolActionItem ${enable ? '' : 'disableToolAction'}`;
  }

  render() {
    const { isIndexNumVisible } = this.props;
    const actionList = actionsMapping.map((item) => {
      const { key, title, propKey, iconfontclassname } = item;
      const enable = this.props[propKey];
      return { key, title, className: this.getClassName(this.props[propKey]), iconfontclassname, enable }
    })

    return (
      <div className="imgGalleryTools">
        {
          isIndexNumVisible && <div className="toolIndexNum">{this.props.indexNum}</div>
        }
        <div onClick={this.toolsActionClick} className="toolActions">
          {
            actionList.map(props =>
              <a
                href="javascript:;"
                {...props}
                data-enable={props.enable}
                data-key={props.key}
              >
                <i
                  className={`iconfont ${props.iconfontclassname}`}
                  data-enable={props.enable}
                  data-key={props.key}
                />
              </a>
            )
          }
        </div>
      </div>
    )
  }
}