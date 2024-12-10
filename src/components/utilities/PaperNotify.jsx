import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import PropTypes from 'prop-types'

const variants = {
	initial: { opacity: 0, x: 100, y: 0 },
	animate: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0 }
}

const PaperNotify = ({ notifyStatus, setNotifyStatus, duration=3000 }) => {
	const [display, setDisplay] = useState('block')

	useEffect(() => {
		showNotify()
	}, [notifyStatus])

	const showNotify = () => {
		setDisplay('block')
		
		setTimeout(() => {
			setDisplay('hidden')
			setNotifyStatus({
				message: null,
				status: null
			})
		}, duration)
	}

	const alert = notifyStatus.status === 'error' ? 'bg-error' : (
		notifyStatus.status === 'success' ? 'bg-success' : (
			notifyStatus.status === 'warning' ? 'bg-warn' : 'bg-info'
		)
	)

	return (
		<motion.div 
			className={`position ${display} 
				absolute 
				top-0 md:top-[30px] right-0
				md:right-[30px] lg:right-[30px]
				p-3 z-50 
				bg-white border-b-2 w-full md:w-[300px] lg:w-[400px] shadow-md
				m-h-[80px] text-primary dark:text-primary
			`}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
		>
			<p className='text-ellipsis w-[90%]'>
				{notifyStatus.message}
			</p>
			<motion.div
				initial={{ width: '100%' }}
				animate={{ width: '0%' }}
				transition={{ duration: duration/1000 }}	
				className={`absolute bottom-[-3px] left-0 h-[3px] ${alert}
					transform origin-left`}
			></motion.div>
			<div className='w-[100%] h-[100%] absolute right-0 top-0 flex items-center
				pointer-events-none p-4
			' dir='rtl'>
				<p className='font-[sans] pointer-events-auto text-red-500 font-bold cursor-pointer'
					onClick={() => setDisplay('hidden')}
				>X</p>
			</div>
		</motion.div>
	)
}

export default PaperNotify

PaperNotify.propTypes = {
	notifyStatus: PropTypes.object.isRequired,
	setNotifyStatus: PropTypes.func.isRequired,
	duration: PropTypes.number,
}