import React from 'react';
import {
  Button,
  Upload,
  message,
} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Uploads } from './servse';

// truthy: 类真值的 !!truthy -> true, 有东西的
// falsy: 类价值的, !!falsy -> false, ('', false, 0, null, undefined, NaN)

// // 视频类型
export const TYPES_VIDEO = ['.mp4'];
// 图片类型
export const TYPES_IMAGE = ['.png', '.jpg', '.jpeg'];
// 2个文件
export const maxCount = 2;
// 文件最大总和为5M
export const maxFileSize = 5;
// 上传的域名前缀
export const UPLOAD_PREFIX = 'http://172.20.10.2:7001';

export const normalizeFile = (e: any) => {
  const ret = Array.isArray(e) ? e : e && e.fileList;

  if (Array.isArray(ret)) {
    if (ret.length > maxCount) {
      return ret.slice(0, maxCount);
    }

    const LT2M = ret.reduce((memo: number, file: any) => {
      const result = memo + file.size;
      return result;
    }, 0);

    if (LT2M > (maxFileSize * 1024 * 1024)) {
      return ret.slice(0, ret.length - 1);
    }
  }

  return ret;
};

export default function XXUpload(props: any) {
  const { type, accept, form, fileList, onChange } = props;

  return (
    <Upload
      accept={accept}
      fileList={fileList}
      onChange={({ fileList }) => {
        const arr = fileList.map(file => {
          const url = file.url || file?.response?.result[0];
          if (url && !file.url) {
            file.url = url;
          }
          return file;
        });

        onChange(arr);
      }}
      onDownload={(file) => {
        const url = `${file.response.result[0]}`;
        window.open(url);
        return url;
      }}
      showUploadList={{
        showDownloadIcon: true,
        downloadIcon: (file) => (
          <a
            download
            href={`${UPLOAD_PREFIX}${file.response.result[0]}`}
            target='_blank'
          >
            download
          </a>
        ),
        showRemoveIcon: true,
        removeIcon: <DeleteOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
      }}
      customRequest={async (option: any) => {
        const { file, onError, onSuccess } = option;
        const value = form.getFieldValue(type);
        console.log('customRequest: value', value);
        console.log('customRequest: maxCount', maxCount);

        const last = value[value.length - 1];

        if (
          value.length >= maxCount &&
          (
            last.response ||
            last.percent > 0 ||
            last.status === 'done' ||
            last.status === 'pending' ||
            last.status === 'error'
          )
        ) {
          message.warn('最多上传' + maxCount + '张图片');
          onError('');
          return;
        }

        const LT2M = value.reduce((memo: number, file: any) => {
          const result = memo + file.size;
          return result;
        }, 0);

        console.log('LT2M', LT2M);

        if (LT2M > (maxFileSize * 1024 * 1024)) {
          message.warn('图片总大小不能超过' + maxFileSize + 'M');
          onError('');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const resUpload = await Uploads(formData);
        onSuccess(resUpload);
      }}
    >
      <Button icon={<UploadOutlined />}>
        {type === 'picture' ? '上传图片' : '上传视频'}
      </Button>
      <p style={{ fontSize: 12, color: '#9B9A9A', marginTop: 8 }}>
        {
          type === 'picture' ?
            `支持扩展名：${accept} 大小20MB以内对图片文件，最多20张` :
            `支持扩展名：${accept} 大小20MB以内对视频文件，最多10张`
        }
      </p>
    </Upload>
  )
};
