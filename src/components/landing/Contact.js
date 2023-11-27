import Image from 'next/image';
import Link from '../Link';
import contact from '../../images/contact.svg';
import {Box,Paper,Typography,Grid} from '@mui/material'
import Footer from "./Footer"
import Header from "./Header"
import Hero from './training/ClassHero'
import React, { useState } from 'react';
import axios from 'axios';
function Copyright(props) {
 
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Contact = () =>{
  // State variables for form handling
  const [formStatus, setFormStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    name: '',
    email: '',
    message: '',
    companyName: '',
    phoneNumber: '',
    subject: '',
  });
  const [errors, setErrors] = useState({});

  // Handler for input value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for input blur (validation)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Basic validation for empty fields and email format
    if (!value.trim()) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      newErrors[name] = 'Invalid email address';
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  // Validation for the entire form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Check each required field for emptiness and email format
    ['name', 'email', 'message', 'companyName', 'phoneNumber', 'subject'].forEach((field) => {
      if (!query[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    if (!query.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(query.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    // Creating FormData and appending form data
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Sending form data to a server (replace '#' with actual endpoint)
    axios
      .post('https://getform.io/f/2026ca1a-adcd-4e28-86c1-3287386b2d6d', formData, {
        headers: { Accept: 'application/json' },
      })
      .then(function (response) {
        // Handling successful form submission
        setFormStatus(true);
        setQuery({
          name: '',
          email: '',
          message: '',
          companyName: '',
          phoneNumber: '',
          subject: '',
        });
        setLoading(false);
      })
      .catch(function (error) {
        // Handling form submission error
        
        setLoading(false);
      });
  };
    return (
      <>
        <Header />
        <main>
          <Hero />
          <Paper
            sx={{
              ml: 3,
              mr: 3,
              mt: '-64px',
              mb: '32px',
              p: 2,
              transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflowWrap: 'break-word',
              backgroundClip: 'border-box',
              border: '0px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.75rem',
              overflow: 'visible',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'saturate(200%) blur(30px)',
              boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
              height:'auto'
            }}
            
          >
            <Grid container component="main" >
      
              <Grid  item xs={false} sm={4} md={7}>
                <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
      {/* Title section with a border under the text */}
      <div className="pb-8">
        <p className="text-4xl font-bold inline border-b-4 border-gray-500 text-orange-500">Contact</p>
        {/* Informational text about proposal submissions */}
        <p className="py-3 text-sky-950 text-md font-light mt-10">
          Please take note that we can only consider proposals submitted through
          our official website form. Rest assured that we will keep your proposal on file,
          and if there is ever a time when your offerings align with our needs,
          we will reach out to discuss potential collaborations. Thank you for considering Gobeze
          Learning as your partner in promoting creative studies.
        </p>
      </div>

      {/* Form section */}
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2">
 {/* Input fields for name, company name, email, phone, subject, and message */}
            <input
              type="text"
              name="name"
              value={query.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Full Name"
              className={`p-2 mb-4 bg-transparent border-2 rounded-md text-black focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-sky-950'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="text"
              name="companyName"
              value={query.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Company Name"
              className={`p-2 mb-4 bg-transparent border-2 rounded-md text-black focus:outline-none ${
                errors.companyName ? 'border-red-500' : 'border-sky-950'
              }`}
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}

            <input
              type="email"
              name="email"
              value={query.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Email"
              className={`mb-4 p-2 bg-transparent border-2  rounded-md text-black focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-sky-950'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              type="number"
              name="phoneNumber"
              value={query.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Phone Number"
              className={`p-2 mb-4 bg-transparent border-2 rounded-md text-black focus:outline-none ${
                errors.phoneNumber ? 'border-red-500' : 'border-sky-950'
              }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

            <input
              type="text"
              name="subject"
              value={query.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Subject"
              className={`p-2 mb-4 bg-transparent border-2 rounded-md text-black focus:outline-none ${
                errors.subject ? 'border-red-500' : 'border-sky-950'
              }`}
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}

            <textarea
              name="message"
              rows="10"
              value={query.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Message"
              className={`p-2 bg-transparent border-2 rounded-md text-black focus:outline-none ${
                errors.message ? 'border-red-500' : 'border-sky-950'
              }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-orange-300 to-orange-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
            >
              Let's talk
            </button>

            {formStatus && (
              <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="inline-block">Message sent successfully!</p>
              </div>
            )}
          </form>
        </div>
      </div>
                
              </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
           <Image src={contact} alt='graphic Design'
                  //  layout='raw'
                   />
          <Typography component="h1" variant="h5" sx={{fontWeight: '600',fontSize: '2rem',color: 'secondary.main'}}>
            Contact Us
          </Typography>
          <Typography component="h1" variant="h5" sx={{fontWeight: '200',fontSize: '1rem',color: 'secondary.main'}}>
            Any question or remarks?
          </Typography>
          <Box sx={{
            my:2,
            '& a':{
              display: 'block',
              mt: 0.5
            }
          }}>

          <Typography component="h1" variant="h5">
            Our mailing address is
          </Typography>
          <Link href='mailto:traingobeze@gmail.com'>
            traingobeze@gmail.com
          </Link>
          
          </Box>

          <Box sx={{my:2,
          '& a':{
            display: 'block',
            mt: 0.5
          }
          }}>

                <Typography component="h1" variant="h5">
                Or, Give us a call at these numbers
                </Typography>
                <Link href='tel:+251118633128'>
                +251118633128
                </Link>
                <Link href='tel:+251920956048'>
                +251920956048
                </Link>
            </Box>
          
          </Box>
        </Grid>
      </Grid>
               
    </Paper>
  </main>
  <Footer />
</>
    );
}

export default Contact;


