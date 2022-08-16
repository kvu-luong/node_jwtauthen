import React from "react";
import { useGetAllUserQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading, error } = useGetAllUserQuery({
    fetchPolicy: "network-only",
  });
  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loadding...</div>;
  if (!data) return <div>No user</div>;

  return (
    <div>
      {data.getAllUser.map((user) => {
        return (
          <div key={user.password}>
            {user.email} - {user.tokenVersion}
          </div>
        );
      })}
    </div>
  );
};
