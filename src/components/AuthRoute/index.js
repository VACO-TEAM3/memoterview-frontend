import { Redirect, Route } from "react-router-dom";

import useToken from "../../hooks/useToken";

export default function AuthRoute({ children, ...rest }) {
  const { token } = useToken();
  console.log(token);
  return (
    <Route
      {...rest}
    >
      {token ? children : <Redirect to={{ pathname: "/login", state: { from: rest.path } }} />}
    </Route>
  );
};
