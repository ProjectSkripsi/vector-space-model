import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import StatistikChart from "./Chart";
import { ThemeColors } from "../../../helpers/ThemeColors";
import { getStatisticRequest } from "../../../redux/actions";
import { get } from "lodash";

const colors = ThemeColors();

const TweetDashboard = ({ match }) => {
  const dispatch = useDispatch();
  const { dataHandle, dataVaccine } = useSelector((state) => state.tweetApp);

  const dataVaccines = {
    labels: ["Positif", "Negatif"],
    datasets: [
      {
        label: "",
        borderColor: [
          // colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
        ],
        backgroundColor: [
          // colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
        ],
        // borderWidth: 2,
        data: [get(dataVaccine, "positif", 0), get(dataVaccine, "negatif", 0)],
      },
    ],
  };

  const dataPenanganan = {
    labels: ["Positif", "Negatif"],
    datasets: [
      {
        label: "",
        borderColor: [
          // colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
        ],
        backgroundColor: [
          // colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
        ],
        // borderWidth: 2,
        data: [get(dataHandle, "positif", 0), get(dataHandle, "negatif", 0)],
      },
    ],
  };

  useEffect(() => {
    dispatch(getStatisticRequest("handle", (next) => {}));
    dispatch(getStatisticRequest("handlex", (next) => {}));
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.statistic" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" md="12" className="mb-4">
          <StatistikChart
            chartClass="dashboard-donut-chart"
            title="dashboards.statistic-vaccine"
            data={dataVaccines}
          />
        </Colxx>

        <Colxx lg="6" md="12" className="mb-4">
          <StatistikChart
            chartClass="dashboard-donut-chart"
            title="dashboards.statistic-penanganan"
            data={dataPenanganan}
          />
        </Colxx>
      </Row>
    </>
  );
};
export default TweetDashboard;
