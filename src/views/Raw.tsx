import { Stack } from '../components/core/Stack';
import styled from '@emotion/styled';
import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timeilneSelectors';

const Regular = styled(Stack)`
  color: white;
`;

export function Raw() {
  const results = useFormSelector(getTimeline);

  return (
    <Regular role="raw-results">
      <pre>{JSON.stringify(results, null, ' ')}</pre>
    </Regular>
  );
}
