import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/images/Know_your_progress.png"
import compare_with_others from "../../../assets/images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your swiss Knife for
                <HighlightText text={"learning any language"}/>
            </div>

            <div className='text-center text-richblack-700 mx-auto leading-6 text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom schedule
                and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-8 lg:mt-0'>
                {/*  img1*/}
                <img src={know_your_progress} alt='Know Your progress image'
                    className='object-contain -mr-32'
                />

                {/*  img2*/}
                <img src={compare_with_others} alt='Compare with others image'
                    className='object-contain'
                />

                {/*  img3*/}
                <img src={plan_your_lesson} alt='Plan your lesson image'
                    className='object-contain -ml-36'
                />
            </div>

            <div className='w-fit mx-auto'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection