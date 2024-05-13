import { Link, useLocation } from 'react-router-dom'


const BreadCrumbs = () => {
    const location = useLocation()

    let links = ''
    const mactches = location.pathname.split('/').filter(str => str !== '')
    const crumb = mactches.map((url, index) => {
        links += '/' + url
        return (
            <div key={index} className='flex items-center gap-x-2'>
                <Link  to={links} className={`text-sm  capitalize ${mactches.length !== index + 1 ? 'font-medium text-slate-500' : 'font-bold'}`}>{url.replaceAll('-', ' ')}</Link>
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