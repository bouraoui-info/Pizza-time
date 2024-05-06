import Container from "../../common/Container";
import React from "react";
import AdminMenuTable from "./AdminMenuTable";
import ListeCatégories from "./ListeCatégories";


const AdminMenus = () => {
  return (
    <Container>
      <AdminMenuTable />
      <ListeCatégories />
    </Container>
  );
};

export default AdminMenus;