import React , { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { getUsers } from "./api/users";
import MainScreenHeader from "../components/MainScreenHeader";

const UserScreen = ({ user }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers(user.success.token);
      setUser(data);
    };
    fetchUsers();
  }, [user.success.token]);

  const deletePUserHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      //deleteProduct(id);
      console.log(id + " user deleted");
    }
  };

  return (
    <div className="global-min-width">
      <MainScreenHeader buttonLabel={"Add User"} link={"/addnewuser"} />

      <div className="mt-4">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Email</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">1</th>
                <td>{user.name}</td>
                <td>{user.typeofuser}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    className="img-fluid img-thumbnail"
                    style={{
                      height: "150px",
                      width: "150px",
                      objectFit: "contain",
                    }}
                    src={user.photo}
                    alt="Not Available"
                  ></img>
                </td>
                <td>
                  <LinkContainer
                    style={{ cursor: "pointer" }}
                    to={`/permissions/${user.id}`}
                  >
                    <button className="rounded">Permissions</button>
                  </LinkContainer>
                </td>
                <td>
                  <LinkContainer
                    style={{ cursor: "pointer" }}
                    to={`/user/${user.id}/edit`}
                  >
                    <button className="rounded">
                      <i className="bi bi-pencil edit-icon-color set-cursor"></i>
                    </button>
                  </LinkContainer>
                </td>
                <td>
                  <button
                    className="rounded"
                    onClick={() => deletePUserHandler(user.id)}
                  >
                    <i className="bi bi-trash delete-icon-color set-cursor"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserScreen;
