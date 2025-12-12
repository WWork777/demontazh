import { About } from '@/components/about'
import { Calculator } from '@/components/calculator'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Questions } from '@/components/questions'
import { Reviews } from '@/components/reviews'
import { Services } from '@/components/services'
import { Stages } from '@/components/stages'

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Stages />
			<Services />
			<Calculator />
			<Questions />
			<Reviews />
			<Footer />
		</>
	)
}
