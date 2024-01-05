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
          🎓 Gobeze Verified Achievement! 🚀 We are thrilled to confirm the successful completion of the
           ${certificate.course} by our dedicated learner! 🌟 
           At Gobeze, we take pride in our rigorous verification process,
           ensuring the authenticity of every student's accomplishment.
           This graduate has not only mastered key concepts of ${certificate.course}
           but has also demonstrated a commitment to continuous learning.
           Our live classrooms and user-friendly online portal at www.gobeze.com provide
           an immersive and enriching educational experience. As the verified credentials of
           this accomplished individual, we are confident in their ability to apply these skills in their field.
           Kudos to our exceptional instructors and the entire Gobeze team for contributing to this empowering educational journey! 🚀📚
           #GobezeVerified #ProfessionalDevelopment #CourseCompletion 🎓✨`: ''
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
