import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

// TODO: Show names of Factors Sets
export default function Home() {
  // TODO:
  const data = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
  ];
  return (
    <>
      <h3>投稿一覧</h3>
      {data.map((item, i) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/factors/${item.id}`}
            key={i}
          >
            {item.name}
          </a>
        );
      })}
    </>
  );
}
