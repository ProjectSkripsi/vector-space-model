import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CompalaintData = React.lazy(() =>
  import(/* webpackChunkName: "ui-CompalintData" */ './complaint-data')
);
const ComplaintLocation = React.lazy(() =>
  import(/* webpackChunkName: "ui-ComplaintLocation" */ './complaint-location')
);

const DataMining = React.lazy(() =>
  import(/* webpackChunkName: "ui-ComplaintLocation" */ './data-mining')
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <CompalaintData {...props} />}
      />
      <Route
        path={`${match.url}/maps`}
        render={(props) => <ComplaintLocation {...props} />}
      />
      <Route
        path={`${match.url}/data-mining`}
        render={(props) => <DataMining {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UI;
