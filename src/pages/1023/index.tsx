import { useState } from 'react';
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

export default function Uploads(props: any) {
  const onChange = ({ fileList: newFileList }: any) => {
    console.log('fileList', newFileList);

    // setFileList(newFileList);
  };

  // const onPreview = async file => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onChange={onChange}
        // onPreview={onPreview}
      >
        上传图片
      </Upload>
    </div>
  );
}
