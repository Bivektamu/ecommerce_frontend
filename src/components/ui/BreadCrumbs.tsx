import { useLocation } from 'react-router-dom'
import CustomNavLink from '../CustomNavLink'

type Props = {
    rootLink?: string,
}

const BreadCrumbs = ({ rootLink }: Props) => {

    let pathname = useLocation().pathname
    if (rootLink) {
        pathname = '/' + rootLink + pathname
    }

    let links = ''

    const mactches = pathname.split('/').filter(str => str !== '')
    const crumb = mactches.map((url, index) => {

        const uurl = url === rootLink ? '' : url
        links += '/' + uurl
        links = links.replaceAll('//', '/')

        return (
            <div key={index} className='flex items-center gap-x-2'>
                <CustomNavLink to={links} cssClass={`text-sm  capitalize ${mactches.length !== index + 1 ? 'font-medium text-slate-500' : 'font-bold'}`}>{url.replaceAll('-', ' ')}</CustomNavLink>
                {mactches.length !== index + 1 ? (<span className=" w-3 h-3 border-t-2 border-r-2 border-slate-600 rotate-45"></span>) : ''}
            </div>)
    }
    )

    return (
        <div className="flex items-center text-slate-700 gap-x-3">
            {crumb}
        </div>
    )
}

export default BreadCrumbs