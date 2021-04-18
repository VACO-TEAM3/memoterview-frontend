import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducer, { rootSaga } from "./redux/reducers";
import history from "./utils/history";

const sagaMiddleware = createSagaMiddleware({
  context: {
    history,
  },
});

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
