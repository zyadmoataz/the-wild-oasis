/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 768px) {
    align-items: center; /* Center the links */
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ toggleSidebar }) {
  return (
    <nav>
      <NavList>
        <StyledNavLink to='/dashboard' onClick={toggleSidebar}>
          <HiOutlineHome />
          <span>Home </span>
        </StyledNavLink>
        <StyledNavLink to='/bookings' onClick={toggleSidebar}>
          <HiOutlineCalendarDays />
          <span>Bookings</span>
        </StyledNavLink>
        <StyledNavLink to='/cabins' onClick={toggleSidebar}>
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </StyledNavLink>
        <StyledNavLink to='/users' onClick={toggleSidebar}>
          <HiOutlineUsers />
          <span>Users</span>
        </StyledNavLink>
        <StyledNavLink to='/settings' onClick={toggleSidebar}>
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </StyledNavLink>
      </NavList>
    </nav>
  );
}

export default MainNav;
