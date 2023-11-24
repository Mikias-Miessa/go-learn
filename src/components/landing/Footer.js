import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import Image from "next/image";
import Link from "../Link";
import logo from '../../images/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const commonStyle = {
    boxShadow: 'none', background: '#131933', opacity: '1', textDecoration: 'none'
}

const footerSections = [
    {
        title: 'Gobeze',
        lists: [
            {
                name: 'About Us',
                url: '/about'
            },
            {
                name: 'Blog',
                url: '/#!'
            }, {
                name: 'Careers',
                url: '/#!'
            }, {
                name: 'Events',
                url: '/#!'
            },
        ]
    },
    {
        title: 'Legal',
        lists: [
            {
                name: 'Terms & Conditions',
                url: '/#!'
            },
            {
                name: 'Privacy Policy',
                url: '/#!'
            }
        ]
    },
    {
        title: 'Help & Support',
        lists: [
            {
                name: 'Contact Us',
                url: '/contact'
            },
            {
                name: 'Knowledge Center',
                url: '/#!'
            },
            {
                name: 'Manage',
                url: '/login'
            }
        ]
    },

]

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>

            <Box component='footer' sx={{
                ...commonStyle,
                pt: 6, px: 1,
            }}>
                {/* <Box component='footer' sx={{...commonStyle,
            
        }} >
        </Box> */}
                <Paper sx={{ boxShadow: "none", width: "90%", margin: "auto", background: "#131933" }}>
                    <Grid container spacing={3} sx={{
                        boxSizing: 'border-box', display: 'flex', flexFlow: 'row wrap', width: 'calc(100% + 24px)',  '& .MuiGrid-item': {
                            pl: 3, pt: 3
                        }
                    }}>
                        <Grid item xs={12} md={3} sx={{
                            m: '0px 0px 24px auto', flexDirection: 'row', flexBasis: '100%', flexGrow: '0', maxWidth: '100%',
                            '@media screen and (min-width: 576px)': {
                                flexBasis: '100%',
                                maxWidth: '100%',
                            },
                            '@media screen and (min-width: 768px)': {
                                flexBasis: '25%',
                                maxWidth: '25%',
                            },
                            '@media screen and (min-width: 992px)': {
                                flexBasis: '25%',
                                maxWidth: '25%',
                            },
                        }}>
                            <Box sx={{
                                '& a img': {
                                    mb: 2
                                }
                            }}>
                                <Link href='/'>
                                    <Image src={logo} alt='gobeze logo' height={60} width={60}
                                    //  layout='raw'
                                    />
                                </Link>


                            </Box>
                            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                                <Link sx={{
                                    m: '0px 20px 0px 0px', fontSize: '1.25rem', lineHeight: '1.375'
                                }} href='https://facebook.com/traingobeze'>
                                    <FacebookIcon color='primary' />
                                </Link>
                                <Link sx={{
                                    m: '0px 20px 0px 0px', fontSize: '1.25rem', lineHeight: '1.375'
                                }} href='https://twitter.com/traingobeze'>
                                    <TwitterIcon color='primary' />
                                </Link>
                                <Link sx={{
                                    m: '0px 20px 0px 0px', fontSize: '1.25rem', lineHeight: '1.375'
                                }} href='https://instagram.com/traingobeze'>
                                    <InstagramIcon color='primary' />
                                </Link>
                                <Link sx={{
                                    m: '0px 20px 0px 0px', fontSize: '1.25rem', lineHeight: '1.375'
                                }} href='https://linkedin.com/traingobeze'>
                                    <LinkedInIcon color='primary' />
                                </Link>
                            </Box>
                        </Grid>

                        {footerSections.map((footerSection, index) => (
                            <Grid key={index} item xs={6} md={2} sx={{
                                m: '0px 0px 24px auto', flexDirection: 'row', flexBasis: '50%', flexGrow: '0', maxWidth: '50%',
                                '@media screen and (min-width: 576px)': {
                                    flexBasis: '50%',
                                    maxWidth: '50%',
                                },
                                '@media screen and (min-width: 768px)': {
                                    flexBasis: '16.6667%',
                                    maxWidth: '16.6667%',
                                },
                                '@media screen and (min-width: 992px)': {
                                    flexBasis: '16.6667%',
                                    maxWidth: '16.6667%',
                                },
                            }}>
                                <Typography component='span' sx={{
                                    m: '0px 0px 8px', fontFamily: 'Montserrat', fontSize: '0.875rem', lineHeight: '1.5', display: 'block', color: '#fff', textTransform: 'capitalize', fontWeight: '700', letterSpacing: '-0.125px'
                                }}>
                                    {footerSection.title}
                                </Typography>
                                {footerSection.lists.map((list, index) => (
                                    <Box key={index} component='ul' sx={{
                                        ...commonStyle,
                                        p: 0, m: 0, listStyle: 'none'
                                    }}>
                                        <Box component='li' sx={{
                                            ...commonStyle,
                                            p: 0, m: 0, lineHeight: '1.25', textDecoration: "none !important",
                                            fontSize: '0.875rem', lineHeight: '1.5', textTransform: 'capitalize', color: '#fff !important', fontWeight: '400', letterSpacing: '-0.125px', textDecoration: 'none'
                                        }}>
                                            <Link sx={{
                                            }} href={list.url}>{list.name}</Link>
                                        </Box>
                                    </Box>
                                ))}

                            </Grid>
                        ))}
                        <Grid item sx={{
                            boxSizing: 'border-box',
                            m: '24px 0px',
                            flexDirection: 'row',
                            flexBasis: '100%',
                            flexGrow: '0', maxWidth: '100%', textAlign: 'center'
                        }} >
                            <Typography component='span' sx={{
                                m: 0, fontSize: '0.875rem', lineHeight: '1.5', color: '#fff', fontWeight: '400', letterSpacing: '-0.125px', fontFamily: 'Montserrat'
                            }}>
                                All rights reserved. Copyright © {currentYear} Gobeze Consult.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

            </Box>
        </>
    )
}

export default Footer;