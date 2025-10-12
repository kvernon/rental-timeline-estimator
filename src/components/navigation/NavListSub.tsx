import React, { useState } from 'react';
import { NavButton } from './NavButton';
import { INavListProps } from './INavListProps';
import { NavListStyled } from './NavListStyled';

export const NavListSub = (props: INavListProps) => {
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
