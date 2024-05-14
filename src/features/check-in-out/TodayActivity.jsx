/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>Today Activity</Heading>
      </Row>

      {/* Conditional Rendering:
        Loading State (isLoading): Displays a Spinner component when data is being fetched (isLoading is true).
        Activity Data:
        Activities Available (activities.length > 0): Maps over the activities array to render a TodayItem for each activity inside a TodayList. Each TodayItem receives an activity object and a unique key (activity.id).
        No Activities: Displays a NoActivity component with the text "No activity today" if there are no activities. */}

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
