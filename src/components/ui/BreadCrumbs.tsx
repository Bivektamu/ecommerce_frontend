import { Link, useLocation } from 'react-router-dom'


const BreadCrumbs = () => {
    const location = useLocation()

    let links = ''
    const mactches = location.pathname.split('/').filter(str => str !== '')
    const crumb = mactches.map((url, index) => {
        links += '/' + url
        return (
            <div key={index}>
                <Link  to={links} className={`text-sm  capitalize ${mactches.length !== index + 1 ? 'font-medium text-slate-500' : 'font-bold'}`}>{url}</Link>
                {mactches.length !== index + 1 ? (<span className="text-sm font-medium text-slate-500"> &gt;</span>) : ''}

            </div>)
    }
    )

    return (
        <div className="flex items-center gap-x-2 text-slate-700">
            {crumb}
        </div>
    )
}

export default BreadCrumbs