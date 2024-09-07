import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NavButton } from './NavButton';
import { INavListProps } from './INavListProps';

const NavListStyled = styled.menu`
  display: -webkit-flex;
  display: flex;
  list-style-type: none;
  flex-flow: row wrap;
  padding: 0;
  justify-content: space-around;
`;

export const NavList = (props: INavListProps) => {
  const [navList, setNavList] = useState(props.navList);
  return (
    <NavListStyled aria-label={props.title}>
      {navList.map((entity) => {
        return (
          <NavButton
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
