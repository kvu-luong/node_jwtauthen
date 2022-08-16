import React, { useRef, useCallback, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../generated/graphql";
import ManageToken from '../auth/token';

interface Props {}

export const Login: React.FC<Props> = () => {
  console.log("### Refreshing page");
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [login] = useUserLoginMutation();
  const [error, setError] = useState<String>("");

  const handleSubmit = useCallback(
    () => async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {
        email: email.current?.value || "",
        password: password.current?.value || "",
      };
      try {
        const response = await login({
          variables: data,
        });
        console.log(response, data);
        const accessToken = response.data?.login.accessToken;
        if (accessToken) {
            ManageToken.setAcessToken(accessToken);
            return navigate("/");
        }
        setError("Invalid User");
      } catch (error: any) {
        setError(error.message);
      }
    },
    [login, navigate]
  );

  return (
    <div>
      {error !== "" && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit()}>
        <div>
          <label>email</label>
          <input type="email" name="email" ref={email} />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" ref={password} />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};
