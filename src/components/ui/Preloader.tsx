import {motion} from 'framer-motion'
const Preloader = () => {
  return (
    <motion.section id='preloader' 
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className='fixed w-full h-screen bg-slate-200 animate-pulse top-0 left-0'>

    </motion.section>
  )
}

export default Preloader