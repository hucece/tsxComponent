import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImgGallery from './components/ImgGallery/index';

const imgList = [
  'https://pic2.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1200x500.jpg',
  'https://user-gold-cdn.xitu.io/2019/2/18/168fe755f2dd3975?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  'http://d.hiphotos.baidu.com/lvpics/w=1000/sign=e2347e78217f9e2f703519082f00eb24/730e0cf3d7ca7bcb49f90bb1b8096b63f724a8aa.jpg'
]
 
ReactDOM.render(
  <ImgGallery imgList={imgList} curImgIndex={0}/>,
  document.getElementById('root') as HTMLElement
);
