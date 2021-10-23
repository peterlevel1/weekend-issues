import { useState, ReactElement, ReactNode } from 'react';
import { Upload, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { CloseOutlined, PlayCircleOutlined, UploadOutlined, StarOutlined } from '@ant-design/icons';
import './index.less';

const HTTP_PREFIX = 'http://172.20.10.2:7001';
const TYPES_VIDEO = ['mp4'];
const TYPES_IMAGE = ['png', 'jpg', 'jpeg', 'bpm'];

async function getBase64(file: any) {
  const image = new Image();
  image.src = file?.url;
  image.crossOrigin = 'anonymous';
  image.onload = (ev) => {
    image.onload = null;

  }
}

export default function Uploads(props: any) {
  const [ fileList, setFileList ] = useState<any>(() => [
    {
      uid: uuidv4(),
      status: 'done',
      name: '1634972484509587.mp4',
      url: HTTP_PREFIX + '/public/tmp/6a2fe1d8-9a03-4528-9544-cc865dfb3d49-1634972484509587.mp4',
      percent: 100,
      response: {
        success: true,
        data: {
          pathname: '/public/tmp/6a2fe1d8-9a03-4528-9544-cc865dfb3d49-1634972484509587.mp4',
        }
      }
    }
  ]);

  const onChange = async ({ file, fileList: newFileList }: any) => {
    setFileList(newFileList);

    if (file.status !== 'done') {
      return;
    }

    const type = getFileType(file.name);
    if (TYPES_IMAGE.includes(type)) {
      return;
    }
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
  //   imgWindow?.document.write(image.outerHTML);
  // };

  return (
    <div style={{ padding: 24 }}>
      <Upload
        action={`${HTTP_PREFIX}/api/upload`}
        listType="picture-card"
        onChange={onChange}
        fileList={fileList}
        name="File"
        itemRender={itemRender}
        // onPreview={onPreview}
      >
        上传图片
      </Upload>
    </div>
  );
}

function getFileType(name: string): string {
  return (name.replace(/[\S\s]+?\.([\w]+)$/, '$1') || '').toLowerCase();
}

function itemRender(originNode: any, file: any, fileList: any[], actions: any) {
  const type = getFileType(file.name);
  console.log('type', type);
  if (TYPES_VIDEO.includes(type)) {
    return renderVideo(file, actions);
  }

  return originNode;
}

function renderVideo(file: any, actions: any): any {
  const [ visible, setVisible ] = useState<boolean>(false);
  const openMask = () => setVisible(true);
  const closeMask = () => setVisible(false);

  const [ iconDelVisible, setIconDelVisible ] = useState<boolean>(false);
  const showIconDel = () => setIconDelVisible(true);
  const hideIconDel = () => setIconDelVisible(false);

  const src = !file?.response ? '' : `${HTTP_PREFIX}${file?.response?.data?.pathname}`;
  console.log('file', file);

  const clsIconDel = classNames('video-element-icon-del', {
    active: iconDelVisible
  });

  return (
    <span
      className='video-element'
      onMouseEnter={showIconDel}
      onMouseLeave={hideIconDel}
    >
      <span className='video-element-layer-video'>
        {
          !src ? null :
          <video src={src} preload='preload'>
            不支持video标签
          </video>
        }
      </span>
      <span className='video-element-layer-play'>
        <PlayCircleOutlined />
      </span>
      <span
        className='video-element-layer-mask'
        onClick={openMask}
      />
      <span
        className={clsIconDel}
        onClick={(ev) => {
          ev.stopPropagation();
          actions.remove();
        }}
      >
        <CloseOutlined />
      </span>
      <Modal
        title='老妹儿的视频'
        visible={visible}
        onCancel={closeMask}
        onOk={closeMask}
        maskClosable
        footer={null}
      >
        <div className='video-element-modal-mask'>
          <video src={src} preload='preload' controls>
            不支持video标签
          </video>
        </div>
      </Modal>
    </span>
  );
}
