//importing the layout component
import Layout from '../../components/layout';
//importing the getAllPostIds and getPostData functions
import { getAllPostIds, getPostData } from '../../lib/posts-firebase';
//importing the nextjs <Head> tag
import Head from 'next/head';
//importing the date component
import Date from '../../components/date';
//importing the util styles for more css
import utilStyles from '../../styles/utils.module.css';

//grabbing and returning the .md file contents
export async function getStaticProps({ params }) {
    //grabbing the .md file contents
    const postData = await getPostData(params.id);
    //returning the .md file contents
    return {
      props: {
        postData,
      },
    };
  }
 
//grabbing and returning the .md file paths
export async function getStaticPaths() {
    //grabbing the .md file names and removing the .md 
  const paths = await getAllPostIds();
  //returning the .md file paths and names without the .md 
  return {
    paths,
    fallback: false,
  };
}
 
//creating the <Post> tag
export default function Post({ postData }) {
    //exporting to nextjs to compile and display
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        <footer>
          <div> <em>{postData.footer}</em></div>
        </footer>
      </Layout>
    );
}