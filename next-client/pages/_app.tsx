import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navigation } from '../components/navigation'
import { Sidebar } from '../components/sidebar'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>Québécois Urbain</title>
            <meta name="description" content="Un peu comme le Urban Dictionnary, mais québécois" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <main className="container mx-auto py-4">
            <div className="flex flex-row space-x-4">
                <div className="basis-2/3">
                    <Component {...pageProps} />
                </div>
                <div className="basis-1/3">
                    <Sidebar />
                </div>
            </div>
        </main>
    </>
)

export default App
