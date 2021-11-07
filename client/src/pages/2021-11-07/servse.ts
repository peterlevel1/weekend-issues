import request from "_umi-request@1.4.0@umi-request";

export function Uploads(pamas: any) {
  return request.post('http://172.20.10.2:7001/api/upload',{
    body:pamas
  })
}

