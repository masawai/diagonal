import React from 'react';
import Router from "next/router";
// import ReactMarkdown from "react-markdown";

export type RestaurantProps = {
  id: number;
  name: string;
  prefecture: string;
  genre: string;
  createdAt: Date;
};

const Restaurant: React.FC<{ restaurant: RestaurantProps }> = ({ restaurant }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${restaurant.id}`)}>
      <h2>{restaurant.name}</h2>
      <small>By {restaurant.prefecture}</small>
      {/* <ReactMarkdown children={restaurant.content} /> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Restaurant;
