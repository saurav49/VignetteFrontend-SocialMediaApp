import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  return (
    <>
      {true ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
};

export { PrivateRoute };
