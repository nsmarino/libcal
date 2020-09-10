import Link from 'next/link'

const LinkButton = ({href, text, dynamic}) => {
    return (
    <Link href={href} as={dynamic ? `${dynamic}` : `${href}`}>
      <a>
        <button>{text}</button>
      </a>
    </Link>
    )
}

export default LinkButton