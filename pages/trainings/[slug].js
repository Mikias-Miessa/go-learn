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
  try {
    const API =
      process.env.NODE_ENV === 'production'
        ? 'https://gobeze.com'
        : 'http://localhost:3000';
      
    const res = await axios.get(`${API}/api/classes/${query.slug}`);
    
    // Assuming the response data is in the 'data' property
    const training = res.data;

    return {
      props: {
        training,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    // Returning an empty object or a specific error prop in case of an error
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
};


export default Training;
