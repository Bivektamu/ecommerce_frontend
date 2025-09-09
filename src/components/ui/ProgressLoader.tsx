type Props = {
    cssClass?: string
}

const ProgressLoader = ({cssClass}: Props) => {
    return (
        <section id='progress-loader' className={`${cssClass}  w-full flex items-center justify-center gap-4`}>
            <span className='border-slate-600 loader'></span>
        </section>
    )
}

export default ProgressLoader