import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import LatestArticle from '../components/LatestArticle'
import AboutMe from '../components/AboutMe'
import ContactMe from '../components/ContactMe'
export default function Index({ projects, aboutMe, articles }) {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Abdul Rahman - Software Engineer</title>
          <meta name="title" content="Abdul Rahman - Software Engineer" />
          <meta name="keywords" content="abdulrcs, abdulrcs website" />
          <meta
            name="description"
            content="Software Engineer based in Indonesia, an undergraduate student at Universitas Negeri Surabaya."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://abdulrahman.id" />
          <meta
            property="og:title"
            content="Abdul Rahman - Software Engineer"
          />
          <meta
            property="og:description"
            content="Software Engineer based in Indonesia, an undergraduate student at Universitas Negeri Surabaya."
          />
          <meta property="og:image" content="https://i.imgur.com/AOMvmeJ.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://abdulrahman.id/" />
          <meta
            property="twitter:title"
            content="Abdul Rahman - Software Engineer"
          />
          <meta
            property="twitter:description"
            content="Software Engineer based in Indonesia, an undergraduate student at Universitas Negeri Surabaya."
          />
          <meta
            property="twitter:image"
            content="https://i.imgur.com/AOMvmeJ.png"
          />
        </Head>

        <Stack
          as="main"
          spacing="144px"
          justifyContent="center"
          alignItems="flex-start"
          px={['5vw', '10vw']}
          mt={['15vh', '15vh', '22.5vh', '22.5vh']}
        >
          <Introduction />
          <AboutMe />
          <FeaturedProjects projects={projects} />
          <LatestArticle articles={articles} />
          <ContactMe />
        </Stack>
      </Container>
    </>
  )
}

let client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'featuredProjects',
    order: 'fields.order',
  })

  let data2 = await client.getEntries({
    content_type: 'blogPosts',
    limit: 4,
    order: 'sys.createdAt',
  })
  return {
    props: {
      projects: data.items,
      articles: data2.items.reverse(),
    },
  }
}
