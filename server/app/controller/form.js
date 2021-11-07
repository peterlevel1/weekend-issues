exports.businessCheck = async (ctx) => {
  ctx.body = {
    success: true,
    message: '',
    result: {
      "id": "xx-bussinessCheck-0",
      "picture": [
        {
          "uid": "rc-upload-1636273296958-3",
          "lastModified": 1634955198550,
          "lastModifiedDate": "2021-10-23T02:13:18.550Z",
          "name": "IMG_2794.jpeg",
          "size": 4637785,
          "type": "image/jpeg",
          "percent": 100,
          "originFileObj": {
            "uid": "rc-upload-1636273296958-3"
          },
          "status": "done",
          "response": {
            "success": true,
            "result": [
              "http://172.20.10.2:7001/public/tmp/b73f7d20-5776-479e-9ea1-d870d950a6c6-IMG_2794.jpeg"
            ]
          },
          "url": "http://172.20.10.2:7001/public/tmp/b73f7d20-5776-479e-9ea1-d870d950a6c6-IMG_2794.jpeg"
        }
      ],
      "video": [
        {
          "uid": "rc-upload-1636273296958-5",
          "lastModified": 1634972485915,
          "lastModifiedDate": "2021-10-23T07:01:25.915Z",
          "name": "1634972484509587.mp4",
          "size": 500441,
          "type": "video/mp4",
          "percent": 100,
          "originFileObj": {
            "uid": "rc-upload-1636273296958-5"
          },
          "status": "done",
          "response": {
            "success": true,
            "result": [
              "http://172.20.10.2:7001/public/tmp/ee94e423-2010-4e7d-91d6-5be92b9defc3-1634972484509587.mp4"
            ]
          },
          "url": "http://172.20.10.2:7001/public/tmp/ee94e423-2010-4e7d-91d6-5be92b9defc3-1634972484509587.mp4"
        }
      ],
      "conclusion": "小徐的代码有点傻"
    }
  };
}
