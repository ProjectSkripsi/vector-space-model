import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
import ImageListView from './ImageListView';
import ThumbListView from './ThumbListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  isAdmin,
  toDetailModel,
  doUpdate,
}) => {
  return (
    <Row>
      {items.map((product) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              key={product._id}
              product={product}
              isSelect={selectedItems.includes(product._id)}
              collect={collect}
              onCheckItem={onCheckItem}
              isAdmin={isAdmin}
              toDetailModel={toDetailModel}
              doUpdate={doUpdate}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListView
              key={product._id}
              product={product}
              isSelect={selectedItems.includes(product._id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        return (
          <DataListView
            key={product._id}
            product={product}
            isSelect={selectedItems.includes(product._id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
