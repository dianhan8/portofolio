import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import classnames from 'classnames';
import dayjs from 'dayjs';
import { client } from '../../.tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps<{ projectView: any }> = async (context: GetServerSidePropsContext) => {
    const projectView = await client.queries.project({ relativePath: `${context?.params?.filename}.md` });

    return {
        props: {
            projectView
        }
    }
}

interface Props {
    projectView: any
}

function Project(props: Props) {
    const { projectView } = props;
    const viewResult = useTina<any>(projectView);

    return (
        <>
            <Head>
                <title>Dian Handiyansah</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen">
                <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl w-full md:px-0 px-8">
                    <div className="xl:py-32 lg:py-24 md:py-12 py-16">
                        <div>
                            <div>
                                <h2 className="text-5xl text-white font-sans">{viewResult?.data?.project?.title}</h2>
                            </div>

                            <ul className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6 my-8">
                                <li>
                                    <h4 className="text-vanila text-base uppercase">COMPANY</h4>

                                    <p className="text-white text-base mt-3 uppercase">{viewResult?.data?.project?.client}</p>
                                </li>
                                <li>
                                    <h4 className="text-vanila text-base uppercase">Date Start</h4>

                                    <p className="text-white text-base mt-3">{dayjs(viewResult?.data?.project?.time_start).format('MMM YYYY')}</p>
                                </li>
                                <li>
                                    <h4 className="text-vanila text-base uppercase">Date Finish</h4>

                                    <p className="text-white text-base mt-3">{dayjs(viewResult?.data?.project?.time_end).format('MMM YYYY')}</p>
                                </li>
                                <li>
                                    <h4 className="text-vanila text-base uppercase">ROLE</h4>

                                    <p className="text-white text-base mt-3">{viewResult?.data?.project?.role}</p>
                                </li>
                            </ul>
                        </div>

                        <div className="my-8 prose prose-a:text-white prose-invert">
                            <TinaMarkdown content={viewResult?.data?.project?.long_text} />
                        </div>

                        <div>
                            <a href="/" className="px-4 py-4 bg-secondary text-vanila inline-flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>

                                <span>Back to home</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Project