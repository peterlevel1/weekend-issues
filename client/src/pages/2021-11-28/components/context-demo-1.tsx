// ---------------------------------
// 点击Card‘查看详情’ -> 跳转页面，把title信息传递给下一个页面作为标题；
// ---------------------------------

import { useContext } from 'react';
import { Card, Button } from 'antd';
import { history } from 'umi';
import { ContextCardList } from '../../index';

export interface CardItemExtraProps {
  id: string;
}

function CardItemExtra(props: CardItemExtraProps) {
  const { id } = props;

  return (
    <Button onClick={() => history.push(`/2021-11-28-0/${id}`)}>
      查看详情
    </Button>
  );
}

export default function ContextDemo1() {
  const cardList = useContext(ContextCardList);
  console.log('ContextDemo1: cardList', cardList);

  return (
      <div>
        {
          cardList.map((item: any) => {
            return (
              <Card
                key={item.id}
                size="small"
                title={item.title}
                extra={<CardItemExtra id={item.id} />}
                style={{ width: 300 }}
              >
                <p>{item.desc}</p>
              </Card>
            )
          })
        }
      </div>
  );
}
