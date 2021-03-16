import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const DataTraining = React.lazy(() =>
  import(/* webpackChunkName: "ui-CompalintData" */ "./data-training")
);

const TweetCovid = React.lazy(() =>
  import(/* webpackChunkName: "ui-ComplaintLocation" */ "./tweet-covid")
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/data-training`}
        render={(props) => <DataTraining {...props} />}
      />

      <Route
        path={`${match.url}/tweet-covid`}
        render={(props) => <TweetCovid {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UI;
