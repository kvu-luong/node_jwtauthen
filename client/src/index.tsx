import ReactDOM from "react-dom/client";
import { AllRoute } from "./Routes";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import ManageToken from "./auth/token";
import { setContext } from "@apollo/client/link/context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const authMiddleware = setContext(async (_req, { headers }) => {
  const tokenNotExpired = ManageToken.checkTokenExpired();
  if(!tokenNotExpired){
    await ManageToken.getFreshToken();
  }
  
  let acessToken =  ManageToken.getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: acessToken ? `Bearer ${acessToken}` : ''
    },
  };
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <AllRoute />
  </ApolloProvider>
);
