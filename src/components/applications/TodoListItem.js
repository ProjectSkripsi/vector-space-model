import React, { useState } from "react";
import {
  Card,
  CardBody,
  Badge,
  CustomInput,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Colxx } from "../common/CustomBootstrap";
import Linkify from "react-linkify";
import Lightbox from "react-image-lightbox";

const TodoListItem = ({
  item,
  imgSource,
  handleCheckChange,
  isSelected,
  deleteData,
  assignMining,
  onUpdateProgress,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  return (
    <Colxx xxs="12" className="mb-3">
      <Card className={className}>
        <CardBody>
          <div className="d-flex flex-row mb-3 justify-content-between">
            <a
              href={`https://twitter.com/${item.user.screen_name}`}
              target="_blank"
            >
              <img
                src={
                  item.user.profile_image_url_https ||
                  "/assets/img/profiles/l-9.jpg"
                }
                alt="avatar"
                className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
              />
            </a>
            <div className="pl-3 flex-grow-1">
              <a
                href={`https://twitter.com/${item.user.screen_name}`}
                target="_blank"
              >
                <p className="font-weight-medium mb-0 ">
                  {item.user.name} - @{item.user.screen_name}
                </p>
                <p className="text-muted mb-0 text-small">
                  {item.user.description}
                </p>
              </a>
            </div>

            <div className="comment-likes">
              <ButtonDropdown
                direction="left"
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
              >
                <DropdownToggle caret size="xs" color="secondary" outline>
                  Actions
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem
                  // onClick={() => onUpdateProgress(item, "criteria")}
                  >
                    Update Kriteria
                  </DropdownItem>
                  <DropdownItem
                  // onClick={() => onUpdateProgress(item, "progress")}
                  >
                    Update Progress
                  </DropdownItem> */}
                  <DropdownItem onClick={() => deleteData(item._id)}>
                    Hapus
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </div>
          <div className="mt-4">
            <Linkify>
              {item.text}
              <p className="text-muted  text-small">
                {moment(item.createdAt).startOf("hour").fromNow()}
              </p>
            </Linkify>
          </div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default React.memo(TodoListItem);
