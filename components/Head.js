import Head from 'next/head' 


 const head = () => {
        return (
            <Head>
                <title>Vanix 1</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#90cdf4" />
                <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
            </Head>
    )
}

export default head