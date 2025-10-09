import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NavButton } from './NavButton';
import { INavListGenericProps, INavListProps } from './INavListProps';
import { useNavigate, useLocation } from 'react-router';

export const NavListStyled = styled.menu`
  display: -webkit-flex;
  display: flex;
  list-style-type: none;
  flex-flow: row wrap;
  padding: 0;
  justify-content: space-around;
`;

export const NavListGeneric = (props: INavListGenericProps) => {
  const [navList] = useState(props.navList);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavListStyled aria-label={props.title}>
      {navList.map((entity, i) => {
        return (
          <NavButton
            key={i}
            selected={entity.path === location.pathname}
            title={entity.title}
            onClick={() => {
              navigate(entity.path);
            }}
          />
        );
      })}
    </NavListStyled>
  );
};

export const NavList = (props: INavListProps) => {
  const [navList, setNavList] = useState(props.navList);
  return (
    <NavListStyled aria-label={props.title}>
      {navList.map((entity, i) => {
        return (
          <NavButton
            key={i}
            disabled={entity.isDisabled || false}
            selected={entity.isSelected || false}
            title={entity.title}
            onClick={(title) => {
              const findIndex = navList.findIndex((x) => x.title === title);

              if (findIndex !== -1) {
                const newVar = [...navList].map((x) => {
                  return { ...x, isSelected: false };
                });
                newVar[findIndex].isSelected = true;
                setNavList(newVar);
                props.onClick(title, newVar);
              }
            }}
          />
        );
      })}
    </NavListStyled>
  );
};
