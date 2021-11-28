import { mock } from 'mockjs';

export default {
  'GET /api/2021-11-28/card-list': (req: any, res: any) => {
    res.type = 'json';
    res.send(mock({
      success: true,
      'data|10': [
        {
          'id|+1': 1,
          'title': '@cname',
          'desc': '@cparagraph'
        }
      ]
    }));
  }
}
