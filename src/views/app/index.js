import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import Complaint from './complaint';
import AppLayout from "../../layout/AppLayout";
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboards")
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ "./pages")
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ "./applications")
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ "./ui"));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ "./blank-page")
);

const Tweets = React.lazy(() => import("./tweet"));

const MasterUser = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ "./account/user")
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />

            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/tweet`}
              render={(props) => <Tweets {...props} />}
            />
            <Route
              path={`${match.url}/account-setting`}
              render={(props) => <MasterUser {...props} />}
            />

            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
