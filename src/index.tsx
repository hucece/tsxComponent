import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImgGallery from './components/ImgGallery/index';

const imgList = [
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p1.gif',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p2.jpg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p3.jpg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p4.jpg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p5.jpeg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p6.jpg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p7.jpg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p8.jpeg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p9.jpeg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p10.jpeg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p11.jpeg',
  'https://raw.githubusercontent.com/hucece/tsxComponent/master/photos/p12.jpeg',
]
 
ReactDOM.render(
  <ImgGallery imgList={imgList} curImgIndex={0}/>,
  document.getElementById('root') as HTMLElement
);
