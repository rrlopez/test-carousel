import { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import useIsOverflowX from './useIsOverflowX'

function Carousel({ children, scrollStep = 200, className='overflow-hidden' }) {
  const { ref, isOverflow } = useIsOverflowX()
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(()=>{
    window.addEventListener('mouseup', function(event){
      setTouchStart(0)
      })
  }, [])

  const handleScrollRight = () => {
    const desiredScrollLeft = Math.min(ref.current.scrollLeft + scrollStep, ref.current.scrollWidth - ref.current.clientWidth)
    ref.current.scrollTo({ left: desiredScrollLeft, behavior: 'smooth' })
    setScrollLeft(desiredScrollLeft)
  }

  const handleScrollLeft = () => {
    const desiredScrollLeft = Math.max(ref.current.scrollLeft - scrollStep, 0)
    ref.current.scrollTo({ left: desiredScrollLeft, behavior: 'smooth' })
    setScrollLeft(desiredScrollLeft)
  }

  const handleTouchStart = (e) => {
    e.stopPropagation()
    setTouchStart(ref.current.scrollLeft + (e.clientX || e.targetTouches[0].clientX))
  }

  const handleTouchEnd = (e) => {
    setTouchStart(0)
  }

  const handleTouchMove = (e) => {
    e.stopPropagation()
    if(!touchStart) return
    ref.current.scrollTo({ left: touchStart - (e.clientX || e.targetTouches[0].clientX) })
    setScrollLeft(touchStart - (e.clientX || e.targetTouches[0].clientX))
  }

  return (
    <div className='relative flex items-center w-full gap-1'>
      {isOverflow && scrollLeft > 0 && (
        <button
          type='button'
          className='absolute z-10 border border-gray-200 shadow-md left-2 btn btn-circle btn-ghost hover:btn-secondary hover:btn-outline btn-xs'
          onClick={handleScrollLeft}
        >
          <HiChevronLeft className='w-4 h-4' />
        </button>
      )}
      <div ref={ref} className={`flex w-full gap-2 p-2  grow ${className}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd} onMouseMove={handleTouchMove}>
        {children}
      </div>
      {isOverflow && ref.current?.scrollWidth > scrollLeft + (ref.current?.clientWidth || 0) && (
        <button
          type='button'
          className='absolute z-10 border border-gray-200 shadow-md right-2 btn btn-circle btn-ghost hover:btn-secondary hover:btn-outline btn-xs'
          onClick={handleScrollRight}
        >
          <HiChevronRight className='w-4 h-4' />
        </button>
      )}
    </div>
  )
}

export default Carousel
