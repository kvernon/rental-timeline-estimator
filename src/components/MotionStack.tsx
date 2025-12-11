import { motion } from 'motion/react';
import { Stack } from './core/Stack';
import styled from '@emotion/styled';

const MotionStackStyled = styled(Stack)`
  width: unset;
`;

export const MotionStack = motion.create(Stack);

export const MotionStackNoWidth = motion.create(MotionStackStyled);
