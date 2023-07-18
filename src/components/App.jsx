import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notofocation/Notification';

export default function App() {
  const [feedBackOptions, setFeedBackOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = option => {
    const fieldName = option;

    setFeedBackOptions(prevState => ({
      ...prevState,
      [fieldName]: prevState[fieldName] + 1,
    }));
  };

  const countTotalFeedback = () => {
    let total =
      feedBackOptions.good + feedBackOptions.neutral + feedBackOptions.bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    let positivePercentage = Math.round(
      (feedBackOptions.good * 100) / countTotalFeedback()
    );
    return positivePercentage;
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {!countTotalFeedback() ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={feedBackOptions.good}
            neutral={feedBackOptions.neutral}
            bad={feedBackOptions.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}
