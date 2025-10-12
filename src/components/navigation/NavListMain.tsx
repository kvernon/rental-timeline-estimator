import { INavListGenericProps } from './INavListProps';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavListStyled } from './NavListStyled';
import { NavButton } from './NavButton';

export const NavListMain = (props: INavListGenericProps) => {
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
