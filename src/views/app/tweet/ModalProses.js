import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Badge,
  Table,
} from 'reactstrap';

const ModalProses = ({ openProses, setOpenProses, item }) => {
  return (
    <Modal
      size="lg"
      isOpen={openProses}
      toggle={() => setOpenProses(!openProses)}
    >
      <ModalHeader>Detail Proses</ModalHeader>
      <ModalBody>
        Result
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Text</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {item.analyse &&
              item.analyse.cosine.map((ite, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>k{i + 1}</td>
                  <td>{ite}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ul>
          <li>K1: Sentimen Positif Penanganan COVID-19</li>
          <li>K2: Sentimen Negatif Penanganan COVID-19</li>
          <li>K3: Sentimen Positif Vaksinasi COVID-19</li>
          <li>K4: Sentimen Negatif Vaksinasi COVID-19</li>
        </ul>
        <hr />
        Data Masuk
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Text</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {item.analyse &&
              item.analyse.query.data[0].map((ite, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{Object.keys(ite)}</td>
                  <td>{Object.values(ite)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <hr />
        idfPower Weight
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Text</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {item.analyse &&
              item.analyse.query.idfPowWeight[0].map((ite, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{Object.keys(ite)}</td>
                  <td>{Object.values(ite)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <hr />
        Weight Vectorized
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Text</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {item.analyse &&
              item.analyse.query.weightVectorized[0].map((ite, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{Object.keys(ite)}</td>
                  <td>{Object.values(ite)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <hr />
        Weight Vectorized
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Text</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {item.analyse &&
              item.analyse.query.idfVector.map((ite, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{Object.keys(ite)}</td>
                  <td>{Object.values(ite)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ModalProses;
