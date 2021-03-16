import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Badge,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';
import { get } from 'lodash';
import moment from 'moment';

const ModalProgress = ({
  setModalProgressOpen,
  modalProgressOpen,
  data,
  onSubmitProgress,
  updateType,
  onChange,
}) => {
  return (
    <Modal
      isOpen={modalProgressOpen}
      toggle={() => setModalProgressOpen(!modalProgressOpen)}
    >
      <ModalHeader>
        Update {updateType === 'progress' ? 'Progress' : 'Kriteria'}{' '}
      </ModalHeader>
      <ModalBody>
        <div className="text-center">
          <p className="list-item-heading pt-2">{data.name}</p>
        </div>
        <p className="mb-3" style={{ textAlign: 'justify' }}>
          {data.description}
        </p>
        <p className="text-muted text-small mb-2">Lokasi</p>
        <a
          href={`http://www.google.com/maps/place/${get(
            data,
            'location.coords.latitude',
            ''
          )},${get(data, 'location.coords.longitude', '')}`}
          target="_blank"
        >
          <p className="mb-3">
            <i className="simple-icon-location-pin" /> Open Gmaps
          </p>
        </a>
        <p className="text-muted text-small mb-2">Dibuat</p>

        <p className="mb-3">{moment(data.createdAt).format('ll')}</p>
        <p className="text-muted text-small mb-2">Kriteria</p>

        <p className="mb-3">{get(data, 'criteriaStatus', '-')}</p>

        <p className="text-muted text-small mb-2">Status</p>
        <p className="mb-3">
          <Badge color="outline-secondary" className="mb-1 mr-1" pill>
            {data.progress === 'process'
              ? 'Proses'
              : data.progress === 'verify'
              ? 'Verifikasi Bukti'
              : 'Selesai'}
          </Badge>
        </p>
        {updateType === 'progress' ? (
          <>
            <p className="text-muted text-small mb-2">Update Progress</p>
            <AvForm
              className="av-tooltip tooltip-label-right"
              onSubmit={(event, errors, values) =>
                onSubmitProgress(event, errors, values)
              }
            >
              <AvRadioGroup
                className="error-l-150 "
                name="progress"
                value={data.progress}
                required
              >
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Verifikasi Bukti"
                  value="verify"
                  checked={data.progress === 'verify'}
                />
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Selesai"
                  value="done"
                  checked={data.progress === 'done'}
                />
              </AvRadioGroup>
              <p className="text-muted text-small mb-2 mt-2">Note</p>
              <AvGroup>
                <AvInput
                  type="textarea"
                  name="note"
                  id="description"
                  required
                  value={data.note}
                  onChange={onChange}
                />
                <AvFeedback>Wajib di isi!</AvFeedback>
              </AvGroup>
              <hr />
              <Button color="primary">Update</Button>{' '}
            </AvForm>
          </>
        ) : (
          <>
            <p className="text-muted text-small mb-2">Update Kriteria</p>
            <AvForm
              className="av-tooltip tooltip-label-right"
              onSubmit={(event, errors, values) =>
                onSubmitProgress(event, errors, values)
              }
            >
              <AvRadioGroup
                className="error-l-150 "
                name="criteria"
                value={Number(data.criteria) || 0}
                required
              >
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Dana Bos"
                  value={1}
                />
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Pelayanan Pendidikan"
                  value={2}
                />
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Administrasi Pendidikan"
                  value={3}
                />
                <AvRadio
                  customInput
                  onChange={onChange}
                  label="Pengaduan Birokrasi Sekolah"
                  value={4}
                />
              </AvRadioGroup>
              <hr />
              <Button color="primary">Update</Button>{' '}
            </AvForm>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ModalProgress;
