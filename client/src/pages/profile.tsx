import React from "react";
import ManageToken from "../auth/token";
import { useGetUserProfileQuery, useLogoutMutation } from "../generated/graphql";
import { useNavigate } from 'react-router-dom';
interface Props {}

export const Profile: React.FC<Props> = () => {
  const { data, loading, error } = useGetUserProfileQuery({fetchPolicy: "no-cache"});
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const userLogout = async () => {
    let result = await logout();
    console.log(result, 'logout result')
    if(result){
      ManageToken.setAcessToken("");
      navigate("/login")
    }
    
  }
  if (loading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div>
      {error && <div>{error.message}</div>}
      <div>{data?.getProfile.email}</div>
      <div>{data?.getProfile.tokenVersion}</div>
      {data && (<div><button onClick={userLogout}>Logout</button></div>)}
    </div>
  );
};
