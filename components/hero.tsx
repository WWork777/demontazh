// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import React from 'react'
// import { IoChevronForwardSharp } from 'react-icons/io5'
// import { TiLocation } from 'react-icons/ti'
// import { Button } from './ui/button'

// interface Props {
// 	className?: string
// }

// export const Hero: React.FC<Props> = ({ className }) => {
// 	return (
// 		<section
// 			className={cn(
// 				className,
// 				'hero h-[calc(100svh-var(--header-height,80px))] flex justify-center pb-7'
// 			)}
// 		>
// 			<div className='bg-[url("/img/hero_bg.png")] h-full w-full rounded-[30px] xl:rounded-[33px]  2xl:rounded-[58px] mx-3 lg:mx-8 xl:mx-16 bg-cover bg-top relative overflow-hidden'>
// 				{/* Фильтр затемнения */}
// 				<div className='absolute inset-0 bg-black/60'></div>

// 				<div className='relative z-10 text-white h-full flex flex-col  justify-center gap-12 md:pl-28'>
// 					<div className='flex gap-5'>
// 						<Button
// 							className='bg-(--accent-color1) px-11 py-3 text-[28px] rounded-[76px] font-medium leading-[38px] tracking-tight text-white hover:opacity-90 transition-opacity relative hover:bg-(--accent-color2)'
// 							text='В Кемерово и области'
// 							icon={<TiLocation className=' absolute left-3 text-3xl' />}
// 						/>
// 						<Button
// 							className='bg-(--accent-color2) px-11 py-3 text-[28px] rounded-[76px] font-medium leading-[38px] tracking-tight text-white hover:opacity-90 transition-opacity relative hover:bg-(--accent-color1) '
// 							text='от 400 рублей'
// 						/>
// 					</div>
// 					<h1 className='text-[168px] font-bebas leading-[170px] mb-4'>
// 						Демонтаж любой сложности{' '}
// 					</h1>
// 					<div className='p-8 rounded-[23px] backdrop-blur-[22.7px] bg-[rgba(16,22,17,0.52)] max-w-3xl flex justify-between'>
// 						<p className='text-2xl font-normal'>
// 							Расчитайте предварительную <br />
// 							смету демонтажа бесплатно
// 						</p>
// 						<Link href={'/#pricing'}>
// 							<Button
// 								className='text-xl px-10 py-5 rounded-[14px] bg-(--accent-color1) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity'
// 								icon={<IoChevronForwardSharp className='text-3xl' />}
// 								text='Расчитать стоимость'
// 							/>
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }
"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        className,
        "hero h-[calc(100svh-var(--header-height,102px))] flex justify-center pb-3 md:pb-7 overflow-hidden transition-[height] duration-500"
      )}
    >
      <div className='bg-[url("/img/hero_bg.png")] h-full w-full rounded-[20px] xl:rounded-[33px] 2xl:rounded-[58px] mx-3 lg:mx-8 xl:mx-16 bg-cover bg-top relative overflow-hidden px-2 lg:px-0'>
        {/* Фильтр затемнения */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white h-full flex flex-col  justify-around xs:justify-evenly md:justify-center md:gap-12 md:px-5 lg:px-10 xl:p-0 xl:pl-28">
          {/* Верхние кнопки - выезжают сверху */}
          <motion.div
            className="flex flex-col md:flex-row gap-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              className="bg-(--accent-color1) w-3/4 md:w-auto md:px-11 xs:py-2 sm:py-3 lg:py-3 xs:text-lg md:text-xl lg:text-[28px] rounded-[76px] font-bold lg:font-medium leading-[38px] tracking-tight text-white hover:opacity-90 transition-opacity relative hover:bg-(--accent-color2)"
              text="В Кемерово и области"
              icon={<TiLocation className="absolute left-3 text-3xl" />}
            />
            <Button
              className="bg-(--accent-color2) w-3/4 mx-auto md:mx-0 md:w-auto md:px-11 xs:py-2 sm:py-3 lg:py-3 font-bold lg:font-medium xs:text-lg md:text-xl lg:text-[28px] rounded-[76px] leading-[38px] tracking-tight text-white hover:opacity-90 transition-opacity relative hover:bg-(--accent-color1)"
              text="от 400 рублей"
            />
          </motion.div>

          {/* Заголовок - плавное появление */}
          <motion.h1
            className="text-7xl xs:text-8xl lg:text-[140px] xl:text-[168px] font-bebas xl:leading-[170px] mb-4 nest-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 0.8 }}
          >
            Демонтаж любой сложности
          </motion.h1>

          {/* Нижний блок - выезжает снизу */}
          <motion.div
            className="p-5 lg:p-8 rounded-[23px] backdrop-blur-[22.7px] bg-[rgba(16,22,17,0.52)] max-w-3xl flex flex-col lg:flex-row gap-3 justify-between xl:items-center md:mx-auto xl:mx-0 md:w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className=" xs:text-lg lg:text-2xl font-normal leading-5 text-center xl:text-left xl:leading-7">
              Расчитайте предварительную <br />
              смету демонтажа бесплатно
            </p>
            <Button
              className="xs:text-lg lg:text-xl px-5 lg:px-10 py-3 lg:py-5 rounded-[14px] bg-(--accent-color1) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity"
              icon={<IoChevronForwardSharp className="ld:text-3xl" />}
              text="Расcчитать стоимость"
              link="/#calc"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
