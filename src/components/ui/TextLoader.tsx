type Props = {
    col: string,
    cssClass: string
}

const TextLoader = ({ col, cssClass }: Props) => {
    return (
        <div className={`container mx-auto flex ${cssClass}`}>
            {
                new Array(parseInt(col)).fill('*').map((_, i) => <p key={i} className='w-full bg-slate-200 animate-pulse' />)
            }
        </div>
    )
}

export default TextLoader