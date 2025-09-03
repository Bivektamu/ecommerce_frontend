
import { Helmet } from "react-helmet";

type Props = {
    description?: string,
    lang?: string,
    title: string,
    author: string
}

function Seo({ description, lang, title, author }: Props) {
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}

        >
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {author && <meta name="author" content={author} />}
        </Helmet>
    );
}
export default Seo;