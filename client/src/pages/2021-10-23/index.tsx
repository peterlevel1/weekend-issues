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
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function Uploads(props: any) {
  const [fileList, setFileList] = useState<any>([]);

  // image preview
  // ---------------------

  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const handlePreviewCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    console.log('handlePreview');
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview),
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  };

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

  return (
    <div className='upload-container'>
      <>
        <Upload
          accept='.mp4,.png,.jpg,.jpeg,.bpm'
          action={`${HTTP_PREFIX}/api/upload`}
          listType="picture-card"
          onChange={onChange}
          fileList={fileList}
          name="file"
          itemRender={itemRender}
          onPreview={handlePreview}
        >
          上传图片
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handlePreviewCancel}
          >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
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
  const [visible, setVisible] = useState<boolean>(false);
  const openMask = () => setVisible(true);
  const closeMask = () => setVisible(false);


  const [ iconDelVisible, setIconDelVisible ] = useState<boolean>(false);
  const showIconDel = () => setIconDelVisible(true);
  const hideIconDel = () => setIconDelVisible(false);

  const src = !file?.response ? '' : `${HTTP_PREFIX}${file?.response?.data?.pathname}`;

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
