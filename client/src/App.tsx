import React from "react";
import { gql, useQuery } from "@apollo/client";

const App: React.FC = () => {
  const {data, loading } = useQuery(gql`
    {
      bye
    }
  `);

  if(loading){
    return <div>Loadding...</div>;
  }
  return (
    <div>{JSON.stringify(data)}</div>
  );
}

export default App;
