import React from 'react';
import axios from 'axios';
import HeadLayout from '../../src/components/HeadLayout';
import Certificate from '../../src/components/landing/certificate/Certificate';


const CertificatePage = ({ certificate }) => {
  const pageTitle = certificate
    ? `${certificate?.name} | Gobeze`
    : 'Not Found';

  return (
    <>
      <HeadLayout
        title={pageTitle}
        image={
          certificate
            ? `https://gobezelearning.vercel.app${certificate?.imageFile}`
            : ''
        }
        description={
          certificate? `
          🎓 Exciting Announcement! 🚀 I am thrilled to share that I have successfully 
          completed the ${certificate.course} at Gobeze - the future of learning! 🌟
           This transformative experience has equipped me with invaluable 
           insights and practical skills.`:''
        }
      >
        
          <Certificate certificate={certificate} /> 
           
        
        
      </HeadLayout>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  
  
  // const API =
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://gobeze.com'
  //     : 'http://localhost:3000';
  const API =
    process.env.NODE_ENV === 'production'
      ? 'https://gobezelearning.vercel.app'
      : 'http://localhost:3000';
  
  const res = await axios.get(`${API}/api/certificate/${query.id}`);
  
  
  const certificate = res.data;
  // const {data} = await res.data
  // 
  return {
    props: {
      certificate,
    },
  };
};

export default CertificatePage;
