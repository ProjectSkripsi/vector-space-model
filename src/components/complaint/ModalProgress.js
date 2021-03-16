import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Badge,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import { get } from "lodash";
import moment from "moment";

const ModalProgress = ({
  setModalProgressOpen,
  modalProgressOpen,
  data,
  onUpdateClassification,
  onChange,
}) => {
  return (
    <Modal
      isOpen={modalProgressOpen}
      toggle={() => setModalProgressOpen(!modalProgressOpen)}
    >
      <ModalHeader>Update Klasifikasi</ModalHeader>
      <ModalBody>
        <p className="mb-3" style={{ textAlign: "justify" }}>
          {data.text}
        </p>

        <p className="text-muted text-small mb-2">Dibuat</p>

        <p className="mb-3">{moment(data.createdAt).format("ll")}</p>

        <p className="text-muted text-small mb-2">Status</p>
        <p className="mb-3">
          <Badge color="outline-secondary" className="mb-1 mr-1" pill>
            {data.classification || "-"}
          </Badge>
        </p>

        <p className="text-muted text-small mb-2">Update Klasifikasi</p>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) =>
            onUpdateClassification(event, errors, values)
          }
        >
          <AvRadioGroup
            className="error-l-150 "
            name="classificationCode"
            value={Number(data.classificationCode) || 0}
            required
          >
            <AvRadio
              customInput
              onChange={onChange}
              label="Sentimen Positif Penanganan COVID-19"
              value={1}
            />
            <AvRadio
              customInput
              onChange={onChange}
              label="Sentimen Negatif Penanganan COVID-19"
              value={2}
            />
            <AvRadio
              customInput
              onChange={onChange}
              label="Sentimen Positif Vaksinasi COVID-19"
              value={3}
            />
            <AvRadio
              customInput
              onChange={onChange}
              label="Sentimen Negatif Vaksinasi COVID-19"
              value={4}
            />
          </AvRadioGroup>
          <hr />
          <Button color="primary">Update</Button>{" "}
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default ModalProgress;
