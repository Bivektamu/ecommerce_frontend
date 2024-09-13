import Grids from './Grids'
import CardLoader from './CardLoader'

type Props = {
    col:string
}

const GridLoader = ({col}: Props) => {
  return (
    <Grids cssClass={`container mx-auto grid-cols-${parseInt(col)} grid gap-12`}>
        {
            new Array(parseInt(col)).fill('*').map((_,i)=> <CardLoader key={i} cssClass='w-full' />)
        }
    </Grids>
    
  )
}

export default GridLoader