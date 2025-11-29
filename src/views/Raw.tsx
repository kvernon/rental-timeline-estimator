import { Stack } from '../components/core/Stack';
import styled from '@emotion/styled';
import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timeilneSelectors';
import { AnimatedWrapFormItem } from '../components/AnimatedWrapFormItem';

const Regular = styled(Stack)`
  color: white;
`;

export function Raw() {
  const results = useFormSelector(getTimeline);

  return (
    <AnimatedWrapFormItem>
      <Regular role="raw-results">
        <pre>{JSON.stringify(results, null, ' ')}</pre>
      </Regular>
    </AnimatedWrapFormItem>
  );
}
