import { useState, useEffect, createContext, ReactElement } from 'react';
import request from 'umi-request';

export interface LayoutProps {
  children: any;
}

export interface CardItemProps {
  id: string;
  title: string;
  desc: string;
};

export const ContextCardList = createContext<CardItemProps[] | []>([]);

const CARD_LIST_PROPS: CardItemProps[] = [
  {
    title: ' 周一',
    id: '111',
    desc: '周一周一周一'
  },
  {
    title: ' 周二',
    id: '222',
    desc: '周二周二周二'
  },
  {
    title: ' 周三',
    id: '333',
    desc: '周三周三周三'
  },
  {
    title: ' 周四',
    id: '444',
    desc: '周四周四周四'
  },
  {
    title: ' 周五',
    id: '555',
    desc: '周五周五周五'
  },
];

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const [ cardList, setCardList ] = useState([]);

  useEffect(() => {
    ;(async () => {
      // 请求 cardList，然后 setCardList(response cardList);
      const resCardList = await request.get('/api/2021-11-28/card-list');
      console.log('resCardList', resCardList);

      if (resCardList.success && resCardList?.data.length > 0) {
        setCardList(resCardList.data);
      }
    })();
  }, []);

  console.log('Layout - cardList', cardList);

  return (
    <ContextCardList.Provider value={cardList}>
      {/* <ContextCardList2.Provider value={cardList}> */}
      {/* <ContextCardList3.Provider value={cardList}> */}
      <div>
        <h1>--- 小徐的 weekend issues 项目 ---</h1>
        {children}
      </div>
      {/* </ContextCardList3.Provider> */}
      {/* </ContextCardList2.Provider> */}
    </ContextCardList.Provider>
  );
}
