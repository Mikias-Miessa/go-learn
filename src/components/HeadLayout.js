import Head from 'next/head'

const HeadLayout = ({ title, keywords, description, children, image }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        {/* for facebook */}
        <meta property="og:url" content="https://gobeze.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href="https://gobeze.com/" />
        {image && <meta property="og:image" content={image} />}
        {/* for twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="gobeze.com" />
        <meta property="twitter:url" content="https://gobeze.com" />
        <meta name="twitter:title" content={title} />
        {image && <meta name="twitter:image" content={image} />}
        <meta name="twitter:description" content={description} />
      </Head>

      {children}</div>
  )
}

HeadLayout.defaultProps = {
  title: 'Gobeze | Helping Good Peopel Win!',
  description: 'Gobeze is the future of learning. We provide short, immediately applicable seminars on topics that matter to you by working professionals who know the subject matter intimately. Our courses are delivered live in our classrooms and online through our portal www.gobeze.com',
  keywords: 'consult, courses, business, shortterm, digital, graphics'
}

export default HeadLayout

