import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Card } from './Card';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { TypographyDiv } from './text/TypographyDiv';
import { Header5 } from './text/Header5';
/*import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { IPropertyInformationParams } from '../validators/IPropertyInformationParams';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';*/

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  /*  background: #fff;*/
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const CardModal = styled(Card)`
  background: ${(props) => `linear-gradient(#7950C5, ${props.theme.palette.pageBackground} 3px)`};
`;

export function Modal({ isOpen, onClose, children, title }: IModalProps) {
  const coreTheme = useTheme() as IThemeOptions;

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <CardModal theme={coreTheme} onClick={(e) => e.stopPropagation()}>
        <Content>
          <CloseButton onClick={onClose}>×</CloseButton>
          <TypographyDiv>
            <Header5 theme={coreTheme}>{title}</Header5>
          </TypographyDiv>
          {children}
        </Content>
      </CardModal>
    </Overlay>
  );
}
