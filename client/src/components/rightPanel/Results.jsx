import React, { Component } from 'react';
import {
  CardBody,
  Button,
  PaginationItem,
  PaginationLink,
  ListGroup,
  ListGroupItem,
  CardSubtitle,
  Pagination
} from 'reactstrap';

export default class Results extends Component {
  render() {
    return (
      <CardBody>
        <CardSubtitle>About 14,700 results ( 0.10 seconds)</CardSubtitle>
        <ListGroup flush className="search-listing">
          <ListGroupItem className="pl-0 border-top-0 border-bottom-0 d-flex flex-row justify-content-start">
            <i
              className="mdi mdi-checkbox-blank-circle-outline"
              style={{ fontSize: '26px', marginRight: '5px' }}
            />
            <span>
              <h4 className="mb-0">John Doe</h4>
              <p className="text-muted">32.149.17.249</p>
            </span>
          </ListGroupItem>
          <ListGroupItem className="pl-0 border-top border-bottom-0 d-flex flex-row justify-content-start">
            <i
              className="mdi mdi-checkbox-marked-circle-outline"
              style={{ fontSize: '26px', marginRight: '5px' }}
            />
            <span>
              <h4 className="mb-0">Bill Gates</h4>
              <p className="text-muted">78.110.28.10</p>
            </span>
          </ListGroupItem>
          <ListGroupItem className="pl-0 border-top border-bottom-0 d-flex flex-row justify-content-start">
            <i
              className="mdi mdi-checkbox-blank-circle-outline"
              style={{
                fontSize: '26px',
                marginRight: '5px'
              }}
            />
            <span>
              <h4 className="mb-0">Mark Zuckerberg</h4>
              <p className="text-muted">121.47.126.91</p>
            </span>
          </ListGroupItem>
        </ListGroup>
        <Pagination className="float-right" aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
        </Pagination>
        {window.innerWidth < 501 ? (
          <Button
            className="btn float-left"
            outline
            color="danger"
            onClick={this.props.rightPanelToggle}
          >
            Exit
          </Button>
        ) : (
          ''
        )}
      </CardBody>
    );
  }
}
