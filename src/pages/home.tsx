import React from "react"
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, NextPage } from "next"
// import Post, { PostProps } from "../components/Post"

import { Layout } from "../components/Layout";
import Restaurant, { RestaurantProps } from "../components/Restaurant";

// GetStaticProps関数を実装して、ページの初期データを取得
export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  // const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${key}=${value}`;
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?column=nameColumn&value=a`;
  console.log(apiUrl)
  const response = await fetch(apiUrl);
  const restaurants = await response.json();
  console.log(restaurants)

  // Dateオブジェクトを文字列に変換
  const serializedRestaurants = restaurants.map((restaurant: RestaurantProps) => ({
    ...restaurant,
    createdAt: new Date(restaurant.createdAt).toISOString(),
  }));
  console.log(`debug: ${serializedRestaurants}`)

  // ページの初期データを返します。
  return {
    props: { serializedRestaurants },
    // revalidate: 10,
  };
};

// 型定義
type Props = {
  serializedRestaurants: RestaurantProps[]
}

const Home: NextPage<Props> = (props) => {
  return (
    <Layout title='diagonal'>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.serializedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="post">
              <Restaurant restaurant={restaurant} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Home
