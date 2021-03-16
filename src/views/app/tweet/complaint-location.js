import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, Col } from "reactstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { getToken } from "../../../helpers/Utils";
import { compose, withProps, withState, withHandlers } from "recompose";
import { baseUrl } from "../../../constants/defaultValues";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

const MapWithAMarker = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: (
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
    ),
    containerElement: (
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
    ),
    mapElement: (
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
    ),
  }),
  withScriptjs,
  withGoogleMap,
  withState("zoom", "setZoom", 12),
  withState("id", "setId", ""),
  withState("isVisible", "setIsVisible", false),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      onZoomChanged: ({ setZoom }) => () => {
        setZoom(refs.map.getZoom());
      },
      onClick: ({ setId }) => (id) => {
        setId(id);
      },
      onClickReviewer: ({ isVisible, setIsVisible }) => () => {
        setIsVisible(!isVisible);
      },
    };
  })
)((props) => (
  <GoogleMap
    defaultCenter={{ lat: -5.147464, lng: 119.427936 }}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    onClick={props.onClick}
  >
    <>
      {props.data.map((item) => (
        <Marker
          key={item._id}
          position={{
            lat: item.location.coords.latitude,
            lng: item.location.coords.longitude,
          }}
          label={props.zoom >= 15 ? item.name : ""}
          onClick={() => props.onClick(item._id)}
        >
          {item._id === props.id && (
            <InfoWindow onCloseClick={() => props.onClick("")}>
              <div style={{ maxWidth: "200px" }}>
                <b>{item.name}</b> <br />
                <b>{item.contact}</b> <br />
                <b>{item.school.name}</b> <br />
                <br />
                <br />
                <b>Detail Pengaduan:</b> {item.description} <br />
                <div className="mt-3">
                  <a
                    href={`https://www.google.com/maps/search/${item.location.coords.latitude},${item.location.coords.longitude}`}
                    target="_blank"
                    style={{ color: "#427fed" }}
                  >
                    <i className="fa fa-map" aria-hidden="true" /> Lihat di
                    google map
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </>
  </GoogleMap>
));

const MapsUi = ({ match }) => {
  const [data, setData] = useState([]);
  const [selectedPageSize, setSelectedPageSize] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      axios
        .get(`${baseUrl}/complaint/${selectedPageSize}/${currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setData(data.data);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.maps" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Col xxs="12">
          <Card className="mb-4">
            <CardBody>
              <MapWithAMarker data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default MapsUi;
