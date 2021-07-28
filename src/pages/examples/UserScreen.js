import React from "react";
import { Card, Table } from "@themesberg/react-bootstrap";

export default () => {
  return (
    <>
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="pb-3">
          <Table
            responsive
            className="table-centered table-responsive table-nowrap rounded mb-0"
          >
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">User Type</th>
                <th className="border-0"></th>
                <th className="border-0"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
