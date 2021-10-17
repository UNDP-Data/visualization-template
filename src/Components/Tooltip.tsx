import styled from 'styled-components';

interface Props {
  title?: string | null;
  body?: string | null;
  sourceName?: string | null;
  sourceLink?: string | null;
  date?: string | null;
}

const TooltipEl = styled.div`
  display: block;
  position: absolute;
  z-index: 10;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  background-color: var(--white);
  box-shadow: 0px 10px 20px 0px rgb(9 105 250 / 15%);
  min-width: 22rem;
  max-width: 26rem;
  word-wrap: break-word;
`;

const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 0.5rem;
`;

const TooltipBody = styled.div`
  font-size: 1.3rem;
  color: var(--dark-grey);
  margin-bottom: 1rem;
`;

const TooltipSubNote = styled.div`
  font-size: 1.3rem;
  color: var(--grey);
  margin-bottom: 0.5rem;
`;

export const Tooltip = (props: Props) => {
  const {
    title,
    body,
    sourceName,
    sourceLink,
    date,
  } = props;
  return (
    <TooltipEl>
      {
      title
        ? (
          <TooltipTitle>
            {title}
          </TooltipTitle>
        )
        : null
    }
      {
      body
        ? (
          <TooltipBody>
            {body}
          </TooltipBody>
        ) : null
    }
      {
      sourceName || sourceLink || date
        ? (
          <TooltipSubNote>
            {
            sourceName
              ? (
                <>
                  Source:
                  {' '}
                  {sourceName}
                  <br />
                </>
              ) : null
          }
            {
            sourceLink
              ? (
                <>
                  {sourceLink}
                  <br />
                </>
              ) : null
          }
            {
            date
              ? (
                <>
                  <br />
                  Last Update:
                  {' '}
                  {date}
                </>
              ) : null
          }
          </TooltipSubNote>
        ) : null
    }
    </TooltipEl>
  );
};
