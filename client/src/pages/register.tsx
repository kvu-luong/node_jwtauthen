import React, { useRef, useCallback, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../generated/graphql";

interface Props {}

export const Register: React.FC<Props> = () => {
  console.log("### Refreshing page");
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [register] = useRegisterUserMutation();
  const [error, setError] = useState<String>("");

  const handleSubmit = useCallback(
    () => async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {
        email: email.current?.value || "",
        password: password.current?.value || "",
      };
      try {
        const response = await register({
          variables: data,
        });
        console.log(response, data);
        if(response.data?.register) return navigate("/");
        setError('User existed');
      } catch (error: any) {
        setError(error);
      }
    },
    [register, navigate]
  );

  return (
    <div>
      {error !== "" && <div style={{color: 'red'}}>{error}</div>}
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
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};
