import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs';
import { client } from '../.tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from "tinacms/dist/rich-text";

export async function getServerSideProps() {
  const reviveConnection = await client.queries.projectConnection();
  const projects = reviveConnection?.data?.projectConnection?.edges?.map((x) => ({
    ...x?.node
  }));

  const page = await client.queries.page({ relativePath: 'homepage.md' })

  const reviveBlogConntection = await client.queries.blogConnection({ sort: 'published' });
  const blogs = reviveBlogConntection?.data?.blogConnection?.edges?.map((z) => ({ ...z?.node }))

  return {
    props: {
      projects,
      blogs,
      page,
    }
  }
}

interface Props {
  projects: any[]
  blogs: any[]
  page: any
}

const SocialMediaButton = (props: any) => {
  const { button_label, button_href, button_external } = props;

  return (
    <a
      href={button_href}
      target={button_external ? "_blank" : ""}
      className="inline-flex items-center justify-center bg-[#F0F1E1] text-base text-[#1F1F21] font-proto-mono px-4 py-2 mr-2"
      rel="noreferrer"
    >
      {button_label}

      <span className="material-symbols-outlined ml-2">
        open_in_new
      </span>
    </a>
  )
}

export default function Home(props: Props) {
  const { projects, blogs } = props;
  const pageView = useTina<any>(props.page);

  return (
    <>
      <Head>
        <title>Dian Handiyansah</title>
        <meta name="description" content={pageView?.data?.page?.seo_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl w-full md:px-0 px-8">
          <div className="xl:py-32 lg:py-24 md:py-12 py-16">
            <div>
              <div>
                <h4
                  className="text-[#F0F1E1] text-5xl font-bold leading-snug font-proto-mono"
                  dangerouslySetInnerHTML={{ __html: pageView?.data?.page?.short_text || '' }}
                />

                <div className="mt-4 max-w-sm text-[#F0F1E1] font-medium text-base prose prose-a:no-underline font-sans">
                  <TinaMarkdown
                    components={{
                      SocialMediaButton,
                    }}
                    content={pageView?.data?.page?.long_text}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 px-6 py-6 bg-[#1F1F21]">
              <h3 className="text-base font-proto-mono text-[#F0F1E1]">All Projects</h3>
            </div>

            <div className="mt-6 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {projects.map((_item, key) => (
                <Link href={`/project/${_item._sys.filename}`} key={key}>
                  <div
                    className="flex flex-col justify-between min-h-[305px] w-full h-full bg-[#1F1F21] p-6"
                    key={key}
                  >
                    <div className="flex items-start justify-between">
                      <div className="max-w-[70%]">
                        <h3 className="text-xl text-[#F0F1E1] font-proto-mono">{_item.title}</h3>
                      </div>

                      <div className="bg-[#F0F1E1] rounded-full w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <g id="arrow-up-right">
                            <path id="Vector" d="M5.25 12.75L12.75 5.25" stroke="#1F1F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path id="Vector_2" d="M5.25 5.25H12.75V12.75" stroke="#1F1F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        </svg>
                      </div>
                    </div>

                    <div>
                      <div>
                        <ul className="space-x-2 mb-1">
                          {_item.platform?.map((x: string, key: number) => (
                            <li
                              key={key}
                              className="text-sm text-[#101015] font-proto-mono inline px-1 bg-[#F0F1E1]"
                            >
                              {x}
                            </li>
                          ))}
                        </ul>

                        <p className="text-sm text-[#F0F1E1] font-proto-mono max-w-[70%]">
                          {_item.description}
                        </p>
                      </div>

                      <hr className="bg-[#AEADA4] my-2" />

                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-proto-mono text-[#F0F1E1]">
                          {_item.code_language}
                        </h4>
                        <h4 className="text-sm font-proto-mono text-[#F0F1E1]">
                          {dayjs(_item.time_end).format('MMMM YYYY')}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main >
    </>
  )
}
