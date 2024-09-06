
const ColourLoader = () => {

    return (
        <div className={`container mx-auto flex gap-4`}>
            {
                new Array(3).fill('*').map((_, i) => <div key={i} className='w-8 h-8 rounded-full bg-slate-200 animate-pulse' />)
            }
        </div>

    )
}

export default ColourLoader