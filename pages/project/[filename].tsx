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
import Link from 'next/link';

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
                <title>{viewResult?.data?.project?.title} - Dian Handiyansah</title>
                <meta name="description" content={viewResult?.data?.project?.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen">
                <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl w-full md:px-0 px-8">
                    <div className="xl:py-32 lg:py-24 md:py-12 py-16">
                        <div>
                            <ul className="flex items-center space-x-1">
                                <Link href="/">
                                    <li className="text-base text-[#F0F1E1]">
                                        Home
                                    </li>
                                </Link>
                                <li className="text-base text-[#F0F1E1]">/</li>
                                <li className="text-base text-[#F0F1E1]">{viewResult?.data?.project?.title}</li>
                            </ul>

                            <div className="my-9">
                                <h2 className="text-5xl text-[#F0F1E1] font-proto-mono">{viewResult?.data?.project?.title}</h2>
                            </div>
                        </div>

                        <div className="prose prose-a:text-white prose-invert prose-h2:font-proto-mono">
                            <TinaMarkdown content={viewResult?.data?.project?.long_text} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Project