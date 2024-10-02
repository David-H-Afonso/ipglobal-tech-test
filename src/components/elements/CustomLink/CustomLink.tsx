import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
	href: string
	className?: string
	as?: string
	children: React.ReactNode
}

/**
 *  This file is born since we need to avoid a NextJS error with hard navigation:
 *  Error: Invariant: attempted to hard navigate to the same URL /url
 * With this custom small component, we make sure we're not renavigating to the same component, instead, it will just reload the website as expected
 */
export const CustomLink: React.FC<Props> = (props) => {
	const { href, children, className, as } = props
	const router = useRouter()

	const handleClick = (e: React.MouseEvent) => {
		if (router.asPath === href) {
			e.preventDefault()
			window.location.reload()
		}
	}

	return (
		<Link href={href} as={as} className={className} onClick={handleClick}>
			{children}
		</Link>
	)
}
