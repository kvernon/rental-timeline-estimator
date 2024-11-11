import styled from '@emotion/styled';
import { IShape } from './IShape';

const shapeSize = 950;

export const Spinner = styled.div<{ shape: IShape }>`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  width: ${shapeSize}px;
  height: ${shapeSize}px;
  left: ${(props) => {
    if (props.shape.x && props.shape.width) {
      return props.shape.x + props.shape?.width / 2 - shapeSize / 2;
    }
    return 240;
  }}px;
  top: -332px;
  float: left;
  position: absolute;
  background-image: radial-gradient(rgba(199, 159, 0, 0.3) 0%, rgba(61, 61, 61, 0.01) 62%, transparent 67%);
  border-radius: 50%;
  flex-grow: 1;
  z-index: -1;
  animation-name: spin;
  animation-duration: 300s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    border-radius: 50%;
    mask-image: radial-gradient(rgba(0, 0, 0, 1) 65%, transparent 80%);
  }

  &::before {
    background: repeating-conic-gradient(from 0deg, rgb(199, 159, 0, 0.3) 0deg 10deg, transparent 10deg 15deg);
    mask-image: radial-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 36%, transparent 65%);
    animation:
      rotate 720s linear,
      scale 3s linear infinite;
  }
`;
