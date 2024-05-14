/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  //but we are only allowed to call this function inside some function like callback or in use effect
  const navigate = useNavigate();

  //1- Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2-If the user is not authenticated redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3-While loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4-If the user is authenticated render the children "render the app"
  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
