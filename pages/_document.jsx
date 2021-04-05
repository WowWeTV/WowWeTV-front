import Document, { Main, NextScript, Head, Html } from 'next/document';
import { readFileSync } from 'fs';
import { join } from 'path';

class InlineStylesHead extends Head {
    getCssLinks() {
        return this.__getInlineStyles();
    }

    __getInlineStyles() {
        const { assetPrefix, files } = this.context;
        console.log(this.context);
        if (!files || files.length === 0) return null;

        return files
            .filter((file) => /\.css$/.test(file))
            .map((file) => (
                <style
                    key={file}
                    data-href={`${assetPrefix}/_next/${file}`}
                    dangerouslySetInnerHTML={{
                        __html: readFileSync(join(process.cwd(), '.build', file), 'utf-8'),
                    }}
                />
            ));
    }
}

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" dir="ltr">
                <Head>
                    <link href="/styles/globals.scss" ref="stylesheets" />
                    <link href="/styles/search.module.scss" ref="stylesheets" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
