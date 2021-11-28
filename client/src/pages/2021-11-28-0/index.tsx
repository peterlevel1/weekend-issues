import { useContext } from 'react';
import { useParams } from 'umi';
import { CardItemProps, ContextCardList } from '../index';

export default function XiaoXu_2021_11_28_0() {
  const params = useParams<CardItemProps>();
  const cardList = useContext(ContextCardList);

  if (!cardList.length) {
    return (
      <div>
        <h2>XiaoXu_2021_11_28_0:</h2>
        <h3>[no cardItem]</h3>
      </div>
    );
  }

  const cardItem: CardItemProps = cardList.find(one => (`${one.id}` === params.id)) as CardItemProps;

  return (
    <div>
      <h2>XiaoXu_2021_11_28_0:</h2>
      <h3>id: {cardItem.id}</h3>
      <h3>title: {cardItem.title}</h3>
      <h3>desc: {cardItem.desc}</h3>
    </div>
  )
}
