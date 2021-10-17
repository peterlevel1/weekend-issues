export default () => {
  const list = ['时尚', '事实上', '的上档次', '事实上'];

  const showList = useEffect(() => {
    console.log(1);

    list.map((item) => {
      <li>{item}</li>;
    });
  }, []);

  useMemo(() => {
    showList;
  }, []);

  return <ul> {showList}</ul>;
};
