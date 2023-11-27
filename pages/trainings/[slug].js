import React from 'react';
import axios from 'axios';
import HeadLayout from '../../src/components/HeadLayout';
import TrainingPage from '../../src/components/landing/training/';

const Training = ({ training }) => {
  // 
  return (
    <>
      <HeadLayout
        title={training?.course?.courseName}
        description={training?.description}
        image={`https://gobeze.com${training?.thumbnail}`}
      >
        <TrainingPage training={training} />
      </HeadLayout>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const API =
    process.env.NODE_ENV === 'production'
      ? 'https://gobeze.com'
      : 'http://localhost:3000';
  const res = await axios.get(`${API}/api/classes/${query.slug}`);
  // 
  const training = res.data;
  // const {data} = await res.data
  // 
  return {
    props: {
      training,
    },
  };
};

export default Training;
