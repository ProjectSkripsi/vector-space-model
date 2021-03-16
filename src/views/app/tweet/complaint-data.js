/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
} from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { getToken } from "../../../helpers/Utils";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import axios from "axios";
import { baseUrl } from "../../../constants/defaultValues";
import {
  getTodoList,
  getTodoListWithOrder,
  getTodoListSearch,
  selectedTodoItemsChange,
} from "../../../redux/actions";
import TodoListItem from "../../../components/applications/TodoListItem";
import Pagination from "../../../components/Model/Pagination";
import { NotificationManager } from "../../../components/common/react-notifications";
import ModalProgress from "../../../components/complaint/ModalProgress";

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const DataTweet = ({
  match,
  intl,
  todoItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getTodoListAction,
  getTodoListWithOrderAction,
  getTodoListSearchAction,
  selectedTodoItemsChangeAction,
}) => {
  const [modalProgressOpen, setModalProgressOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [selectedPageSize, setSelectedPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: "newest",
    label: "Terbaru",
  });
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState({});
  const [updateType, setUpdateType] = useState("");

  useEffect(() => {
    document.body.classList.add("right-menu");
    setCurrentPage(1);
    return () => {
      document.body.classList.remove("right-menu");
    };
  }, [selectedPageSize]);

  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      const isSearch = search && `&search=${search}`;
      console.log(isSearch);
      const order =
        selectedOrderOption && `?orderBy=${selectedOrderOption.column}`;
      axios
        .get(
          `${baseUrl}/tweet/${selectedPageSize}/${currentPage}${order}${isSearch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalPage(data.totalPage);
          setItems(data.data);
          setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const handleCheckChange = (event, id) => {
    if (lastChecked == null) {
      setLastChecked(id);
    }

    let selectedList = Object.assign([], selectedItems);
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    selectedTodoItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = todoItems;
      const start = getIndex(id, items, "id");
      const end = getIndex(lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedTodoItemsChangeAction(selectedList);
    }
  };

  const assignMining = (id, status) => {
    const token = getToken();
    axios
      .patch(
        `${baseUrl}/complaint/data-mining/${id}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        createNotification("success", "Berhasil assign data mining");
        fetchNewUpdate();
      })
      .catch((error) => {
        createNotification("error");
      });
  };

  const fetchNewUpdate = () => {
    const token = getToken();
    const isSearch = search && `&search=${search}`;
    const order =
      selectedOrderOption && `?orderBy=${selectedOrderOption.column}`;
    axios
      .get(
        `${baseUrl}/tweet/${selectedPageSize}/${currentPage}${order}${isSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setTotalPage(data.totalPage);
        setItems(data.data);
        setTotalItemCount(data.totalItem);
        setIsLoaded(true);
      });
  };

  const deleteData = (id) => {
    const token = getToken();
    axios
      .delete(`${baseUrl}/tweet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        createNotification("success", "Berhasil hapus data complaint");
        fetchNewUpdate();
      })
      .catch((error) => {
        createNotification("error");
      });
  };

  const createNotification = (type, msg, className) => {
    const cName = className || "";
    switch (type) {
      case "success":
        NotificationManager.success("Sukses!", msg, 3000, null, null, cName);
        break;
      case "error":
        NotificationManager.error(
          "Terjadi Kesalahan!",
          "Silahkan coba beberapa saat!",
          3000,
          null,
          null,
          cName
        );
        break;
      default:
        NotificationManager.info("Info message");
        break;
    }
  };

  const orderBy = (order) => {
    setSelectedOrderOption(order);
  };

  const onSubmitProgress = (e, errors) => {
    const token = getToken();
    const { note, progress, _id, criteria } = selectedProgress;

    if (updateType === "progress") {
      if (errors.length === 0 && progress !== "process") {
        axios
          .patch(
            `${baseUrl}/complaint/${_id}`,
            {
              progress: progress,
              note: note,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            createNotification("success", "Berhasil update progress");
            fetchNewUpdate();
            setModalProgressOpen(false);
          })
          .catch((error) => {
            createNotification("error");
          });
      } else {
        createNotification("error");
      }
    } else {
      if (criteria) {
        axios
          .patch(
            `${baseUrl}/complaint/criteria/${_id}`,
            {
              criteria,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            createNotification("success", "Berhasil update kriteria");
            fetchNewUpdate();
            setModalProgressOpen(false);
          })
          .catch((error) => {
            createNotification("error");
          });
      } else {
        createNotification("error");
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSelectedProgress((prevState) => ({ ...prevState, [name]: value }));
  };

  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.todo" />
            </h1>

            <Breadcrumb match={match} />
          </div>
          <ModalProgress
            modalProgressOpen={modalProgressOpen}
            setModalProgressOpen={setModalProgressOpen}
            data={selectedProgress}
            onSubmitProgress={onSubmitProgress}
            onChange={onChange}
            updateType={updateType}
          />

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="todo.display-options" />{" "}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              id="displayOptions"
              className="d-md-block"
              isOpen={displayOptionsIsOpen}
            >
              <div className="d-block mb-2 d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="todo.orderby" />
                    {orderColumn ? orderColumn.label : ""}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderColumns.map((o, index) => {
                      return (
                        <DropdownItem key={index} onClick={() => orderBy(o)}>
                          {o.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setSearch(e.target.value.toLowerCase());
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            {isLoaded ? (
              items.map((item, index) => {
                return (
                  <TodoListItem
                    key={`todo_item_${index}`}
                    item={item}
                    handleCheckChange={handleCheckChange}
                    isSelected={
                      isLoaded ? selectedItems.includes(item.id) : false
                    }
                    // imgSource={img}
                    assignMining={assignMining}
                    deleteData={deleteData}
                    onUpdateProgress={(data, type) => {
                      setModalProgressOpen(true);
                      setSelectedProgress(data);
                      setUpdateType(type);
                    }}
                  />
                );
              })
            ) : (
              <div className="loading" />
            )}
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={(i) => setCurrentPage(i)}
            />
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const {
    todoItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = todoApp;
  return {
    todoItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getTodoListAction: getTodoList,
    getTodoListWithOrderAction: getTodoListWithOrder,
    getTodoListSearchAction: getTodoListSearch,
    selectedTodoItemsChangeAction: selectedTodoItemsChange,
  })(DataTweet)
);
