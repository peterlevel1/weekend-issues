import React, { useState, useEffect } from 'react';
// import { ProCard, ModalForm } from '@alipay/tech-ui';
import {
  Card,
  Form,
  Button,
  Alert,
  Upload,
  Input,
  Tag,
  Divider,
  message,
  Modal,
  Timeline
} from 'antd';
import { CheckSquareFilled, UploadOutlined, InfoCircleOutlined, VerticalAlignBottomOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
// import { getCommonUser } from '@/common/util';
import  Picture  from './picture'
import  Video  from './video'
import { normalizeFile } from './xx-upload';
// import styles from './index.less';

export default function uplaoding() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currState, setCurrState] = useState<string>('待提交验收材料');
  const [tagState, setTagState] = useState({ title: '验收中', color: 'gold' });
  const [stepState, setStepState] = useState([
    {
      title: '等待需求方完成验收...',
      date: '',
      value: '',
    }
  ]);
  const [visible, setVisible] = useState<boolean>(true);
  const [jump, setJump] = useState<string>('block');
  // const [imgList, setImgList] = useState<any>([]);
  console.log(currState);


  // const [imgList, setImgList] = useState<any>(() => [
  //   {
  //     response: {
  //       result: [
  //         'https://gw-office.alipayobjects.com/pcmngsff_prod/1dfb61eb-d7ef-4cae-b236-ba70d9472073.mp4',
  //       ],
  //       success: true,
  //     },
  //     size: 385342,
  //     name: 'normal video.mp4',
  //     status: 'done',
  //     type: 'video/mp4',
  //     uid: 'rc-upload-1635239792206-6',
  //   },
  // ]);

  // 驳回按钮
  const bohuibtn = () => {
    setModalVisible(true);
    setJump('bendan');
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const turnDown = (value: any): void => {
    console.log('获取value，调接口rejectBizCheck', value.turnDown);
    setJump('turnDown');
    setModalVisible(false);
    message.success('已驳回！');
    const a: string = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm');
    // const n = getCommonUser().operatorRealName;
    const n ='徐汪洋';
    setStepState(stepState.concat({ title: `${n}   驳回了结论`, date: a, value: value.turnDown }));
    setTagState({ title: '验收不通过', color: 'red' });
    form.resetFields();
  };

  // 验收通过
  const pass = () => {
    console.log('验收通过，调接口agreeBizCheck');
    setJump('true');
    setTagState({ title: '验收通过', color: 'green' });
    const a: string = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm');
    // const n = getCommonUser().operatorRealName;
    const n = '徐汪洋';
    setStepState(stepState.concat({ title: `${n}   验收通过`, date: a, value: '' }));
    message.success('操作成功！下一步将进行需求发布');
  };

  const extra = [
    // visible && jump === 'block' && (
    //   <ModalForm
    //     key="1"
    //     title="确认要跳过验收吗？"
    //     trigger={<Button>跳过验收</Button>}
    //     width="500px"
    //     submitter={{
    //       searchConfig: {
    //         submitText: '确认',
    //         resetText: '取消',
    //       },
    //     }}
    //     onFinish={async () => {
    //       setJump('none');
    //       setTagState({ title: '验收通过', color: 'green' });
    //       const a: string = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm');
    //       // const n = getCommonUser().operatorRealName;
    //       const n = '徐汪洋';
    //       setStepState([{ title: `${n}   完成了验收，验收结论为 “验收通过”`, date: a, value: '' }]);
    //       console.log('调接口skipBizCheck');

    //       return true;
    //     }}
    //   >
    //     <p>若确认跳过验收，将视为“验收通过”，之后将直接进入发布需求环节。</p>
    //   </ModalForm>
    // ),

    jump === 'none' ? (
      <Button key="2" type="primary" disabled={true}>
        通过验证
      </Button>
    ) : (
      <Button
        key="2"
        type="primary"
        disabled={!visible}
        style={{ margin: '0 8px' }}
        onClick={form.submit}
      >
        提交材料
      </Button>
    ),
    visible || jump === 'true' ? (
      ''
    ) : (
      <Button
        key="4"
        danger
        style={{ marginRight: 8 }}
        disabled={jump === 'turnDown' ? true : false}
        onClick={bohuibtn}
      >
        {jump === 'turnDown' ? '已驳回' : '驳回'}
      </Button>
    ),

    visible || jump === 'turnDown' ? (
      ''
    ) : (
      <Button key="5" type="primary" onClick={pass} disabled={jump === 'true' ? true : false}>
        通过验收
      </Button>
    ),
  ];

  // 提交按钮
  const onFinish = (value: any): any => {

    console.log('onfinish-value', value);
    console.log('------------------------');

    console.log('onfinish JSON value', JSON.stringify(value, null, 2));
    console.log('------------------------');

    setVisible(false);
    console.log(visible);
    setCurrState('验收结论待批复');
    const a: string = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm');
    // const n = getCommonUser().operatorRealName;
    const n = '徐汪洋';
    setStepState([{ title: `${n}   提交了验收材料`, date: a, value: '' }, { title: '等待技术同学批复验收结论', date: '', value: '' }]);

    message.success('提交成功！等待技术同学批复验收结论');
  };

  useEffect(() => {
    (async () => {
      // 1. 获取表单数据
      // const resForm = await service.getFormData();
      const resForm: any = await fetch('http://172.20.10.2:7001/api/form/business-check.json', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 'xx-clever-0' })
      })
      .then(res => res.json());
      console.log('resForm', resForm);
     // 2. 设置表单数据
     // resForm.result: 就是你当时传给后段的数据
     form.setFieldsValue(resForm.result);
    })();
  }, []);

  return (
    <>
      <Card
        key="11"
        extra={extra}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckSquareFilled style={{ color: '#48B48A', fontSize: 24 }} />
            <span style={{ marginRight: 8, marginLeft: 8 }}>业务验收</span>
            <Tag color={tagState.color}>{tagState.title}</Tag>
          </div>
        }
        // headerBordered
      >
        {jump !== 'none' && jump !== 'true' && (
          <Alert
            // className={styles.alertIcon}
            message={
              <div>
                TIPS:
                <br />
                1)
                完成复核后，部分需求需要运营同学提交业务验收材料（视频或图片），并填写验收结论，之后点击“提交材料”；
                <br />
                2)
                需求中台团队收到后，需要对材料对准确性和结论进行审批，若通过则点击“通过验收”，否则点击“驳回”。
              </div>
            }
            type="info"
            showIcon
          />
        )}

        <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            name="picture"
            label="图片材料"
            style={{ marginTop: 50 }}
            valuePropName="fileList"
            getValueFromEvent={normalizeFile}
          >
            <Picture form={form} />
          </Form.Item>

          <Form.Item
            name="video"
            label="视频材料"
            style={{ marginTop: 50 }}
            valuePropName="fileList"
            getValueFromEvent={normalizeFile}
          >
            <Video form={form} />
          </Form.Item>

          <Form.Item style={{ marginTop: 50 }} name="conclusion" label="验收结论描述">
            {!visible || jump === 'none' ? (
              <p>{'发射场哦武汉的从我家从事的'}</p>
            ) : (
              <Input.TextArea showCount maxLength={999} style={{ width: 500 }} />
            )}
          </Form.Item>

          <Divider />
          {stepState.map((item: any) => (
            <Timeline key={item.date + item.title}>
              <Timeline.Item color="gray">
                <span style={{ marginRight: 20, fontSize: 12, color: 'gray' }}>{item.title}</span>
                <span style={{ fontSize: 12, color: 'gray' }}>{item.date}</span>
                {
                  item.value && (
                    <>
                      <Alert message={item?.value} type="error" showIcon style={{ width: 500, margin: '10px 0' }} />
                      <p style={{ fontSize: 12, color: 'gray' }}>
                        <InfoCircleOutlined style={{ color: 'gray', marginRight: 5 }} />
                        <a>返回上一步</a>
                        修改后，可重新发起验收
                      </p>
                    </>
                  )
                }
              </Timeline.Item>

            </Timeline>
          ))}
        </Form>
      </Card>

      <Modal title="驳回结论" visible={modalVisible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} preserve={false} onFinish={turnDown} layout="vertical">
          <Form.Item name="turnDown" label="填写原因:">
            <Input.TextArea showCount maxLength={140} />
          </Form.Item>
          <p style={{ fontSize: 12, color: '#9B9A9A', marginTop: -18 }}>
            {' '}
            需求方将收到驳回原因，并据此进行修改
          </p>
        </Form>
      </Modal>
    </>
  );
}
